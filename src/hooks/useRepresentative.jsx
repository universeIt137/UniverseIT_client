import React from 'react';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useRepresentative = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data, isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/usersByEmail/${user?.email}`);
            return res.data;
        }
    })

    const isRepresentative = data?.representative ? true : false;
    return [isRepresentative, isLoading];
   
};

export default useRepresentative;