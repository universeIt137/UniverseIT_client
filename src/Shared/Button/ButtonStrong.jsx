/* eslint-disable react/prop-types */

const ButtonStrong = ({ text }) => {
    return (
        <button className="bg-primary/95 px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base rounded-md font-medium text-white flex justify-center items-center hover:bg-primary transition-all duration-300 active:scale-90 ">{text}</button>
    );
};

export default ButtonStrong;