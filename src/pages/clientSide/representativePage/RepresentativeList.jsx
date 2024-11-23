import React from 'react';
import { Helmet } from 'react-helmet-async';
import log21 from '../../../assets/logo/mainLogo.png';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const RepresentativeList = () => {
    const axiosPublic = useAxiosPublic();

    const { data: items = [], isLoading } = useQuery({
        queryKey: ['faculties'],
        queryFn: async () => {
            const res = await axiosPublic.get('/faculty');
            return res.data;
        },
    });

    window.scrollTo(0, 0);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="sm:px-20 my-10 min-h-screen">
            <Helmet>
                <title>Universe IT | Repres</title>
            </Helmet>
            <p className="text-4xl m-10">
                <span className="font-bold border-b-2">Representative</span>
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5 justify-center px-2">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-gray-100 p-4 rounded-lg flex flex-col items-center text-center shadow-md"
                    >
                        {/* Faculty Image */}
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-24 h-24 rounded-full mb-3 object-cover"
                        />
                        {/* Faculty Details */}
                        <h2 className="text-lg font-bold">{item.name}</h2>
                        <p className="text-sm">{item.instituteName}</p>
                        {/* Optional Logo */}
                        <img
                            src={item.logoUrl || log21} // Fallback to default logo if `logoUrl` is not provided
                            alt="Logo"
                            className="w-8 h-8 mt-2 object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RepresentativeList;
