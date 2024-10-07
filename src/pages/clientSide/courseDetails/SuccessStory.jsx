import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { IoPlayCircleSharp } from "react-icons/io5";
import 'swiper/css';  // Import Swiper styles
import 'swiper/css/pagination';  // Import pagination styles

const SuccessStory = ({ filteredSuccessStories }) => {
    const [modalVideoSrc, setModalVideoSrc] = useState(null); // Modal video source state
    const [isModalOpen, setIsModalOpen] = useState(false);    // Modal open/close state

    // Function to open the modal and set video source
    const handlePlayButtonClick = (videoSrc) => {
        setModalVideoSrc(videoSrc);  // Set the clicked video URL
        setIsModalOpen(true);        // Open the modal
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setModalVideoSrc(null);      // Clear video source
        setIsModalOpen(false);       // Close the modal
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
                    pagination={{ clickable: true }}  // Enable pagination dots
                    modules={[Pagination]}  // Only use Pagination module (no Navigation)
                    spaceBetween={0}
                    slidesPerView={1}
                    speed={300}
                    grabCursor={true}  // Enable dragging for slide change
                >
                    {filteredSuccessStories?.map((story, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative">
                                {/* Video Thumbnail with click to open modal */}
                                <div
                                    onClick={() => handlePlayButtonClick(story?.youtube_link || story?.video)}
                                    className="h-[35.9vw]  lg:h-[15.9vw] cursor-pointer"
                                >
                                    <ReactPlayer
                                        
                                        url={story?.youtube_link || story?.video}
                                        width="100%"
                                        height="100%"
                                        light={story?.image}  // Display image thumbnail before the video plays
                                        playIcon={<IoPlayCircleSharp className="text-4xl text-white" />}  // Custom play button
                                    />
                                </div>

                                <div className="flex items-center">
                                    {/* Thumbnail Image */}
                                    <div className="avatar">
                                        <div className="ring-primary ring-offset-base-100 w-12 m-5 rounded-full ring ring-offset-2">
                                            <img src={story?.image} alt="Success Story" />
                                        </div>
                                    </div>
                                    <div className="">
                                        <p className="font-bold">{story.name}</p>
                                        {/* title used as a batch no  */}
                                        <p className="text-xs text-gray-600">{story.title}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Modal to play video */}
            {isModalOpen && modalVideoSrc && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="relative w-[90%] max-w-4xl bg-black rounded-lg p-4">
                        {/* Close button */}
                        <button
                            className="absolute top-2 right-2 text-white text-2xl"
                            onClick={handleCloseModal}
                        >
                            ✕
                        </button>
                        {/* ReactPlayer inside the modal */}
                        <div className="w-full h-[60vh]">
                            <ReactPlayer
                                url={modalVideoSrc}
                                width="100%"
                                height="100%"
                                controls
                                playing
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuccessStory;
