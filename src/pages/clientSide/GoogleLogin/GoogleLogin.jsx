import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useGoogleLogin from "../../../hooks/useGoogleLogin";

const GoogleLogin = () => {
    const navigate = useNavigate()
    const handleGoogleLogin = useGoogleLogin()

    const handleGoogleLogIn = () => {
        handleGoogleLogin()
    }
    return (
        <div onClick={handleGoogleLogIn} className="cursor-pointer btn flex flex-col justify-center items-center px-7 py-1 rounded-md bg-primary text-white hover:font-bold transition-all duration-300 hover:bg-orange-700  active:bg-primary focus:outline-none focus:ring focus:ring-red-300 active:scale-90 focus:text-white w-max">
            Log In With <FaGoogle />
        </div>
    );
};

export default GoogleLogin;