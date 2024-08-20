import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import ShowingVideoModal from '../../../Shared/ShowingVideoModal';

const MainVideo = ({ videoUrl }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        document.getElementById('showYTVideo').showModal()
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative w-[80vw] h-[45.9vw] z-10 sm:w-full sm:h-[37vw] lg:h-[470px]  lg:mx-auto rounded-2xl p-2 bg-black border-2 border-black">
            <div onClick={openModal} className='absolute w-full h-full bg-transparent z-10 cursor-pointer'>

            </div>
            <ReactPlayer
                // controls="true"
                url={videoUrl}
                width="100%"
                height="100%"
                onPlay={openModal}
            />

            <ShowingVideoModal closeModal={closeModal} video={videoUrl} />
        </div>
    );
};

export default MainVideo;