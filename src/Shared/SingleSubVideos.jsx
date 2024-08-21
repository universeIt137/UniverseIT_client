import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import ShowingVideoModal from './ShowingVideoModal';

const SingleSubVideos = ({ video }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    const videoDivStyle = 'rounded-md overflow-hidden k w-[230px] h-[130px] relative'
    return (
        <div className={`${videoDivStyle}`}>
            <div onClick={handleOpen} className='w-full h-full bg-transparent absolute cursor-pointer'></div>
            <ReactPlayer
                controls="true"

                url={video}
                width="100%"
                height='100%'
            />
            <ShowingVideoModal handleOpen={handleOpen} open={open} video={video} />
        </div>

    );
};

export default SingleSubVideos;