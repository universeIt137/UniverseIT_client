import logo from '../../assets/logo.png'
import { FiSearch } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa6";
const Navbar = () => {
    const navLi = <>
        <li className='text-base font-semibold'><a>Home</a></li>
        <li className='text-base font-semibold'><a>About us</a></li>
        <li className='text-base font-semibold'><a>Success Story</a></li>
        <li className='text-base font-semibold'><a>Contact</a></li>
        <div className='relative block lg:hidden'>
                    <input className=' pl-10 px-5 py-3 border-[2.5px] border-gray-200 w-full lg:w-[400px] rounded-lg' type="text" placeholder='What do you want to learn?' />
                    <FiSearch className='absolute top-4 left-3 text-gray-500 text-lg' />
                </div>
    </>
    return (
        <div className="w-full border-b-[3px] border-gray-300">
            <div className="navbar bg-base-100 max-w-7xl mx-auto flex justify-between items-center">
                <div className=" ">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-72 p-2 shadow bg-primary text-white">
                            {navLi}
                        </ul>
                    </div>
                    <div className='flex gap-5'>
                        <img className='w-24 sm:w-40' src={logo} alt="" />

                    </div>
                </div>
                <div className='relative hidden lg:block'>
                    <input className=' pl-10 px-5 py-3 border-[2.5px] border-gray-200 w-full lg:w-[400px] rounded-lg' type="text" placeholder='What do you want to learn?' />
                    <FiSearch className='absolute top-4 left-3 text-gray-500 text-lg' />
                </div>
                <div className="hidden lg:flex  ">
                    <ul className="menu menu-horizontal px-1">
                        {navLi}
                    </ul>
                </div>
                <div className="">
                    <button className="text-sm sm:text-base bg-primary text-white hover:bg-primary px-2 py-2 sm:px-4 sm:py-3 flex sm:gap-2 items-center justify-center rounded-lg hover:rounded-xl transition-all duration-300 active:scale-90 font-medium">Browse Courses <FaAngleDown/></button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;