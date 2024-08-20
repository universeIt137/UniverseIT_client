import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BiLogoTwitter } from 'react-icons/bi';
import { TbBrandYoutubeFilled } from 'react-icons/tb';
import { FaFacebook } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import ButtonStrong from '../../../Shared/Button/ButtonStrong';
import { uploadImg } from '../../../UploadFile/uploadImg';
import { useEffect, useState } from 'react';
import AddBenefits from './AddBenefits';

const ManageHomepageContent = () => {
    const [allBenefits, setAllBenefits] = useState([])
    const axiosPublic = useAxiosPublic()
    const { data: homepageContent = [], refetch: homepageContentRefetch, isLoading } = useQuery({
        queryKey: ['homepageContent'],
        queryFn: async () => {
            const res = await axiosPublic.get('/homepageContent')
            return res?.data
        }
    })


    useEffect(() => {
        if (homepageContent[0]?.benefits) {
            setAllBenefits(homepageContent[0]?.benefits)
        }
    }, [homepageContent, isLoading])
    const { title: incomingTitle, imageUrl: incomingImageUrl, subtitle: incomingSubtitle, video_url: incomingVideo_url, milestoneImage: incomingMilestoneImg, seminarImage: incomingFreeSeminarImg } = homepageContent[0] || []





    const handleSubmit = async (event) => {
        const toastId = toast.loading("Home page content is updating...");
        event.preventDefault();
        const form = event.target;
        const video_url = form.video_url.value || '';
        const selectedImage = form.image.files[0] || {};
        const title = form.title.value || '';
        const subtitle = form.subtitle.value || '';
        const milestoneImage = form.milestoneImage.files[0] || {};
        const seminarImage = form.seminarImage.files[0] || {};
        let imageUrl = '';
        let milestoneImageUrl = '';
        let seminarImageUrl = '';
        if (!selectedImage?.name) {
            imageUrl = incomingImageUrl;
        } else {
            imageUrl = await uploadImg(selectedImage);
        }

        if (!milestoneImage?.name) {
            milestoneImageUrl = incomingMilestoneImg;
        } else {
            milestoneImageUrl = await uploadImg(milestoneImage);
        }
        console.log(milestoneImageUrl);
        if (!seminarImage?.name) {
            seminarImageUrl = incomingFreeSeminarImg;
        } else {
            seminarImageUrl = await uploadImg(seminarImage);
        }

        console.log(seminarImageUrl);

        const data = { video_url, title, imageUrl: imageUrl ? imageUrl : '', subtitle, milestoneImage: milestoneImageUrl, seminarImage: seminarImageUrl, benefits: allBenefits };
        console.log(data);

        axiosPublic.post(`/updateHomepageContent/${homepageContent[0]?._id || 'notAvailable'}`, data)
            .then(res => {
                toast.success("Home page Content Updated Successfully!!", { id: toastId });
                if (res.data?.modifiedCount || res.data?.insertedId) {
                    console.log(res.data);
                    homepageContentRefetch();
                }
            })
            .catch(err => {
                console.log(err);
                toast.error(err?.message, { id: toastId });
            });
    };
    return (
        <>
            <Helmet>
                <title>Dashboard | Homepage content</title>
            </Helmet>
            <div className='bg-gray-100 text-black'>

                {/* form section  */}
                <div className=''>

                    <section className="text-gray-600 body-font relative w-full lg:w-[73vw] mx-auto">
                        <div className="container mt-2 mx-auto">

                            <div className="lg:w-full mx-auto bg-white  py-5 rounded-xl">
                                <p className='text-center text-2xl font-bold pb-2'>Manage Homepage Content</p>

                                <div className="shadow-2xl  px-10 rounded-2xl">
                                    <form action="" onSubmit={handleSubmit} className='flex flex-wrap -m-2'>



                                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                            <div className=" w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Title</label><br />
                                                    <input defaultValue={incomingTitle} name='title' type="text" placeholder='Title' className="file-input file-input-bordered file-input-md w-full px-2" />
                                                </div>
                                            </div>
                                            <div className=" w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Subtitle</label><br />
                                                    <textarea defaultValue={incomingSubtitle} name='subtitle' type="text" placeholder='Subtitle' className="file-input file-input-bordered file-input-md w-full px-2 h-[100px]" />
                                                </div>
                                            </div>
                                            {/* benefits */}
                                            <AddBenefits allBenefits={allBenefits} setAllBenefits={setAllBenefits} />

                                            {/* video upload  */}
                                            <div className=" w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Main Video</label><br />
                                                    <input defaultValue={incomingVideo_url} name='video_url' type="text" placeholder='Video Url' className="file-input file-input-bordered file-input-md w-full px-2" />
                                                </div>
                                            </div>

                                            {/* image upload  */}
                                            <div className=" w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Banner Image</label><br />
                                                    <input name='image' type="file" className="file-input file-input-bordered file-input-md w-full" />
                                                </div>
                                            </div>
                                            {/* milestone image upload  */}
                                            <div className=" w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Milestone Image</label><br />
                                                    <input name='milestoneImage' type="file" className="file-input file-input-bordered file-input-md w-full" />
                                                </div>
                                            </div>
                                            {/* seminar image upload  */}
                                            <div className=" w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Free Seminar Image</label><br />
                                                    <input name='seminarImage' type="file" className="file-input file-input-bordered file-input-md w-full" />
                                                </div>
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
        </>
    );
};

export default ManageHomepageContent;