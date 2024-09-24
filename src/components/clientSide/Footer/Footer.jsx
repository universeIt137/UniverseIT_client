import { IoIosCall, IoIosMail } from 'react-icons/io';
import logo from '../../../assets/logo/whiteLogo.png'
import { FaLinkedin, FaLocationDot } from "react-icons/fa6";
import { FaFacebook, FaGithubSquare, FaTwitterSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className='bg-neutral'>
            <div className='max-w-7xl mx-auto'>
                <footer className="footer bg-neutral text-neutral-content p-10">
                    <form >
                        <img className='w-40' src={logo} alt="" />
                        <p className="max-w-[400px] font-medium text-gray-300">Universe IT is dedicated to providing IT training that equips students with the skills and expertise to thrive in today's competitive marketplace.</p>
                        <fieldset className="form-control sm:w-80">
                            <div className="join">
                                <input
                                    type="text"
                                    placeholder="username@site.com"
                                    className="input input-bordered join-item  w-[80%]" />
                                <button className="btn btn-primary join-item  bg-primary/95 border-none hover:bg-primary px-1 sm:px-5">Subscribe</button>
                            </div>
                        </fieldset>
                    </form>
                    <nav className='max-w-[220px] text-sm'>
                        <h6 className="footer-title">Contact</h6>
                        <a className="link link-hover  flex gap-2"> <span className='pt-2'><FaLocationDot /></span>House # 21/A (Lift 5th Floor),Road-2,Block-A,Aftabnagar(Beside East West University),Merul Badda,Dhaka.</a>
                        <a className="link link-hover flex gap-2">
                            <IoIosMail className="text-xl" />
                            universeitinstitute@gmail.com
                        </a>
                        <a className="link link-hover"><span className="flex items-center gap-2"><IoIosCall /> 01886-061401</span></a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Popular Courses</h6>
                        <a className="link link-hover">Digital Marketing</a>
                        <a className="link link-hover">Web Development</a>
                        <a className="link link-hover">App Development</a>
                        <a className="link link-hover">Graphics Design</a>
                        <a className="link link-hover">UI/UX Design</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Quick Link</h6>
                        <Link to={"/aboutUs"} className="link link-hover">About us</Link>
                        <Link to={"/faculties"} className="link link-hover">Our faculty</Link>
                        <Link to={"/career"} className="link link-hover">Career</Link>
                        <Link to={"/blogs"} className="link link-hover">Blogs</Link>
                        <Link to={"/successStory"} className="link link-hover">Success Story</Link>
                    </nav>

                </footer>
                <footer className="footer bg-neutral text-neutral-content items-center p-4 px-10">
                    <aside className="grid-flow-col items-center">

                        <p>© {new Date().getFullYear()} Universe IT. All right reserved.</p>
                    </aside>
                    <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                        <Link to={"https://www.facebook.com/UniverseITInstitute"} target='_blank' className='text-2xl sm:text-3xl'>
                            <FaFacebook />
                        </Link>
                        <Link to={"https://www.linkedin.com/"} target='_blank' className='text-2xl sm:text-3xl'>
                            <FaLinkedin />
                        </Link>
                        <Link to={"https://x.com/?lang=en"} target='_blank' className='text-2xl sm:text-3xl'>
                            <FaTwitterSquare />
                        </Link>
                        <Link to={"https://github.com/universeIt137"} target='_blank' className='text-2xl sm:text-3xl'>
                            <FaGithubSquare />
                        </Link>
                    </nav>
                </footer>
            </div>
        </div>
    );
};

export default Footer;