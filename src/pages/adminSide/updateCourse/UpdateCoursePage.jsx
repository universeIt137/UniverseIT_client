import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import ReactPlayer from "react-player";
import { Editor } from "@tinymce/tinymce-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import SubVideos from "../../../Shared/SubVideos";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";
import { uploadImg } from "../../../UploadFile/uploadImg";


const UpdateCoursePage = () => {
    const axiosPublic = useAxiosPublic()
    const { id } = useParams()
    const imgHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    const [imageInput, setImageInput] = useState('')
    const [imageInputErr, setImageInputErr] = useState('')
    const [allImages, setAllImages] = useState([])
    const [subVideosArray, setSubVideos] = useState([]);
    const [subVideoTitle, setSubVideoTitle] = useState('');
    const [subVideoUrl, setSubVideoUrl] = useState('')
    const [subVideoErr, setSubVideoErr] = useState('')
    const [formData, setFormData] = useState({
        notice: '',
        bangla: '',
        admissionNotice: ''
    });
    const [formDataErr, setFormDataErr] = useState({
        notice: '',
        bangla: '',
        admissionNotice: ''
    });

    const { data: courseData = {}, refetch: courseDataRefetch, isLoading } = useQuery({
        queryKey: ['course', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/course/${id}`)
            return res?.data
        }
    })
    useEffect(() => {
        if (courseData) {
            setFormData({
                notice: courseData?.notice,
                bangla: courseData?.bangla,
                admissionNotice: courseData?.admissionNotice
            })
            setSubVideos(courseData.subVideos || [])
            // setAllImages(courseData.bannerImages)
        }
    }, [courseData, isLoading])
    if (isLoading) {
        return ''
    }
    console.log(courseData);
    const handleNoticeChange = (value) => {
        setFormData({ ...formData, notice: value });
    };


    const handleBanglaChange = (value) => {
        setFormData({ ...formData, bangla: value });
    };
    const handleAdmissionNotice = (value) => {
        setFormData({ ...formData, admissionNotice: value });
    };




    const handleImageInputField = (e) => {
        console.log(e.target.files[0]);
        setImageInput(e.target.files[0] || '')

    }
    const handleStoreImages = () => {
        if (imageInput === '') {
            return
        }

        console.log([...allImages, imageInput]);
        setAllImages([...allImages, { image: imageInput, id: new Date().getTime() }]);
        setImageInput('');
        document.getElementById('courseImageInputField').value = '';
    }
    const handleDeleteImage = (comingImage) => {
        const newImageArray = allImages.filter(image => image.id !== comingImage.id)
        setAllImages(newImageArray)
    }
    const handleAddSubVideo = () => {
        setSubVideos([...subVideosArray, { id: new Date().getTime(), title: subVideoTitle, url: subVideoUrl }])
        setSubVideoTitle('')
        setSubVideoUrl('')
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const category = form.courseCategory.value;
        const title = form.title.value;
        const videoUrl = form.videoUrl.value;
        const courseFee = form.courseFee.value
        const description = form.description.value
        let isValid = true;
        const newFormDataErr = {
            notice: '',
            bangla: '',
            admissionNotice: ''
        };
        setFormDataErr(newFormDataErr)
        setImageInputErr('');
        setSubVideoErr('')
        if (formData.notice === '') {
            newFormDataErr.notice = 'Notice cannot be empty';
            isValid = false;
        }
        if (formData.bangla === '') {
            newFormDataErr.bangla = 'Bangla cannot be empty';
            isValid = false;
        }
        if (formData.admissionNotice === '') {
            newFormDataErr.admissionNotice = 'Admission notice cannot be empty';
            isValid = false;
        }

        setFormDataErr(newFormDataErr);

        if (subVideosArray.length < 1) {
            setSubVideoErr('Please add minimum 1 sub Video');
            isValid = false;
        }

        if (!isValid) {
            return
        }


        let allImagesArray = [];
        const toastId = toast.loading("Course is updating...");
        if (allImages.length > 0) {
            for (let i = 0; i < allImages.length; i++) {
                let galleryImgURL = '';
                if (!allImages[i].image.name) {
                    galleryImgURL = '';
                } else {
                    galleryImgURL = await uploadImg(allImages[i].image);
                    allImagesArray.push(galleryImgURL);
                }
            }
        } else {
            allImagesArray = courseData?.bannerImages
        }



        // const uploadPromises = allImages.map((imageUrl) => {
        //     const data = { category, image: imageUrl };
        //     return axiosPublic.post('/studentGallery', data);
        // });
        const data = { category, title, videoUrl, bannerImages: allImagesArray, subVideos: subVideosArray, notice: formData.notice, bangla: formData.bangla, admissionNotice: formData.admissionNotice, courseFee, description };
        console.log(data);

        axiosPublic.put(`/course/${id}`, data)
            .then(res => {
                if (res.data.modifiedCount) {
                    toast.success("Course has updated Successfully!!", { id: toastId });
                    setAllImages([])
                }

            })
    };


    return (
        <>
            <Helmet>
                <title>Dashboard | Update Course</title>
            </Helmet>
            <div className=''>
                <div className=''>
                    <section className="text-gray-600 body-font relative">
                        <div className="container mx-auto min-w-full">
                            <div className="lg:w-[75vw] w-full mx-auto bg-white mt-2 rounded-xl">
                                <div className="shadow-2xl  px-10 rounded-2xl">


                                    <p className='text-center text-2xl font-bold pb-5'>Update {`"${courseData?.title}"`} Course</p>
                                    <form action="" onSubmit={handleSubmit} className=''>

                                        <div className='grid grid-cols-1 md:grid-cols-2'>
                                            {/* title */}
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Course Category</label>
                                                    <input defaultValue={courseData?.category} required type="text" name="courseCategory" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                            </div>
                                            {/* title */}
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Course Title</label>
                                                    <input defaultValue={courseData.title} required type="text" id="title" name="title" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                            </div>
                                            {/* Banner images */}
                                            <div className='w-full md:col-span-2'>
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Upload Course Banner images</label>
                                                <div className='w-full'>
                                                    <div className="p-2 w-full">
                                                        <div className="relative space-y-2">
                                                            <label className="leading-7 text-sm text-gray-600 font-medium">Select Image</label><br />
                                                            <input id='courseImageInputField' onChange={handleImageInputField} type="file" name='image1' className="file-input file-input-bordered file-input-md w-full" />
                                                            <p className='text-red-600'>{imageInputErr}</p>
                                                            <p onClick={handleStoreImages} className='btn flex flex-col justify-center items-center px-7 py-1 rounded-md bg-primary text-white hover:font-bold transition-all duration-300 hover:bg-orange-700  active:bg-primary focus:outline-none focus:ring focus:ring-red-300 active:scale-90 focus:text-white w-max'>Add</p>
                                                            <p>Added Image</p>
                                                            {allImages?.length < 1 && <p>No Image Added!!</p>}

                                                            <div className="flex flex-wrap gap-4 pb-5">
                                                                {allImages.map((image, index) => (
                                                                    <div key={index} className="w-28 h-24 relative border border-gray-500 rounded-lg p-1">
                                                                        <p onClick={() => handleDeleteImage(image)} className='text-center bg-gray-200 w-6  h-6 rounded-md ml-auto mb-2 cursor-pointer'>X</p>
                                                                        <img src={URL.createObjectURL(image.image)} alt="preview" className=" h-16 object-cover rounded-md mx-auto pb-2" />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            {/* Main course video */}
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Upload Course Main Video</label><br />
                                                    <input defaultValue={courseData.videoUrl} required type="text" name='videoUrl' className="file-input file-input-bordered file-input-md w-full" />
                                                </div>
                                            </div>
                                            {/* Fee */}
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Course Fee</label>
                                                    <input defaultValue={courseData.courseFee} required type="number" name="courseFee" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                            </div>
                                            {/* Sub Video */}
                                            <div className='w-full md:col-span-2 p-2  space-y-2'>
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Sub Videos</label>
                                                <div className=' grid md:grid-cols-2 gap-2'>
                                                    <div className="w-full">
                                                        <div className="relative">
                                                            <label className="leading-7 text-sm text-gray-600 font-medium">Video title</label><br />
                                                            <input onChange={(e) => setSubVideoTitle(e.target.value)} value={subVideoTitle} type="text" name='subVideoTitle' className="file-input file-input-bordered file-input-md w-full" />
                                                        </div>

                                                    </div>
                                                    <div className="w-full">
                                                        <div className="relative">
                                                            <label className="leading-7 text-sm text-gray-600 font-medium">Video Url</label><br />
                                                            <input onChange={(e) => setSubVideoUrl(e.target.value)} value={subVideoUrl} type="text" name='subVideoUrl' className="file-input file-input-bordered file-input-md w-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className='text-red-600'>{subVideoErr}</p>
                                                <p onClick={handleAddSubVideo} className='btn flex flex-col justify-center items-center px-7 py-1 rounded-md bg-primary text-white hover:font-bold transition-all duration-300 hover:bg-orange-700  active:bg-primary focus:outline-none focus:ring focus:ring-red-300 active:scale-90 focus:text-white w-max'>Add</p>

                                                <SubVideos subVideosArray={subVideosArray} setSubVideos={setSubVideos} />
                                            </div>
                                        </div>
                                        {/* Description */}
                                        <div className="p-2 w-full md:col-span-2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Course Description</label>
                                                <textarea defaultValue={courseData.description} required type="text" name="description" placeholder='Description' className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out min-h-[200px]" />
                                            </div>
                                        </div>


                                        <div className='flex pb-20'>

                                            {/* Notice */}
                                            <div className="p-2 w-1/2">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm font-bold text-gray-600">Course Notice</label>
                                                    <Editor
                                                        apiKey='rcgwgkgfl2fboctr4kanu1wyo0q2768tzdj3sxx94rb4s4es'
                                                        init={{
                                                            height: 400,
                                                            max_height: "500",
                                                            width: '100%',
                                                            border: "0px",
                                                            //    menubar: false,
                                                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                                            tinycomments_mode: 'embedded',
                                                            tinycomments_author: 'Author name',
                                                            // mergetags_list: [
                                                            //   { value: 'First.Name', title: 'First Name' },
                                                            //   { value: 'Email', title: 'Email' },
                                                            // ],
                                                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                                        }}
                                                        value={formData.notice}
                                                        onEditorChange={handleNoticeChange} />
                                                </div>
                                                <p className='text-red-600'>{formDataErr.notice}</p>
                                            </div>


                                            {/* admission Notice */}
                                            <div className="p-2 w-1/2">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm font-bold text-gray-600">Admission Notice</label>

                                                    <Editor
                                                        apiKey='rcgwgkgfl2fboctr4kanu1wyo0q2768tzdj3sxx94rb4s4es'
                                                        init={{
                                                            height: 400,
                                                            max_height: "300",
                                                            width: '100%',
                                                            border: "0px",
                                                            //    menubar: false,
                                                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                                            tinycomments_mode: 'embedded',
                                                            tinycomments_author: 'Author name',
                                                            // mergetags_list: [
                                                            //   { value: 'First.Name', title: 'First Name' },
                                                            //   { value: 'Email', title: 'Email' },
                                                            // ],
                                                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                                        }}
                                                        value={formData.admissionNotice}
                                                        onEditorChange={handleAdmissionNotice} />

                                                </div>
                                                <p className='text-red-600'>{formDataErr.admissionNotice}</p>
                                            </div>
                                        </div>
                                        <div className='flex pb-20'>

                                            {/* Bangla Text */}
                                            <div className="p-2 w-1/2">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm font-bold text-gray-600">Bangla Text</label>
                                                    <Editor
                                                        apiKey='rcgwgkgfl2fboctr4kanu1wyo0q2768tzdj3sxx94rb4s4es'
                                                        init={{
                                                            height: 400,
                                                            max_height: "500",
                                                            width: '100%',
                                                            border: "0px",
                                                            //    menubar: false,
                                                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                                            tinycomments_mode: 'embedded',
                                                            tinycomments_author: 'Author name',
                                                            // mergetags_list: [
                                                            //   { value: 'First.Name', title: 'First Name' },
                                                            //   { value: 'Email', title: 'Email' },
                                                            // ],
                                                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                                        }}
                                                        value={formData.bangla}
                                                        onEditorChange={handleBanglaChange} />

                                                </div>
                                                <p className='text-red-600'>{formDataErr.bangla}</p>
                                            </div>



                                        </div>




                                        <div className="p-2 w-full">
                                            <div className='flex justify-center items-center'><ButtonStrong text={'Submit'} /></div>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default UpdateCoursePage;