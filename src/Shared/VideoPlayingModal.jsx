/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const VideoPlayingModal = ({ videoSrc, onClose }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    }, [videoSrc]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative w-full max-w-[75vw]  p-4">
                <button onClick={onClose} className="absolute top-0 right-[-20px] text-white text-4xl">&times;</button>
                <video ref={videoRef} className="w-full h-auto" controls>
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default VideoPlayingModal