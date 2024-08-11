import { useRef, useState, useEffect } from "react";
import demoVideo1 from '../../../assets/demoVideo/demo1.mp4';
import demoVideo2 from '../../../assets/demoVideo/demo2.mp4';
import demoVideo3 from '../../../assets/demoVideo/demo3.mp4';
import { IoPlayCircleSharp } from "react-icons/io5";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
const SuccessStory = () => {
    const [seeMore, setSeeMore] = useState(false)
    const videos = [
        { id: 1, src: demoVideo1 },
        { id: 2, src: demoVideo2 },
        { id: 3, src: demoVideo3 },
    ];

    const videoRefs = useRef([]);
    const [videoStates, setVideoStates] = useState(videos.map(() => false));

    useEffect(() => {
        videos.forEach((video, index) => {
            const handlePause = () => {
                setVideoStates(prev => {
                    const newStates = [...prev];
                    newStates[index] = false;
                    return newStates;
                });
            };

            const videoElement = videoRefs.current[index];
            if (videoElement) {
                videoElement.addEventListener('pause', handlePause);
                return () => {
                    videoElement.removeEventListener('pause', handlePause);
                };
            }
        });
    }, []);
    const handleTogglePlay = (index) => {
        const videoElement = videoRefs.current[index];
        if (videoElement) {
            if (videoStates[index]) {
                videoElement.pause();
            } else {
                videoElement.play();
            }
            setVideoStates(prev => {
                const newStates = [...prev];
                newStates[index] = !newStates[index];
                return newStates;
            });
        }
    };
    return (
        <div className="space-y-3">
            <div className="flex justify-between">
                <h2 className='text-lg font-bold'>Success Story</h2>
                <p className="text-red-700 font-bold text-sm">See More</p>
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
                    {videos.map((video, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative">
                                <video
                                    ref={el => videoRefs.current[index] = el}
                                    className="rounded-lg shadow-lg w-full "
                                    controls
                                >
                                    <source src={video.src} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div onClick={() => handleTogglePlay(index)} className={`absolute inset-0 flex items-center justify-center ${videoStates[index] && 'hidden'} cursor-pointer `}>
                                    <button

                                        className="relative"
                                    >
                                        <span className="absolute size-4 bg-white top-4 left-4 z-0"></span>
                                        <IoPlayCircleSharp className=" text-5xl rounded-full text-red-600 relative z-10" />
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default SuccessStory;