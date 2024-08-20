/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const ShowingVideoModal = ({ video }) => {
    const [isPlaying, setIsPlaying] = useState(true);

    const closeModal = () => {
        setIsPlaying(false);  // Pause the video
        document.getElementById('showYTVideo').close();
    };

    return (
        <dialog id="showYTVideo" className="modal">
            <div className="modal-box min-w-[80%] min-h-[80%] bg-black">
                <button
                    onClick={closeModal}
                    className="btn btn-sm btn-circle btn-ghost absolute right-1 top-0 text-white"
                >
                    ✕
                </button>
                <div className='h-[70vh]'>
                    <ReactPlayer
                        controls={true}
                        url={video}
                        width="100%"
                        height="100%"
                        playing={isPlaying}  // Control video playback with state
                    />
                </div>
            </div>
        </dialog>
    );
};

export default ShowingVideoModal;
