/* eslint-disable react/prop-types */
import { FaBrain, FaHourglass, FaRegStar, FaStar } from 'react-icons/fa';
import Rating from 'react-rating';
import ReactPlayer from 'react-player';
import ButtonStrong from '../../../Shared/Button/ButtonStrong';
import { Link } from 'react-router-dom';
import { FaRegHourglass } from 'react-icons/fa6';
import { MdOutlineAccessTimeFilled, MdQuiz, MdVideoLibrary } from 'react-icons/md';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import SubVideos from './SubVideos';

const BannerSection = ({ courseData }) => {
    const { category, title, videoUrl, bannerImages = [], subVideos, notice, bangla, admissionNotice, courseFee, technologies = [], keyFeatures = [] } = courseData;
    const handleClick = () => {
        window.location.href = `tel:+8801755450127`;
    };
    return (
        <div className='flex flex-col lg:flex-row  my-5 gap-1 md:gap-5'>
            {/* video and technology section  */}
            <div className="lg:w-4/6 bg-white p-5 rounded-2xl ">
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

                        {
                            technologies?.map((item, idx) => <div key={idx} className="flex lg:justify-center  gap-2 ">
                                <div className="avatar">
                                    <div className="w-12 rounded-full ">
                                        <img src={item?.image} />
                                    </div>
                                </div>
                                <p className='font-bold  mb-2 text-center'>{item?.name}</p>
                            </div>)
                        }
                        {
                            technologies?.length < 1 && <p className='font-bold  mb-2 text-center'>No Technology added!!!</p>
                        }

                    </div>
                </section>

                {/* sub video  */}
                <div className='rounded-2xl'>
                    <SubVideos subVideos={subVideos} />
                </div>
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

                    <div className='flex flex-col justify-between min-h-full'>
                        <div className='mt-20'>
                            <p className='text-lg font-bold py-2'>This course includes:</p>
                            <ul className=' text-sm md:text-base  lg:text-start space-y-3'>
                                {
                                    keyFeatures?.map((item, idx) => <>
                                        <li key={idx} className='  flex items-center text-primary gap-2'> <span>{item}</span></li>
                                        <hr className='border-primary' />
                                    </>)
                                }
                                {
                                    keyFeatures?.length < 1 && 
                                    <>
                                        <li  className=' text-primary text-center'> No key features added!!</li>
                                        <hr className='border-primary' />
                                    </>
                                }
                            </ul>
                        </div>


                        <div className='mt-20'>
                            <div className='grid grid-cols-1  sm:grid-cols-2 gap-5 '>
                                <button className='w-full' onClick={handleClick}>
                                    <ButtonStrong isWidthFull={true} text={<span className='text-nowrap text-sm py-0.5'>CALL NOW</span>} />
                                </button>
                                <Link to={'/freeSeminar'}>
                                    <ButtonStrong isWidthFull={true} text={<span className='text-nowrap text-sm lg:text-xs xl:text-sm py-0.5 lg:py-1 xl:py-0.5'>JOIN FREE SEMINAR</span>} />
                                </Link>
                            </div>

                            <Link to={'/onlineAdmission'}>
                                <div className='py-3'><ButtonStrong text={'ENROLL NOW'} isWidthFull={true} /></div>
                            </Link>
                        </div>
                    </div>



                </div>

            </div>
        </div>
    );
};

export default BannerSection;