import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaUser } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Loading from '../../../Shared/Loading/Loading';

const Profile = () => {

  const axiosPublic = useAxiosPublic();
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await axiosPublic.get('/course');
      return res.data;
    }
  })
  

  // Faculty Data 
  const { data: faculties = [] } = useQuery({
    queryKey: ['faculties'],
    queryFn: async () => {
      const res = await axiosPublic.get('/faculty');
      return res.data;
    }
  })

  


  // Executive Members 
  const { data: members = [] } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axiosPublic.get('/team-member');
      return res.data;
    }
  })



  // Admission Requests

  const { data: admissionRequests = [] } = useQuery({
    queryKey: ['admissionRequests'],
    queryFn: async () => {
        const res = await axiosPublic.get('/admission');
        return res.data;
    }
  })
  

  // seminar request 
  const { data: seminarRequests = []} = useQuery({
    queryKey: ['seminarRequests'],
    queryFn: async () => {
        const res = await axiosPublic.get('/seminarRequest');
        return res.data;
    }
})

if (isLoading) {
    return <Loading />
}


  return (
    <>
      <Helmet>
        <title>Dashboard </title>
      </Helmet>

      <div className="grid lg:grid-cols-3 gap-5 m-3">

        <div className="bg-white flex justify-around items-center rounded-lg py-5 shadow-sm shadow-secondary">
          <div className="bg-primary text-white shadow-sm border p-5 border rounded-full text-3xl ">
            <FaUser />
          </div>
          <div className="">
            <p className='text-3xl text-primary font-semibold'>154</p>
            <p className='text-pretty text-gray-500'>Total visitors</p>
          </div>
        </div>

        <div className="bg-white flex justify-around items-center rounded-lg py-5 shadow-sm shadow-secondary">
          <div className="bg-primary text-white shadow-sm border p-5 border rounded-full text-3xl ">
            <FaUser />
          </div>
          <div className="">
            <p className='text-3xl text-primary font-semibold'>14</p>
            <p className='text-pretty text-gray-500'>Total Accounts</p>
          </div>
        </div>

        <div className="bg-white flex justify-around items-center rounded-lg py-5 shadow-sm shadow-secondary">
          <div className="bg-primary text-white shadow-sm border p-5 border rounded-full text-3xl ">
            <FaUser />
          </div>
          <div className="">
            <p className='text-3xl text-primary font-semibold'>{courses.length}</p>
            <p className='text-pretty text-gray-500'>Total Courses</p>
          </div>
        </div>

        <div className="bg-white flex justify-around items-center rounded-lg py-5 shadow-sm shadow-secondary">
          <div className="bg-primary text-white shadow-sm border p-5 border rounded-full text-3xl ">
            <FaUser />
          </div>
          <div className="">
            <p className='text-3xl text-primary font-semibold'>{faculties.length}</p>
            <p className='text-pretty text-gray-500'>Total Teachers</p>
          </div>
        </div>
        <div className="bg-white flex justify-around items-center rounded-lg py-5 shadow-sm shadow-secondary">
          <div className="bg-primary text-white shadow-sm border p-5 border rounded-full text-3xl ">
            <FaUser />
          </div>
          <div className="">
            <p className='text-3xl text-primary font-semibold'>{ members.length }</p>
            <p className='text-pretty text-gray-500'>Total Executive Members</p>
          </div>
        </div>

        <div className="bg-white flex justify-around items-center rounded-lg py-5 shadow-sm shadow-secondary">
          <div className="bg-primary text-white shadow-sm border p-5 border rounded-full text-3xl ">
            <FaUser />
          </div>
          <div className="">
            <p className='text-3xl text-primary font-semibold'>1</p>
            <p className='text-pretty text-gray-500'>Total Admins</p>
          </div>
        </div>
        <div className="bg-white flex justify-around items-center rounded-lg py-5 shadow-sm shadow-secondary">
          <div className="bg-primary text-white shadow-sm border p-5 border rounded-full text-3xl ">
            <FaUser />
          </div>
          <div className="">
            <p className='text-3xl text-primary font-semibold'>{ admissionRequests.length }</p>
            <p className='text-pretty text-gray-500'>Total Admission Requests</p>
          </div>
        </div>
        <div className="bg-white flex justify-around items-center rounded-lg py-5 shadow-sm shadow-secondary">
          <div className="bg-primary text-white shadow-sm border p-5 border rounded-full text-3xl ">
            <FaUser />
          </div>
          <div className="">
            <p className='text-3xl text-primary font-semibold'>{ seminarRequests.length}</p>
            <p className='text-pretty text-gray-500'>Total Seminars Requests</p>
          </div>
        </div>




      </div>


    </>
  );
};

export default Profile;