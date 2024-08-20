import React from 'react';
import { MdWhatsapp } from 'react-icons/md';


const WhatsAppButton = () => {
    const phoneNumber = '01755450127'; // Replace this with your actual phone number
    const message = 'Hello, How can I help you?'; // Customize the default message
    return (
        <div className="fixed bottom-20 lg:bottom-3 right-3 p-3 z-40"> {/* Adjust Tailwind classes as needed */}
            <a
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <MdWhatsapp className="text-green-500 text-6xl" /> {/* Adjust icon size and color */}
            </a>
        </div>

       
    );
};

export default WhatsAppButton;