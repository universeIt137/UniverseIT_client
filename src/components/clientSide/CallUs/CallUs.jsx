import ButtonStrong from "../../../Shared/Button/ButtonStrong";
import { IoIosCall } from "react-icons/io";
const CallUs = () => {
    return (
        <div className="py-10 max-w-7xl mx-auto px-5">
            <div className="bg-black rounded-lg text-white px-5 sm:px-10 md:px-20 py-5 flex items-center justify-between gap-2">
                <div>
                    <h2 className="capitalize font-bold text-base sm:text-xl md:text-2xl">Stay Tuned For Our Latest Course Offerings! Please Call Us At</h2>
                    <p className="text-sm sm:text-base">9:00 am - 8:00 pm</p>
                </div>
                <ButtonStrong text={<span className="flex items-center gap-1"><IoIosCall /> 01958536781</span>} />
            </div>
        </div>
    );
};

export default CallUs;