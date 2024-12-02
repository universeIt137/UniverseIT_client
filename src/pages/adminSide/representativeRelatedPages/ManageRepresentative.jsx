import React, { useState } from 'react';
import RepresentativeTable from './RepresentativeTable';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { uploadImg } from '../../../UploadFile/uploadImg';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const ManageRepresentative = () => {

    const axiosPublic = useAxiosPublic();

    const { data: contents = [], refetch } = useQuery({
        queryKey: ['all dta'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    })

    const representatives = contents?.filter(item => item.hasOwnProperty('representative'));








   

    return (
        <div>
            <div className="w-10/12 mx-auto p-4">
                <Helmet>
                    <title>Dashboard | Manage Representative</title>
                </Helmet>
                
                


            </div>
            <RepresentativeTable contents={representatives} refetch={refetch} ></RepresentativeTable>
        </div>
    );
};

export default ManageRepresentative;