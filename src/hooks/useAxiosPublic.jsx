import axios from "axios";
import { backendURL } from "../backendURL";

const axiosPublic = axios.create({
    baseURL: backendURL
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic; 