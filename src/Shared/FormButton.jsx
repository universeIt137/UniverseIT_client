import React from 'react';
import { MdWhatshot } from 'react-icons/md';
import { Link } from 'react-router-dom';

const FormButton = () => {
    return (
        <div className="fixed bottom-36 lg:bottom-20 right-3 p-3 z-50"> {/* Adjust Tailwind classes as needed */}
            <a

                target="_blank"
                rel="noopener noreferrer"
            >
                <Link to="/seminarForm">
                    <MdWhatshot className="text-blue-600 text-6xl" /> {/* Adjust icon size and color */}
                </Link>
            </a>
        </div>
    );
};

export default FormButton;