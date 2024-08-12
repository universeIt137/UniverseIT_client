import digitalMarketingImage from '../../../assets/coursesImg/digital marketing.jpg'
import webDesignImage from '../../../assets/coursesImg/web.jpg'
import graphicsDesignImage from '../../../assets/coursesImg/grphic.jpg'
import seoImage from '../../../assets/coursesImg/seo.jpg'
import fullStackImage from '../../../assets/coursesImg/fulStack.jpg'
import CourseCard from '../../../components/clientSide/Courses/CourseCard'
import Rating from 'react-rating'
import { FaRegStar, FaStar } from 'react-icons/fa'
import ButtonStrong from '../../../Shared/Button/ButtonStrong'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from '../../../hooks/useAxiosPublic'
const RelatedCourse = () => {
    const { id } = useParams();
    console.log(id);
    const { data: courses = [], isLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await useAxiosPublic.get('/course');
            return res.data;
        }
    })
    const filteredCourse = courses?.filter(course => course?._id !== id)

    return (
        <div className=" py-5">
            <h2 className='text-lg font-bold'>Related Courses</h2>
            <div className='flex flex-col gap-5 py-5 overflow-hidden '>
                {
                    filteredCourse?.map((course, idx) => <div key={idx} className='flex flex-col sm:flex-row  gap-5 max-w-[500px]'>
                        <img className='object-cover rounded-md sm:size-[130px]' src={course?.bannerImages[0] || ''} alt="" />
                        <div className='flex flex-wrap  gap-5 lg:gap-0 justify-between w-full'>
                            <div>
                                <h2 className='font-bold'>{course?.title}</h2>
                                <p className='text-sm'>Atik Md Alavi</p>
                                <div className="text-base sm:text-xl text-primary">
                                    <Rating
                                        className="space-x-1"
                                        emptySymbol={<FaRegStar />}
                                        fullSymbol={<FaStar />}
                                        initialRating={4.6}
                                        readonly
                                    />
                                </div>
                            </div>
                            <div className='flex items-center justify-end gap-3'>
                                <p>{course?.courseFee}৳</p>
                                <Link to={'/onlineAdmission'}>
                                    <ButtonStrong text={'Enroll Now'} />
                                </Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default RelatedCourse;