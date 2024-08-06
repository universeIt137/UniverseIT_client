/* eslint-disable react/prop-types */
import { LuArrowUpRight } from "react-icons/lu";
import { FaStar, FaRegStar } from "react-icons/fa";
import Rating from "react-rating";
const CourseCard = ({ course = {}, isCoursePage = false }) => {
    const { title, category, rating, reviews, price, courseImage, instructor = {} } = course;
    const { name, enrolled, profileImage } = instructor;
    const cardStyle = 'w-[80vw] max-w-[280px] sm:w-[340px] sm:max-w-[300px]';
    const cardStyleForCoursePage = 'w-full max-w-[80vw] sm:max-w-[400px] '
    return (
        <div className={`card bg-base-100 mx-auto ${isCoursePage ? cardStyleForCoursePage : cardStyle}`}>
            <figure>
                <img
                    src={courseImage}
                    alt="Shoes" />
            </figure>
            <div className="card-body pt-5 px-3 sm:px-8">
                <p className="bg-primary/40 w-max px-1.5 rounded-sm text-xs py-0.5">{category}</p>
                <div className="flex justify-between w-full">
                    <h2 className="font-bold text-base sm:text-xl">{title}</h2>
                    <p className="flex justify-end text-xl sm:text-2xl"><LuArrowUpRight /></p>
                </div>
                <div className="flex gap-2 font-medium text-sm sm:text-base items-center">
                    <span className="py-0.5">{rating}</span>
                    <div className="text-base sm:text-xl text-primary">
                        <Rating
                            className="space-x-1"
                            emptySymbol={<FaRegStar />}
                            fullSymbol={<FaStar />}
                            initialRating={rating}
                            readonly
                        />
                    </div>
                    <span className="text-gray-500 py-1">({reviews})</span>
                </div>
                <div className="flex items-end">
                    <div className="flex gap-2 sm:gap-4">
                        <img className="size-11 sm:size-12 rounded-full object-cover" src={profileImage} alt="" />
                        <div className="text-xs sm:text-sm font-medium">
                            <p>{name}</p>
                            <p className="text-gray-500 font-normal">{enrolled} Enrolled</p>
                        </div>
                    </div>
                    <p className="text-end text-base sm:text-xl font-bold text-primary">
                        BDT
                        <br />
                        {price}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;