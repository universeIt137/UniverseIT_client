import { signOut } from "firebase/auth";
import { MdLogout } from "react-icons/md";
import auth from "../../../firebase/firebase.init";

const LogOut = () => {
    return (
        <button onClick={()=> signOut(auth)} className='border border-black px-5 py-2 rounded-lg flex gap-1 items-center hover:bg-gray-200 hover:border-transparent transition-all duration-300 active:scale-90'> Log Out <MdLogout /></button>
    );
};

export default LogOut;