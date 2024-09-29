/* eslint-disable react/prop-types */
import logo from '../../../assets/logo/mainLogo.png'
import { FiSearch } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa6";
import { Link, NavLink } from 'react-router-dom';
import NavBarDrawer from './NavBarDrawer';
import Hamburger from 'hamburger-react';
const Navbar = ({open, setOpen}) => {
    const navStyle = `text-base font-semibold hover:text-primary ml-3 px-1 py-1 xl:py-2 rounded-lg relative navbarStylingComponentsParent w-max`
    const stylingComponents = <div className='h-[2px] bg-primary absolute bottom-0 left-0 navbarStylingComponents transition-all duration-300'></div>
    const navli = <>

        <NavLink to={'/aboutUs'} className={`${navStyle}`}>
            <a>About us</a>
            {stylingComponents}
        </NavLink>
        <NavLink to={'/blogs'} className={`${navStyle}`}>
            <a>Blogs</a>
            {stylingComponents}
        </NavLink>
        <NavLink to={'/faculties'} className={`${navStyle}`}>
            <a>Faculties</a>
            {stylingComponents}
        </NavLink>
        <NavLink to={'/successStory'} className={`${navStyle}`}><a>Success Story</a>
            {stylingComponents}
        </NavLink>
        <div className="block xs:hidden pb-4">
            <Link to="/courses">
                <button className="text-sm sm:text-base bg-primary text-white hover:bg-text_color px-2 py-2 sm:px-4 sm:py-3 flex sm:gap-2 items-center justify-center rounded-lg hover:rounded-xl transition-all duration-300 active:scale-90 font-bold">Browse Courses</button>
            </Link>
        </div>
        <div className='relative block lg:hidden'>
            <input className=' pl-10 px-5 py-3 border-[2.5px] border-gray-200 w-full xl:w-[400px] rounded-lg' type="text" placeholder='What do you want to learn?' />
            <FiSearch className='absolute top-4 left-3 text-gray-500 text-lg' />
        </div>
    </>
     const openDrawer = () => setOpen(true);
    return (
        <div className="bg-white w-full border-b-2 border-gray-300">
            <div className="navbar bg-base-100 max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex flex-row-reverse subxl:flex-row justify-between w-full subxl:w-max">
                    <div className="subxl:hidden sm:px-3">
                    <Hamburger toggled={open} toggle={setOpen} onClick={openDrawer} size={20} duration={0.6} />
                    </div>
                    <div className='flex gap-5'>
                        <Link to={"/"}>
                            <img className='w-24 sm:w-40' src={logo} alt="" />
                        </Link>
                    </div>
                </div>
                <div className='relative hidden subxl:block'>
                    <input className=' pl-10 px-5 py-3 border-[2.5px] border-gray-200 w-full xl:w-[400px] rounded-lg' type="text" placeholder='What do you want to learn?' />
                    <FiSearch className='absolute top-4 left-3 text-gray-500 text-lg' />
                </div>
                <div className="hidden subxl:flex  ">
                    <ul className="menu menu-horizontal px-1">
                        {navli}
                    </ul>
                </div>
                <div className="hidden subxl:block">
                    <Link to="/courses">
                        <button className="text-sm sm:text-base bg-primary text-white hover:bg-text_color px-2 py-2 sm:px-4 sm:py-3 flex sm:gap-2 items-center justify-center rounded-lg hover:rounded-xl transition-all duration-300 active:scale-90 font-bold">Browse Courses </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;