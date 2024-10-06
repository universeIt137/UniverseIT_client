import React from 'react';
import { MdWhatsapp } from 'react-icons/md';

const WhatsAppButton = () => {
    const phoneNumber = '+8801886061401'; // Replace this with your actual phone number
    const message = 'Hello, Universe IT Institute. I need help.'; // Customize the default message
    return (
        <div className="fixed bottom-20 lg:bottom-3 right-7 p-3 z-50"> {/* Adjust Tailwind classes as needed */}
            <a
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {/* Adjust icon size and color */}
                <div className="w-14 h-14 border  text-white  transition-all duration-300 active:scale-90 flex justify-center items-center rounded-full cursor-pointer relative overflow-hidden bounce-animation bg-green-700 hover:text-white hover:bg-white" >
                    <p className="z-10 text-5xl flex justify-center items-center w-full h-full  bg-green-500/10 hover:bg-white hover:text-green-700 transition-all duration-300 "><MdWhatsapp /></p>
                </div>
            </a>
        </div>
    );
};

export default WhatsAppButton;