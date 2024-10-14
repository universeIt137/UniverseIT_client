import ButtonStrong from "../../../Shared/Button/ButtonStrong";
import { IoIosCall } from "react-icons/io";
const CallUs = () => {
    return (
        <div className="py-10 max-w-7xl mx-auto px-5">
            <div className="bg-[#303030] rounded-lg text-white px-5 sm:px-10 md:px-20 py-5 flex flex-col lg:flex-row items-center justify-between gap-2">
                <div>
                    <h2 className="capitalize font-semibold lg:font-bold text-xl text-center lg:text-start lg:text-2xl">Stay Tuned For Our Latest Course Offerings! Please Call Us At</h2>
                    <p className="text-sm sm:text-base text-center lg:text-start">9:00 am - 8:00 pm</p>
                </div>
                <ButtonStrong text={<span className="flex items-center gap-1"><IoIosCall /> 01886-061401</span>} />
            </div>
        </div>
    );
};

export default CallUs;