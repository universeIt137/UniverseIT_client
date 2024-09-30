import React from 'react';
import { FaHome, FaBlog, FaUsers, FaTrophy } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { IoSchool } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
const BottomNavbar = () => {
    const navLi = [
        { name: 'Home', link: '/', icon: <FaHome /> },
        { name: 'About Us', link: '/aboutUs', icon: <IoIosPeople /> },
        { name: 'Blogs', link: '/blogs', icon: <FaBlog /> },
        { name: 'Faculties', link: '/faculties', icon: <FaUsers /> },
        { name: 'Success Story', link: '/successStory', icon: <FaTrophy /> },
        { name: 'Courses', link: '/courses', icon: <IoSchool /> },
      ];
    return (
        <nav className="bg-gray-200 py-2 w-full">
      <ul className="flex justify-center space-x-3  sm:space-x-8">
        {navLi.map((navItem, index) => (
          <li key={index} className="text-center bottom">
            <NavLink
              to={navItem.link}
              className="flex flex-col items-center text-black"
            >
              <div className="text-base">{navItem.icon}</div>
              <span className="text-[10px] xs:text-xs mt-1">{navItem.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
    );
};

export default BottomNavbar;