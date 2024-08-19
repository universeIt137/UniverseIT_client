/* eslint-disable react/prop-types */
 
const ButtonLight = ({ text }) => {
    return (
        <button className="bg-primary/10 px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-md font-medium  flex justify-center items-center hover:bg-text_color transition-all hover:text-white duration-300 active:scale-90 border-text_color border-2 ">{text}</button>
    );
};

export default ButtonLight;