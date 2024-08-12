/* eslint-disable react/prop-types */
import { LuArrowUpRight } from "react-icons/lu";
import { FaStar, FaRegStar } from "react-icons/fa";
import Rating from "react-rating";
import { Link } from "react-router-dom";
const CourseCard = ({ course = {}, isCoursePage = false }) => {
    const { bannerImages, category, title, courseFee, _id } = course
    console.log(_id);

    // const { title, category, rating, reviews, price, courseImage, instructor = {} } = course;
    // const { name, enrolled, profileImage } = instructor;
    // console.log(profileImage);
    const cardStyle = 'w-[80vw] max-w-[280px] sm:w-[340px] sm:max-w-[300px] min-h-[450px]';
    const cardStyleForCoursePage = 'w-full max-w-[80vw] sm:max-w-[400px] '
    return (
        <div className={`card bg-base-100 mx-auto ${isCoursePage ? cardStyleForCoursePage : cardStyle}`}>
            <figure>
                <img
                    src={bannerImages[0]}
                    alt="Shoes" />
            </figure>
            <div className="card-body pt-5 px-3 sm:px-8">
               <div className="space-y-3 flex flex-col justify-between min-h-full">
                    <div className="space-y-2"> 
                        <div>
                            <p className=" w-max px-1.5 rounded-sm text-xs bg-primary/40 py-0.5">{category}</p>
                        </div>
                        <div className="flex justify-between w-full">
                            <h2 className="font-bold text-base sm:text-xl">{title}</h2>
                            <Link to={`/courseDetails/${_id}`}><p className="flex justify-end text-xl sm:text-2xl"><LuArrowUpRight /></p></Link>
                        </div>
                        <div className="flex gap-2 font-medium text-sm sm:text-base items-center">
                            <span className="py-0.5">{4.6}</span>
                            <div className="text-base sm:text-xl text-primary">
                                <Rating
                                    className="space-x-1"
                                    emptySymbol={<FaRegStar />}
                                    fullSymbol={<FaStar />}
                                    initialRating={4.6}
                                    readonly
                                />
                            </div>
                            <span className="text-gray-500 py-1">(1155)</span>
                        </div>
                    </div>
                    <div className="flex items-end">
                        <div className="flex gap-2 sm:gap-4">
                            <img className="size-11 sm:size-12 rounded-full object-cover" src={'https://i.ibb.co/zP8cG18/client10.jpg'} alt="" />
                            <div className="text-xs sm:text-sm font-medium">
                                <p>Atik Md Alavi</p>
                                <p className="text-gray-500 font-normal">300 Enrolled</p>
                            </div>
                        </div>
                        <p className="text-end text-base sm:text-xl font-bold text-primary">
                            BDT
                            <br />
                            {courseFee}
                        </p>
                    </div>
               </div>
            </div>
        </div>
    );
};

export default CourseCard;