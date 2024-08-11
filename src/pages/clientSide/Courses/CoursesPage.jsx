
import ComponentsTitle from '../../../Shared/ComponentsTitle/ComponentsTitle'
import CourseCard from '../../../components/clientSide/Courses/CourseCard'
import { useState } from 'react'
import { IoFilter } from "react-icons/io5";
import Rating from 'react-rating'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { FaChevronDown } from "react-icons/fa";
import { Helmet } from 'react-helmet-async'
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query'
const CoursesPage = () => {
    const axiosPublic = useAxiosPublic();
    const [tabName, setTabName] = useState('All Courses')
    const [showAllRating, setShowAllRating] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0)
    const [showAllVideosDurations, setShowAllVideosDurations] = useState(false);
    const [selectedVideosDurations, setSelectedVideosDurations] = useState(0)
    const tabStyle = (incomingTabName) => {
        return `bg-primary/95 font-medium  rounded-t-lg px-7 py-2.5 active:scale-90 transition-all duration-300 hover:bg-primary ${incomingTabName === tabName ? 'bg-primary text-white' : 'bg-white hover:bg-primary/30'}`
    }


    const { data: courses = [], isLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/course');
            return res.data;
        }
    })
    console.log(courses);

    const ratingArray = [
        {
            rating: 4.5,
            clients: 10000
        },
        {
            rating: 4,
            clients: 10000
        },
        {
            rating: 3.5,
            clients: 10000
        },
        {
            rating: 3,
            clients: 10000
        }
    ]
    const videoDurationArray = [
        {
            duration: '0-1',
            videos: 3333
        },
        {
            duration: '1-3',
            videos: 12654
        },
        {
            duration: '3-6',
            videos: 3433
        },
        {
            duration: '6-8',
            videos: 1234
        },
        {
            duration: '8-10',
            videos: 5678
        },

    ]

    const toggleShowAllRating = () => {
        setShowAllRating(!showAllRating);
    };
    const handleSelectRating = (value) => {
        setSelectedRating(value)
    }
    const toggleShowAllVideosDuration = () => {
        setShowAllVideosDurations(!showAllVideosDurations);
    };
    const handleSelectVideosDuration = (value) => {
        setSelectedVideosDurations(value)
    }
    const rating = <div className='space-y-3'>
        <div onClick={toggleShowAllRating} className={`flex justify-between items-center py-1 hover:bg-gray-200 transition-all duration-200 cursor-pointer px-2 `}>
            <p className='font-bold'>Rating</p>
            <p className={`${!showAllRating ? 'rotate-0' : 'rotate-180'} transition-all duration-300`}><FaChevronDown /></p>
        </div>
        <div className={` ${!showAllRating ? 'max-h-[70px] overflow-hidden' : 'max-h-[500px]'} transition-all duration-300 relative`}>
            {
                ratingArray?.map((item, idx) => (
                    <div onClick={() => handleSelectRating(item.rating)} key={idx} className={`relative flex gap-1 font-medium items-center cursor-pointer`}>

                        <div className={`size-2 rounded-full border  ${selectedRating === item.rating ? 'bg-primary border-primary' : 'border-black'}`}></div>
                        <p className='text-primary'>
                            <Rating
                                className="space-x-1"
                                emptySymbol={<FaRegStar />}
                                fullSymbol={<FaStar />}
                                initialRating={item?.rating}
                                readonly
                            />
                        </p>
                        <p className='text-sm'>{item?.rating} & Up ({item.clients})</p>
                    </div>
                ))
            }
            <div className={`h-[20px] w-full absolute  bg-gradient-to-b from-white/50 to-white z-10  bottom-0 ${showAllRating ? 'hidden' : 'block'}`}></div>
        </div>
        <div className='text-center'>
            <button onClick={toggleShowAllRating} className='text-sm font-medium'>
                {showAllRating ? 'Show Less' : 'Show All'}
            </button>
        </div>
    </div>
    const videoDuration = <div className='space-y-3'>
        <div onClick={toggleShowAllVideosDuration} className={`flex justify-between items-center py-1 hover:bg-gray-200 transition-all duration-200 cursor-pointer px-2 `}>
            <p className='font-bold'>Video Duration</p>
            <p className={`${!showAllVideosDurations ? 'rotate-0' : 'rotate-180'} transition-all duration-300`}><FaChevronDown /></p>
        </div>
        <div className={` ${!showAllVideosDurations ? 'max-h-[70px] overflow-hidden' : 'max-h-[500px]'} transition-all duration-300 relative`}>
            {
                videoDurationArray?.map((item, idx) => (
                    <div onClick={() => handleSelectVideosDuration(item.duration)} key={idx} className={`relative flex gap-2 font-medium items-center cursor-pointer`}>

                        <div className={`size-3 border-2  ${selectedVideosDurations === item.duration ? 'bg-primary border-primary' : 'border-black'}`}></div>

                        <p className=''>{item?.duration} Hours ({item.videos})</p>
                    </div>
                ))
            }
            <div className={`h-[20px] w-full absolute  bg-gradient-to-b from-white/50 to-white z-10  bottom-0 ${showAllVideosDurations ? 'hidden' : 'block'}`}></div>
        </div>
        <div className='text-center'>
            <button onClick={toggleShowAllVideosDuration} className='text-sm font-medium'>
                {showAllVideosDurations ? 'Show Less' : 'Show All'}
            </button>
        </div>
    </div>
    return (
        <>
            <Helmet>
                <title>Universe IT | Courses</title>
            </Helmet>
            <div className="bg-gray-100">
                <div className=" py-2 max-w-7xl mx-auto">

                    <div className='flex gap-5'>
                        <div className='min-w-[240px] py-5 px-2 bg-white hidden md:block'>
                            <div className='flex gap-3'>
                                <div className='border-[2.5px] border-black max-w-max flex gap-2 justify-center items-center py-2 px-2'>
                                    Filter
                                    <IoFilter />
                                </div>
                                <div className='bg-white w-max py-1 px-2'>
                                    <p className='text-sm font-medium'>Sort By</p>
                                    <select className='font-medium cursor-pointer' name="" id="">
                                        <option>Most Popular</option>
                                        <option>Most Rated</option>
                                        <option>Good</option>
                                    </select>
                                </div>
                            </div>
                            <hr className='border-gray-500 my-5 border-[1px]' />

                            {rating}
                            <hr className='border-gray-500 my-5 border-[1px]' />
                            {videoDuration}
                        </div>
                        <div>
                            <ComponentsTitle title={'Our Demanding Courses'} description={'Elevate your skills with our demanding courses designed to push your boundaries and unlock your full potential.'} />
                            <div className="bg-white shadow-xl rounded-lg flex gap-5 flex-wrap max-w-max mx-auto ">
                                <button
                                    className={`${tabStyle('All Courses')}`}
                                    onClick={() => setTabName('All Courses')}
                                >All Courses</button>
                                <button
                                    className={`${tabStyle('Digital Marketing')}`}
                                    onClick={() => setTabName('Digital Marketing')}
                                >Digital Marketing</button>
                                <button
                                    className={`${tabStyle('Design & Development')}`}
                                    onClick={() => setTabName('Design & Development')}
                                >Design & Development</button>
                                <button
                                    className={`${tabStyle('Networking')}`}
                                    onClick={() => setTabName('Networking')}
                                >Networking</button>

                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 md:gap-y-20 gap-5 md:gap-x-10 pt-10 px-5'>
                                {
                                    courses?.map((course, idx) => <CourseCard key={idx} course={course}  isCoursePage={true} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CoursesPage;