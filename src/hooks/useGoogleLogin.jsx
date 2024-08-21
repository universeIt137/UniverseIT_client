// import React from 'react';


import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "./useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "./useAuth";

const useGoogleLogin = () => {
    const navigate = useNavigate()
    const { googleLogIn } = useAuth()
    const axiosPublic = useAxiosPublic();
    const handleGoogleLogin = () => {
        const toastId = toast.loading("Logging in...");
        googleLogIn()
            .then(res => {
                const userInfo = {
                    name: res?.user?.displayName,
                    email: res?.user?.email,
                    image: res?.user?.photoURL
                }
                toast.success("Logged In Successfully!", { id: toastId });
                navigate('/dashboard')
                // axiosPublic.post('/addUser', userInfo)
                //     .then(res => {
                //         toast.success("Logged In Successfully!", { id: toastId });

                //         navigate('/')
                //     })
                //     .catch(err=> {
                //         toast.error(err?.message, { id: toastId });  
                //     })


            })
            .catch(err => {
                toast.error(err?.message, { id: toastId });
            })
    }
    return handleGoogleLogin
};

export default useGoogleLogin;