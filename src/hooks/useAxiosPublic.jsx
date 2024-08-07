import axios from "axios";
import { backendURL } from "../BackendURL";

const axiosPublic = axios.create({
    baseURL: backendURL
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic; 