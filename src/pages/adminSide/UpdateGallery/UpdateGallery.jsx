import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { BiLogoTwitter } from "react-icons/bi";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";
import Loading from "../../../Shared/Loading/Loading";

const UpdateGallery = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const imgHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    const { data: galleryData = {}, refetch: galleryDataRefetch, isLoading } = useQuery({
        queryKey: ['galleryData', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/singleStudentGallery/${id}`)
            return res?.data
        }
    })
    if (isLoading) {
        return <Loading/>
    }
    console.log(galleryData);
    const { _id, category: incomingCategory, image: incomingImage } = galleryData;
    console.log(incomingCategory);
    const handleSubmit = async (event) => {

        event.preventDefault();
        const form = event.target;
        const category = form.category.value;
        const imageFile = form.image.files[0];

        let galleryImgURL = incomingImage
        if (!imageFile?.name) {
            galleryImgURL = incomingImage
        } else {
            const image = { image: imageFile }

            const res = await axios.post(imgHostingApi, image, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            try {
                galleryImgURL = res?.data?.data?.display_url
            }
            catch (err) {
                console.log(err);
                galleryImgURL = incomingImage
            }
        }
        const data = { category, image: galleryImgURL };
        console.log(data);
        axiosPublic.put(`/updateStudentGallery/${id}`, data)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    console.log('data updated')
                    galleryDataRefetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Gallery has been Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })
            .catch()
        
    }
    return (
        <div>
            <Helmet>
                <title>Dashboard | Update Student Gallery</title>
            </Helmet>

            <div className='bg-gray-100 text-black'>

                {/* form section  */}
                <div className=''>

                    <section className="text-gray-600 body-font relative">
                        <div className="container px-5  mx-auto">

                            <div className="lg:w-3/4 md:w-2/3 mx-auto bg-white px-10 py-5 rounded-xl">
                                <p className='text-center text-2xl font-bold'>Add Student Gallary</p>

                                <div className="shadow-2xl  p-10 rounded-2xl">
                                    <form action="" onSubmit={handleSubmit} className='flex flex-col -m-2'>

                                        {/* Category  */}
                                        <div className='p-2 w-2/3'>
                                            <label className="font-bold">Category</label>
                                            <select required type="text" defaultValue={incomingCategory} name="category" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                                <option value="">Select</option>
                                                <option value="Interior Design">Interior Design</option>
                                                <option value="Fashion Design">Fashion Design</option>
                                                <option value="Merchandising">Merchandising</option>
                                                <option value="Computer Operation">Computer Operation</option>
                                                <option value="Pattern Design">Pattern Design</option>
                                            </select>

                                        </div>

                                        {/* image url  */}
                                        <div className="p-2 w-2/3">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Upload Image</label><br />
                                                <input type="file" name='image' className="file-input file-input-bordered file-input-md w-full" />
                                            </div>
                                        </div>




                                        <div className="p-2 w-full">
                                            <div className='flex justify-center items-center'><ButtonStrong text={'Submit'} /></div>
                                        </div>
                                    </form>


                                    <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                                        <a className="text-indigo-500">info@UniverseIT.com</a>
                                        <p className="leading-normal my-5">House # 3/GA,
                                            <br />Shyamoli, Road # 1. Dhaka-1207.
                                        </p>
                                        <span className="inline-flex">
                                            <a className="text-gray-500">
                                                <Link to="https://x.com/"><BiLogoTwitter className="text-2xl" /></Link>
                                            </a>
                                            <a className="ml-4 text-gray-500">
                                                <Link to="https://www.youtube.com/"><TbBrandYoutubeFilled className="text-2xl" /></Link>
                                            </a>
                                            <a className="ml-4 text-gray-500">
                                                <Link to="https://www.facebook.com/"><FaFacebook className="text-xl" /></Link>
                                            </a>

                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default UpdateGallery;