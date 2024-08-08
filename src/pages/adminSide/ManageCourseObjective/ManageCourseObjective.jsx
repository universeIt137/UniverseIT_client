import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { FaAngleDown } from 'react-icons/fa';
import Faq from 'react-faq-component';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
const ManageCourseObjective = () => {
    const axiosPublic = useAxiosPublic();
    const [rows, setRowsOption] = useState(null)
     


    const { register, handleSubmit, reset } = useForm();
    const [showAddFAQForm, setShowAddFAQForm] = useState(false)
    const { id } = useParams();
    const { data: course = {}, refetch: courseRefetch, isLoading } = useQuery({
        queryKey: ['course', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/course/${id}`)
            return res?.data
        }
    })
    const { data: courseObjectives = [], refetch: courseObjectiveRefetch, isLoading: courseObjectivesIsLoading } = useQuery({
        queryKey: ['courseObjective', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/objectives/course/${id}`);
            return res?.data;
        }
    });
    useEffect(() => {
        if (courseObjectives.length > 0) {
            rows && rows[0].expand()
        }
    }, [courseObjectives, rows])


    if (isLoading || courseObjectivesIsLoading) {
        return '';
    }

    const courseObjective = courseObjectives[0] || {};

    const { _id, courseId, objectiveFAQ = [] } = courseObjective;
    console.log(objectiveFAQ);


    const onSubmit = async (data) => {
        console.log(data);
        const allFAQ = [...objectiveFAQ, { ...data, faqId: new Date().getTime() }];
        const postingData = { objectiveFAQ: allFAQ, courseId: id };
        console.log(postingData);
        const toastId = toast.loading("FAQ is adding...");
        if (!_id) {
            axiosPublic.post('/objectives', postingData)
                .then(res => {
                    console.log(res);
                    if (res.data.insertedId) {
                        courseObjectiveRefetch()
                        reset()
                        setShowAddFAQForm(false)
                        toast.success("Added Successfully!!", { id: toastId });
                    }
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err?.message, { id: toastId });
                })
        } else {
            axiosPublic.put(`/objectives/${_id}`, postingData)
                .then(res => {
                    console.log(res);
                    if (res.data.modifiedCount > 0) {
                        courseObjectiveRefetch()
                        reset()
                        setShowAddFAQForm(false)
                        toast.success("Added Successfully!!", { id: toastId });
                    }
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err?.message, { id: toastId });
                })
        }
    }
    const handleDelete = (faqId) => {
        console.log(faqId, objectiveFAQ);
        const newFAQ = objectiveFAQ.filter(faq => faq.faqId !== faqId);
        console.log(newFAQ);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("FAQ is Deleting...");
                axiosPublic.put(`/objectives/${_id}`, { objectiveFAQ: newFAQ })
                    .then(res => {
                        console.log(res);
                        if (res.data.modifiedCount > 0) {
                            courseObjectiveRefetch()
                            reset()
                            toast.success("Deleted Successfully!!", { id: toastId });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error(err?.message, { id: toastId });
                    })

            }
        });
    }

    let convertedArray = objectiveFAQ.map(item => {
        return {
            title: <div className='flex gap-5 justify-between'>
                <p className='font-bold'>{item.question}</p>
                <button onClick={() => handleDelete(item.faqId)} className='absolute right-[-30px] top-3 size-7 rounded-md bg-red-500 hover:bg-red-600 flex justify-center items-center text-lg text-white active:scale-90 transition-all duration-300'><MdDelete /></button>
            </div>,
            content: item.answer,

        };
    });
    const showingDataAtFAQ = {
        title: '',
        rows: convertedArray
    }
    const config = {
        animate: true,
        arrowIcon: "V",
        openOnload: 1,
        expandIcon: "+",
        collapseIcon: "-",
    };
    console.log(convertedArray);
    return (
        <>
            <Helmet>
                <title>Dashboard | Manage Course Objectives</title>
            </Helmet>
            <div className='w-full lg:w-[1000px] lg:max-w-[calc(100vw-400px)] mx-auto '>
                <div className="shadow-2xl px-10 rounded-2xl lg:w-full mx-auto bg-white mt-2 pb-10">
                    <p className='text-center text-2xl font-bold py-2'>
                        Manage Course Objectives of {`"${course?.title}"`}
                    </p>
                    <div className='space-y-10'>
                        <p className='text-lg font-bold pt-10'>All FAQ</p>
                        {
                            objectiveFAQ.length < 1 ? <p className="pb-10 pt-5 text-center">No FAQ Found</p> : <Faq config={config} getRowOptions={setRowsOption} data={showingDataAtFAQ} />
                        }
                        <button onClick={() => setShowAddFAQForm(!showAddFAQForm)} className='flex flex-col justify-center items-center px-7 py-1 rounded-md bg-primary text-white hover:font-bold transition-all duration-300 hover:bg-[#e55633]  active:bg-primary focus:outline-none focus:ring focus:ring-red-300 active:scale-90 focus:text-white w-max mx-auto'>
                            <span className='text-[12px]'>{showAddFAQForm ? 'Hide Form' : 'Add FAQ'}</span>
                            <span className={`text-sm transition-all duration-300 ${showAddFAQForm ? 'rotate-180 hidden' : 'rotate-0 '}`}>+</span>
                            <FaAngleDown className={`text-sm transition-all duration-300 ${showAddFAQForm ? 'rotate-180' : 'rotate-0 hidden'}`} />
                        </button>
                        <form className={` ${showAddFAQForm ? 'flex flex-wrap -m-2' : 'hidden'}`} onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 w-full">
                                <div className="p-2 w-full">
                                    <label className="leading-7 text-sm text-gray-600 font-bold">Question</label>
                                    <input
                                        type="text"
                                        {...register('question', { required: true })}
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                                <div className="p-2 w-full">
                                    <label className="leading-7 text-sm text-gray-600 font-bold">Answer</label>
                                    <textarea
                                        {...register('answer', { required: true })}
                                        type="text"
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out min-h-[130px]"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button type="submit" className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageCourseObjective;
