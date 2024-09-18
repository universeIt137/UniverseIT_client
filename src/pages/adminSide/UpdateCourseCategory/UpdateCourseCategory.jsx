import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import Loading from "../../../Shared/Loading/Loading";
 
const UpdateCourseCategory = () => {
    const axiosPublic = useAxiosPublic()
    const { register, handleSubmit, reset } = useForm();
    const { courseId, categoryId } = useParams();
    const { data: course = {}, refetch: courseRefetch, isLoading } = useQuery({
        queryKey: ['course', courseId],
        queryFn: async () => {
            const res = await axiosPublic.get(`/course/${courseId}`)
            return res?.data
        }
    })
    const { data: courseCategory = {}, refetch: courseCategoryRefetch, isLoading: courseCategoryIsLoading } = useQuery({
        queryKey: ['singleCourseId', categoryId],
        queryFn: async () => {
            const res = await axiosPublic.get(`/courseCategory/${categoryId}`)
            return res?.data
        }
    })
    if (isLoading || courseCategoryIsLoading) {
        return <Loading/>
    }
    const { name: incomingName, qualification: incomingQualification, courseFee: incomingCourseFee, durationDetails: incomingDurationDetails, executiveBatch: incomingExecutiveBatch, regularBatch: incomingRegularBatch, duration: incomingDuration, totalClass: incomingTotalClass, type: incomingType } = courseCategory;

    const onSubmit = (data) => {
        const { name, qualification, courseFee, durationDetails, executiveBatch, regularBatch, timeNumber, timePeriod, totalClass, type } = data;
        console.log(timePeriod);
        const newData = { name, qualification, courseFee, durationDetails, executiveBatch, type, regularBatch, totalClass, duration: `${timeNumber} ${timePeriod}` }
        console.log(newData);
        const toastId = toast.loading("Category is updating...");
        axiosPublic.put(`/courseCategory/${categoryId}`, newData)
            .then(res => {

                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    console.log('Category added')
                    toast.success("Updated successfully!!", { id: toastId });
                    courseCategoryRefetch()
                }
            })
            .catch(err => {
                toast.error(err?.message, { id: toastId });
            })
    }
    return (
        <>
            <Helmet>
                <title>Dashboard | Update Course Category</title>
            </Helmet>
            <div className='w-full lg:w-[1000px] lg:max-w-[calc(100vw-400px)] mx-auto'>
                <div className="shadow-2xl px-10 rounded-2xl lg:w-full mx-auto bg-white mt-2">
                    <p className='text-center text-2xl font-bold py-2'>Update Course  Duration of {`"${course?.title}"`}</p>
                    <p className='text-lg font-bold pt-10'>Add Category</p>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-wrap -m-2'>
                        {/* Title */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                            {/* category title  */}
                            <div className="p-2 w-full md:col-span-2">

                                <label className="leading-7 text-sm text-gray-600 font-bold">Category title</label>
                                <input
                                    type="text"
                                    defaultValue={incomingName}
                                    {...register("name", { required: true })}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />

                            </div>
                            {/* duration  */}
                            <div className="p-2 w-full">
                                <label className="leading-7 text-sm text-gray-600 font-bold">Category Duration</label>
                                <div className="flex gap-5 w-full">
                                    <input
                                        type="number"
                                        defaultValue={incomingDuration.split(' ')[0]}
                                        placeholder="Number"
                                        {...register("timeNumber", { required: true })}
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                    <select
                                        defaultValue={incomingDuration.split(' ')[1]}
                                        placeholder="period"
                                        {...register("timePeriod", { required: true })}
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    >
                                        <option value="Month">Month</option>
                                        <option value="Year">Year</option>
                                    </select>
                                </div>
                            </div>
                            {/* type  */}
                            <div className="p-2 w-full">
                                <label className="leading-7 text-sm text-gray-600 font-bold">Type</label>
                                <div className="flex gap-5 w-full">
                                    <input
                                        type="text"
                                        placeholder="Type"
                                        defaultValue={incomingType}
                                        {...register("type", { required: true })}
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />

                                </div>
                            </div>
                            {/* durationDetails  */}
                            <div className="p-2 w-full">

                                <label className="leading-7 text-sm text-gray-600 font-bold">Duration Details</label>
                                <textarea
                                    type="text"
                                    defaultValue={incomingDurationDetails}
                                    {...register("durationDetails", { required: true })}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />

                            </div>
                            {/* course fee  */}
                            <div className="p-2 w-full">

                                <label className="leading-7 text-sm text-gray-600 font-bold">Course Fee</label>
                                <textarea
                                    {...register("courseFee", { required: true })}
                                    defaultValue={incomingCourseFee}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />

                            </div>
                            {/* totalClass  */}
                            <div className="p-2 w-full">

                                <label className="leading-7 text-sm text-gray-600 font-bold">Total Class</label>
                                <textarea
                                    defaultValue={incomingTotalClass}
                                    {...register("totalClass", { required: true })}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />

                            </div>
                            {/* regularBatch  */}
                            <div className="p-2 w-full">

                                <label className="leading-7 text-sm text-gray-600 font-bold">Regular Batch</label>
                                <textarea
                                    defaultValue={incomingRegularBatch}
                                    type="text"
                                    {...register("regularBatch", { required: true })}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />

                            </div>
                            {/* executiveBatch  */}
                            <div className="p-2 w-full">

                                <label className="leading-7 text-sm text-gray-600 font-bold">Executive Batch</label>
                                <textarea
                                    defaultValue={incomingExecutiveBatch}
                                    type="text"
                                    {...register("executiveBatch", { required: true })}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />

                            </div>
                            {/* qualification  */}
                            <div className="p-2 w-full">

                                <label className="leading-7 text-sm text-gray-600 font-bold">Qualification</label>
                                <textarea
                                    defaultValue={incomingQualification}
                                    type="text"
                                    {...register("qualification", { required: true })}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
        </>
    );
};

export default UpdateCourseCategory;