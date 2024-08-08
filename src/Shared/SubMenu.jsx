import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';

const SubMenu = () => {
    return (
        <>
            <div className="bg-orange-700  py-2 text-white shadow-2xl hidden lg:flex">
                <div className='flex gap-5 w-10/12 mx-auto'>
                    <Link to="/onlineAdmission">
                        Online Admission
                    </Link>

                    <Link to="/freeSeminar">
                        Free Seminar
                    </Link>
                </div>

            </div>
        </>
    );
};

export default SubMenu;