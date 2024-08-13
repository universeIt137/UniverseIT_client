/* eslint-disable react/prop-types */
import { FaBrain, FaHourglass, FaRegStar, FaStar } from 'react-icons/fa';
import Rating from 'react-rating';
import ReactPlayer from 'react-player';
import ButtonStrong from '../../../Shared/Button/ButtonStrong';
import { Link } from 'react-router-dom';
import { FaRegHourglass } from 'react-icons/fa6';
import { MdOutlineAccessTimeFilled, MdQuiz, MdVideoLibrary } from 'react-icons/md';
import { AiFillSafetyCertificate } from 'react-icons/ai';

const BannerSection = ({ courseData }) => {
    const { category, title, videoUrl, bannerImages = [], subVideos, notice, bangla, admissionNotice, courseFee } = courseData;
    const handleClick = () => {
        window.location.href = `tel:+8801755450127`;
    };
    return (
        <div className='flex flex-col lg:flex-row  my-5 gap-1 md:gap-5'>
            {/* video and technology section  */}
            <div className="lg:w-4/6 bg-yellow-100 p-5 rounded-2xl ">
                {/* main video  */}
                <div className="relative w-[80vw] h-[45.9vw] z-10 sm:w-full sm:h-[37vw] lg:h-[470px]  lg:mx-auto rounded-2xl p-2
                bg-black">
                    <ReactPlayer
                        controls="true"
                        url={videoUrl}
                        width="100%"
                        height="100%"
                    />
                </div>
                <section className=' my-4 bg-gray-200 rounded-xl p-5'>
                    <p className='font-bold text-xl mb-2' >Technologies you will learn</p>
                    <div className='grid lg:grid-cols-3 gap-3'>
                        <div className="flex lg:justify-center  gap-2 ">
                            <div className="avatar">
                                <div className="w-12 rounded-full ">
                                    <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1722946907/UniverseIT/technologies/tnwe31nhteiwsie2vvfz.png" />
                                </div>
                            </div>
                            <p className='font-bold  mb-2 text-center'>PowerPoint</p>
                        </div>
                        <div className="flex lg:justify-center  gap-2">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1722946907/UniverseIT/technologies/mvwtcz9phzjcunlqwasd.png" />
                                </div>
                            </div>
                            <p className='font-bold  mb-2 text-center'>Adobe InDesign</p>
                        </div>

                        <div className="flex lg:justify-center  gap-2">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1722946907/UniverseIT/technologies/q3nexwmhmp5o9hugongh.png" />
                                </div>
                            </div>
                            <p className='font-bold  mb-2 text-center'>Adobe Photoshop</p>
                        </div>

                        <div className="flex lg:justify-center  gap-2">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1722946907/UniverseIT/technologies/mwjlofwuru4lh9wyj7uk.png" />
                                </div>
                            </div>
                            <p className='font-bold  mb-2 text-center'>Adobe XD</p>
                        </div>

                        <div className="flex lg:justify-center  gap-2">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1722946907/UniverseIT/technologies/hffdvkkiy3maq6k6t9ce.png" />
                                </div>
                            </div>
                            <p className='font-bold  mb-2 text-center'>Adobe Illustrator</p>
                        </div>




                    </div>
                </section>
            </div>

            {/* sidebar */}
            <div className="lg:w-1/3 w-auto bg-white rounded-2xl overflow-hidden">
                <img src={bannerImages[0] || ''} alt="" />
                <div className='px-4 md:px-8 py-5'>
                    <div className='flex justify-between'>
                        <div>
                            <p className='font-bold text-lg'>{title}</p>
                            <p>{category}</p>
                        </div>
                        <p className="text-end text-base sm:text-xl font-bold text-primary">
                            Fee
                            <br />
                            {courseFee}<span className='font-bold text-2xl'>৳</span>
                        </p>
                    </div>
                    <p className='text-primary'>
                        <Rating
                            className="space-x-1"
                            emptySymbol={<FaRegStar />}
                            fullSymbol={<FaStar />}
                            initialRating={4}
                            readonly
                        />
                    </p>
                    <p className='lg:my-5 font-bold text-2xl md:hidden lg:text-start'>ফি ৩০০০ টাকা</p>
                    <p className='text-lg font-bold py-2'>This course includes:</p>
                    <ul className=' text-sm md:text-base  lg:text-start space-y-3'>
                        <li className='  flex items-center text-primary gap-2'><FaHourglass className='text-primary text-lg' /> <span>৪+ ঘন্টা প্রোজেক্ট বেসড টিউটোরিয়াল</span></li>
                        <hr className='border-primary' />
                        <li className='  flex items-center text-primary gap-2'><MdVideoLibrary className='text-primary text-lg' /> <span>৩০+ ভিডিও</span></li>
                        <hr className='border-primary' />
                        <li className='  flex items-center text-primary gap-2'><FaBrain className='text-primary text-lg' /> <span>৫০+ কুইজ</span></li>
                        <hr className='border-primary' />
                        <li className='  flex items-center text-primary gap-2'><MdQuiz className='text-primary text-lg' /> <span>৪ সেট কুইজ</span></li>
                        <hr className='border-primary' />
                        <li className='  flex items-center text-primary gap-2'><MdOutlineAccessTimeFilled className='text-primary text-lg' /> <span>লাইফ টাইম এক্সেস</span></li>
                        <hr className='border-primary' />
                        <li className='  flex items-center text-primary gap-2'><AiFillSafetyCertificate className='text-primary text-lg' /> <span>কোর্স শেষে সার্টিফিকেট</span></li>
                        <hr className='border-primary' />
                    </ul>
                    <Link to={'/onlineAdmission'}>
                        <div className='py-5'><ButtonStrong text={'ENROLL NOW'} isWidthFull={true} /></div>
                    </Link>

                    <p className='text-center'>Or</p>
                    <div className='grid grid-cols-1  sm:grid-cols-2 gap-5 py-5'>
                        <button className='w-full' onClick={handleClick}>
                            <ButtonStrong isWidthFull={true} text={<span className='text-nowrap text-sm py-0.5'>CALL NOW</span>} />
                        </button>
                        <Link to={'/freeSeminar'}>
                            <ButtonStrong isWidthFull={true} text={<span className='text-nowrap text-sm lg:text-xs xl:text-sm py-0.5 lg:py-1 xl:py-0.5'>JOIN FREE SEMINAR</span>} />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BannerSection;