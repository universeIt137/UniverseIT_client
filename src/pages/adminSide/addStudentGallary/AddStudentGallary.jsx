/* eslint-disable react/prop-types */

import useAxiosPublic from '../../../hooks/useAxiosPublic';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ButtonStrong from '../../../Shared/Button/ButtonStrong';
import { uploadImg } from '../../../UploadFile/uploadImg';

const AddStudentGallery = ({ studentGallery, refetch, handleDelete, allCategory }) => {
    const [category, setCategory] = useState('');
    const [showingImage, setShowingImage] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const axiosPublic = useAxiosPublic();
    const imgHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;

    useEffect(() => {
        const images = category === '' ? [] : studentGallery?.filter(gallery => gallery?.category === category);
        setShowingImage(images);
    }, [category, studentGallery]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const category = form.category.value;
        const imageFiles = form.image.files;
        console.log(imageFiles.length, imageFiles);
        let allImages = [];
        const toastId = toast.loading("Photo Uploading...");
        for (let i = 0; i < imageFiles.length; i++) {
            console.log(allImages);
            let galleryImgURL = '';
            if (!imageFiles[0]?.name) {
                galleryImgURL = '';
            } else {
                galleryImgURL = await uploadImg(imageFiles[i]);
                allImages.push(galleryImgURL);
            }
        }

        const uploadPromises = allImages.map((imageUrl) => {
            const data = { category, image: imageUrl };
            return axiosPublic.post('/studentGallery', data);
        });
        console.log(allImages);
        Promise.all(uploadPromises)
            .then((results) => {
                if (results.every(res => res.data.insertedId)) {
                    console.log('All images added');
                    if (allImages.length < 1) {
                        return
                    } else {
                        toast.success("Uploaded Successfully!!", { id: toastId });
                        setCategory('');
                        refetch();
                        form.reset();
                        setSelectedImages([]);
                    }

                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(err?.message, { id: toastId });
            });
    };

    const handleImageChange = (event) => {
        const files = event.target.files;
        setSelectedImages(Array.from(files));
    };

    const handleChangeCategory = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setCategory(value);
    };

    const handleDeleteImage = (id) => {
        handleDelete(id);
    };

    console.log(showingImage);
    return (
        <>
            <section className="text-gray-600 body-font relative w-full">
                <div className="container mx-auto w-full">
                    <div className="w-full bg-white py-5 rounded-xl">
                        <p className='text-center text-2xl font-bold'>Add Student Gallery</p>
                        <div className="shadow-md p-10 rounded-2xl">
                            <form onSubmit={handleSubmit} className='flex flex-col -m-2'>
                                {/* Category */}
                                <div className='p-2 w-full'>
                                    <label className="font-bold">Category</label>
                                    <select onChange={handleChangeCategory} required name="category" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        <option value="">Select</option>
                                        {allCategory?.map(category => (
                                            <option key={category?._id} value={category?.category_name}>{category?.category_name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Image Upload */}
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label className="leading-7 text-sm text-gray-600 font-bold">Upload Image</label><br />
                                        <input multiple required type="file" name='image' className="file-input file-input-bordered file-input-md w-full"
                                            accept="image/*" onChange={handleImageChange} />
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className='flex justify-center items-center'><ButtonStrong text={'Submit'} /></div>
                                </div>
                                {/* Selected Images Preview */}
                                {
                                    selectedImages?.length > 0 && <div className="p-2 w-full">
                                        <p>Selected Image</p>
                                        <div className="flex flex-wrap gap-4">
                                            {selectedImages.map((image, index) => (
                                                <div key={index} className="w-28 h-16 relative">
                                                    <img src={URL.createObjectURL(image)} alt="preview" className="w-full h-full object-cover rounded-md" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }




                                {/* Showing Images */}
                                {showingImage?.length >= 1 && (
                                    <div className='space-y-4'>
                                        <h2>Already added images</h2>
                                        <div className='flex flex-col gap-2'>
                                            {showingImage?.map(image => (
                                                <div key={image?._id} className='flex gap-3'>
                                                    <img className='w-28 h-16 object-cover overflow-hidden rounded-md' src={image?.image} />
                                                    <p onClick={() => handleDeleteImage(image?._id)} className='h-6 w-6 flex justify-center items-center bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer transition-all duration-300'>X</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddStudentGallery;
