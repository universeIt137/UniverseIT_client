import digitalMarketingImage from '../../../assets/coursesImg/digital marketing.jpg'
import webDesignImage from '../../../assets/coursesImg/web.jpg'
import graphicsDesignImage from '../../../assets/coursesImg/grphic.jpg'
import seoImage from '../../../assets/coursesImg/seo.jpg'
import fullStackImage from '../../../assets/coursesImg/fulStack.jpg'
import CourseCard from '../../../components/clientSide/Courses/CourseCard'
import Rating from 'react-rating'
import { FaRegStar, FaStar } from 'react-icons/fa'
import ButtonStrong from '../../../Shared/Button/ButtonStrong'
const RelatedCourse = () => {
    const allCourses = [
        {
            title: "Digital Marketing",
            category: "Digital Marketing",
            rating: 4.3,
            reviews: 1025,
            price: 10000,
            courseImage: digitalMarketingImage,
            instructor: {
                name: "Md Masud Rana",
                enrolled: 300,
                profileImage: "https://i.ibb.co/Y39KLDp/client1.jpg"
            }
        },
        {
            title: "Web Design",
            category: "Web Design",
            rating: 4.3,
            reviews: 1155,
            price: 10000,
            courseImage: webDesignImage,
            instructor: {
                name: "Atik Md Alavi",
                enrolled: 300,
                profileImage: "https://i.ibb.co/D4Sx9Wk/client2.jpg"
            }
        },
        {
            title: "Graphic Design",
            category: "Graphic Design",
            rating: 4.3,
            reviews: 930,
            price: 10000,
            courseImage: graphicsDesignImage,
            instructor: {
                name: "Fahim Ahammed Riyad",
                enrolled: 250,
                profileImage: "https://i.ibb.co/fD16FGy/client5.jpg"
            }
        },
        {
            title: "SEO Mastery",
            category: "Digital Marketing",
            rating: 4.5,
            reviews: 850,
            price: 12000,
            courseImage: seoImage,
            instructor: {
                name: "Nusrat Jahan",
                enrolled: 200,
                profileImage: "https://i.ibb.co/HBnLgL6/client8.webp"
            }
        },
        {
            title: "Full Stack Development",
            category: "Development",
            rating: 4.7,
            reviews: 1300,
            price: 15000,
            courseImage: fullStackImage,
            instructor: {
                name: "Shakib Khan",
                enrolled: 350,
                profileImage: "https://i.ibb.co/zP8cG18/client10.jpg"
            }
        }
    ];
    return (
        <div className=" py-5">
            <h2 className='text-lg font-bold'>Related Courses</h2>
            <div className='flex flex-col gap-5 py-5 overflow-hidden '>
                {
                    allCourses?.map((course, idx) => <div key={idx} className='flex flex-col sm:flex-row  gap-5 max-w-[500px]'>
                        <img className='object-cover rounded-md sm:size-[130px]' src={course?.courseImage} alt="" />
                        <div className='flex flex-wrap  gap-5 lg:gap-0 justify-between w-full'>
                            <div>
                                <h2 className='font-bold'>{course?.title}</h2>
                                <p className='text-sm'>{course?.instructor?.name}</p>
                                <div className="text-base sm:text-xl text-primary">
                                    <Rating
                                        className="space-x-1"
                                        emptySymbol={<FaRegStar />}
                                        fullSymbol={<FaStar />}
                                        initialRating={course?.rating}
                                        readonly
                                    />
                                </div>
                            </div>
                            <div className='flex items-center justify-end gap-3'>
                                <p>{course?.price}</p>
                                <button>
                                    <ButtonStrong text={'Enroll Now'} />
                                </button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default RelatedCourse;