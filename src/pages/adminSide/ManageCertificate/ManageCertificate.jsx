import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import CertificateRow from './CertificateRow';
import Loading from '../../../Shared/Loading/Loading';

const ManageCertificate = () => {
    const axiosPublic = useAxiosPublic();

    const { data: certificates = [], refetch, isLoading } = useQuery({
        queryKey: ['certificate'],
        queryFn: async () => {
            const res = await axiosPublic.get('/certificate');
            return res.data;
        }
    })
    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Helmet>
                <title>Dashboard | Manage Certificate</title>
            </Helmet>
            <div className="bg-white rounded-lg  w-full lg:w-[calc(100vw-300px)] overflow-x-auto mx-auto overflow-y-auto">
                <p className='text-2xl font-bold text-center'>Manage Certificate</p>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Student Name</th>
                                <th>Student Email</th>
                                {/* <th>Student ID</th> */}
                                <th>Certificate number</th>
                                <th>Course Name</th>
                                <th>Batch</th>
                                {/* <th>Duration</th> */}
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                certificates.map((certificate, idx) => <CertificateRow key={idx} certificate={certificate} refetch={refetch} />)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageCertificate;