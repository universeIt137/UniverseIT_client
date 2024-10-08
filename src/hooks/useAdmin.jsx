import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data, isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/usersByEmail/${user?.email}`);
            return res.data;
        }
    })

    const isAdmin = data?.admin ? true : false
    return [isAdmin, isLoading]

};

export default useAdmin;