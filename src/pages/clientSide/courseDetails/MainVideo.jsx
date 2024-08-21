import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import ShowingVideoModal from '../../../Shared/ShowingVideoModal';

const MainVideo = ({ videoUrl }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);


    return (
        <div className="relative w-[80vw] h-[45.9vw] z-10 sm:w-full sm:h-[37vw] lg:h-[470px]  lg:mx-auto rounded-2xl p-2 bg-black border-2 border-black">
            <div onClick={handleOpen} className='absolute w-full h-full bg-transparent z-10 cursor-pointer'>

            </div>
            <ReactPlayer
                // controls="true"
                url={videoUrl}
                width="100%"
                height="100%"
            // onPlay={handleOpen}
            />
            <ShowingVideoModal handleOpen={handleOpen} open={open} video={videoUrl} />

        </div>
    );
};

export default MainVideo;