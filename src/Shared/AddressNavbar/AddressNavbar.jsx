import { IoIosMail } from "react-icons/io";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { useState } from "react";
const AddressNavbar = () => {
    const [language, setLanguage] = useState('eng')
    const handleEnglishLanguage = () => setLanguage('eng')
    const handleBanglaLanguage = () => setLanguage('ban')
    const socialIconsStyle = `text-2xl size-9 bg-black/20 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 active:scale-90`
    return (
        <div className="w-full bg-primary text-white py-2 px-10 hidden md:block">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex gap-x-10 flex-col lg:flex-row">
                    <div className="flex items-center gap-2">
                        <IoIosMail className="text-xl" />
                        <p>learn.universeit@gmail.com</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <BiSolidPhoneCall className="text-xl" />
                        <p>01919435672</p>
                    </div>
                </div>
                <div className="flex gap-10">
                    <div className="flex gap-4">
                        <p className={`${socialIconsStyle}`}><FaFacebookF /></p>
                        <p className={`${socialIconsStyle}`}><FaLinkedinIn /></p>
                        <p className={`${socialIconsStyle}`}><IoLogoYoutube /></p>
                    </div>
                    <dib className="flex gap-4">
                        <div className="h-10 px-4 bg-white rounded-md flex justify-center items-center gap-3">
                            <button onClick={handleBanglaLanguage} className={`size-7  text-xs relative rounded-md transition-all duration-300 active:scale-90 ${language==='ban' ? 'bg-primary text-white font-bold' : 'text-primary'}`}>
                                <span className="absolute left-[4px] top-[3px]">অ</span>
                                <span className="absolute  right-[4px] bottom-[3px]">A</span>
                            </button>
                            <button onClick={handleEnglishLanguage} className={`size-7  text-center text-sm flex justify-center items-center rounded-md transition-all duration-300 active:scale-90 ${language==='eng' ? 'bg-primary text-white font-bold' : 'text-primary'}`}>
                                EN
                            </button>
                        </div>
                        <button className="h-10 px-7 bg-white text-primary rounded-md text-sm font-bold">Log In</button>
                    </dib>
                </div>
            </div>
        </div>
    );
};

export default AddressNavbar;