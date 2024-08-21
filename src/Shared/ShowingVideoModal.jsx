/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
const ShowingVideoModal = ({ handleOpen, open, video }) => {

    return (
        <Dialog size='xl' open={open} handler={handleOpen} className='h-[70vh] relative'>
            <ReactPlayer
                controls="true"
                url={video}
                width="100%"
                height="100%"
            />
            <button onClick={handleOpen} className='text-white text-3xl border size-10  rounded-full absolute top-[-50px] right-[-10px] transition-all duration-300 active:scale-90 hover:bg-primary/20'>X</button>
        </Dialog>
    );
};

export default ShowingVideoModal;
