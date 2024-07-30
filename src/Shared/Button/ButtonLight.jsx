/* eslint-disable react/prop-types */

const ButtonLight = ({ text }) => {
    return (
        <button className="bg-primary/10 px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base rounded-md font-medium  flex justify-center items-center hover:bg-primary/20 transition-all duration-300 active:scale-90 border-primary border-2 ">{text}</button>
    );
};

export default ButtonLight;