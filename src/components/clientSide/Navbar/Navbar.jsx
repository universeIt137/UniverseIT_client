import logo from '../../../assets/logo/mainLogo.png'
import { FiSearch } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa6";
import { Link, NavLink } from 'react-router-dom';
const Navbar = () => {
    const navStyle = `text-base font-semibold hover:text-primary ml-3 px-1 py-1 xl:py-2 rounded-lg relative navbarStylingComponentsParent w-max`
    const stylingComponents = <div className='h-[2px] bg-primary absolute bottom-0 left-0 navbarStylingComponents transition-all duration-300'></div>
    const navli = <>

        <NavLink to={'/courses'} className={`${navStyle}`}>
            <a>Courses</a>
            {stylingComponents}
        </NavLink>
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
        
        <div className='relative block xl:hidden'>
            <input className=' pl-10 px-5 py-3 border-[2.5px] border-gray-200 w-full xl:w-[400px] rounded-lg' type="text" placeholder='What do you want to learn?' />
            <FiSearch className='absolute top-4 left-3 text-gray-500 text-lg' />
        </div>
    </>
    return (
        <div className="bg-white w-full border-b-[3px] border-gray-300">
            <div className="navbar bg-base-100 max-w-7xl mx-auto flex justify-between items-center">
                <div className=" ">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost xl:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeNavLinknecap="round"
                                    strokeNavLinknejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-72 p-2 shadow bg-white text-black">
                            {navli}
                        </ul>
                    </div>
                    <div className='flex gap-5'>
                        <Link to={"/"}>
                            <img className='w-24 sm:w-40' src={logo} alt="" />
                        </Link>
                    </div>
                </div>
                <div className='relative hidden xl:block'>
                    <input className=' pl-10 px-5 py-3 border-[2.5px] border-gray-200 w-full xl:w-[400px] rounded-lg' type="text" placeholder='What do you want to learn?' />
                    <FiSearch className='absolute top-4 left-3 text-gray-500 text-lg' />
                </div>
                <div className="hidden xl:flex  ">
                    <ul className="menu menu-horizontal px-1">
                        {navli}
                    </ul>
                </div>
                <div className="">
                    <Link to="/courses">
                        <button className="text-sm sm:text-base bg-primary text-white hover:bg-primary px-2 py-2 sm:px-4 sm:py-3 flex sm:gap-2 items-center justify-center rounded-lg hover:rounded-xl transition-all duration-300 active:scale-90 font-medium">Browse Courses <FaAngleDown /></button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;