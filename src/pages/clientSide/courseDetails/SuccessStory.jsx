import { useRef, useState, useEffect } from "react";
import { IoPlayCircleSharp } from "react-icons/io5";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";
import VideoPlayingModal from "../../../Shared/VideoPlayingModal";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

// Modal Component


const SuccessStory = () => {
    const [modalVideoSrc, setModalVideoSrc] = useState(null);

    const axiosPublic = useAxiosPublic();
    const { data: successStories = [], refetch } = useQuery({
        queryKey: ['successStory'],
        queryFn: async () => {
            const res = await axiosPublic.get('/successStory');
            return res.data;
        }
    });
    

    const videoRefs = useRef([]);

   


    const handlePlayButtonClick = (videoSrc) => {
        setModalVideoSrc(videoSrc);
    };

    const handleCloseModal = () => {
        setModalVideoSrc(null);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between">
                <h2 className='text-lg font-bold'>Success Story</h2>
                <Link to={'/successStory'}>
                    <p className="text-red-700 font-bold text-sm">See More</p>
                </Link>
            </div>
            <div className="w-full">
                <Swiper
                    navigation={true}
                    pagination={true}
                    modules={[Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    speed={300}
                >
                    {successStories.map((video, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative">
                                <video
                                    ref={el => videoRefs.current[index] = el}
                                    className="rounded-lg shadow-lg w-full"
                                    muted
                                >
                                    <source src={video?.video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div onClick={() => handlePlayButtonClick(video?.video)} className={`absolute inset-0 flex items-center justify-center  cursor-pointer`}>
                                    <button className="relative">
                                        <span className="absolute size-4 bg-white top-4 left-4 z-0"></span>
                                        <IoPlayCircleSharp className="text-5xl rounded-full text-red-600 relative z-10" />
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {modalVideoSrc && (
                <VideoPlayingModal videoSrc={modalVideoSrc} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default SuccessStory;
