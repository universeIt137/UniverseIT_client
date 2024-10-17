import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';
import VideoPlayingModal from '../../../Shared/VideoPlayingModal';
import ButtonStrong from '../../../Shared/Button/ButtonStrong';
import { Link } from 'react-router-dom';
import SuccessCard from '../../../components/clientSide/SuccessStories/SuccessCard';
import ComponentsTitle from '../../../Shared/ComponentsTitle/ComponentsTitle';
import { IoPlayCircleSharp } from 'react-icons/io5';
import ReactPlayer from 'react-player';
import FeedbackCard from './FeedbackCard';

const FeedbackComponent = ({ isHomePage = false }) => {

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

    const [seeMore, setSeeMore] = useState(false);
    const [modalVideoSrc, setModalVideoSrc] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { data: feedbacks = [], refetch, isLoading } = useQuery({
        queryKey: ['successStory'],
        queryFn: async () => {
            const res = await axiosPublic.get('/feedback');
            return res.data;
        }
    });
    if (isLoading) {
        return <Loading />
    }



    return (
        <div className="bg-[#fefaee] lg:py-10 ">
            <div className="max-w-7xl mx-auto">
                <ComponentsTitle title={'We Value Your Feedback'} description={'Your insights help us improve our services. Please take a moment to share your thoughts and suggestions.'} />




                {/* <div className="px-5">
                    <SuccessCard filteredSuccessStories={successStories} />
                </div> */}



                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {feedbacks?.map((story, index) => (
                        <div className="shadow-lg rounded-lg border" key={story._id}>
                            {/* Video Thumbnail with click to open modal */}
                            <div
                                onClick={() => handlePlayButtonClick(story?.video || story?.youtube_link)}
                                className="h-[35.9vw] lg:h-[15.9vw] cursor-pointer border rounded-lg overflow-hidden"
                            >
                                <ReactPlayer
                                    url={story?.video || story?.youtube_link}
                                    width="100%"
                                    height="100%"
                                    light={story?.image} // Display image thumbnail before the video plays
                                    playIcon={<IoPlayCircleSharp className="text-4xl text-white" />} // Custom play button
                                />
                            </div>

                            <div className="flex items-center">
                                {/* Thumbnail Image */}
                                <div className="avatar hidden lg:block">
                                    <div className="ring-primary ring-offset-base-100 w-12 m-5 rounded-full ring ring-offset-2">
                                        <img src={story?.image} alt="Success Story" className="w-52" />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="font-bold text-xs lg:text-xl">{story.name}</p>
                                    {/* Title used as a batch no */}
                                    <p className="text-xs text-gray-600">{story.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                






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

export default FeedbackComponent;