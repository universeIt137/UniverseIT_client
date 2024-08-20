/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useState } from "react";

const AddInstructors = ({ allInstructors, setAllInstructors }) => {
    const axiosPublic = useAxiosPublic();
    const [Instructor, setInstructor] = useState({});
    const [err, setErr] = useState('')
    const { data: faculties = [] } = useQuery({
        queryKey: ['faculties'],
        queryFn: async () => {
            const res = await axiosPublic.get('/faculty');
            return res.data;
        }
    })

    const handleStoreInstructors = async () => {
        setErr('');
        if (!Instructor) {
            return setErr('Please, select an instructor!')
        }
        const selectedInstructorData = faculties?.find(item => item?._id === Instructor)
        setAllInstructors([...allInstructors, selectedInstructorData])
        setInstructor('')
    }
    const handleDeleteInstructor = (item) => {
        const newInstructors = allInstructors?.filter(i => i?._id !== item?._id);
        setAllInstructors(newInstructors)
    }

    return (
        <div className="p-2 w-full">
            <label className="leading-7 text-sm text-gray-600 font-bold">Add Instructors</label>
            <div className="relative space-y-2">
                <div>
                    <label className="leading-7 text-sm text-gray-600 font-bold">Instructor</label>
    
                    <select value={Instructor} onChange={(e) => {
                        setInstructor(e.target.value);
                        setErr('')
                    }} name="courseCategory" className="file-input file-input-bordered file-input-md w-full" >
                        <option value="">Select</option>
                        {
                            faculties?.map(item => <option key={item?._id} value={item?._id}>{item?.name}</option>)
                        }
                    </select>
                </div>

                <p className='text-red-500 text-sm'>{err}</p>
                <p onClick={handleStoreInstructors} className='btn flex flex-col justify-center items-center px-7 py-1 rounded-md bg-primary text-white hover:font-bold transition-all duration-300 hover:bg-orange-700  active:bg-primary focus:outline-none focus:ring focus:ring-red-300 active:scale-90 focus:text-white w-max'>Add</p>
            </div>

            <div className="flex flex-wrap gap-5 py-5">
                {allInstructors.map((item, index) => (
                    <div key={index} className="flex gap-2 sm:gap-4 relative">

                        <img className="size-16 rounded-full object-cover" src={item?.image} alt="" />
                        <div className="text-base font-medium">
                            <p onClick={() => handleDeleteInstructor(item)} className='text-center bg-primary/30 text-text_color size-6  rounded-md ml-auto mb-2 cursor-pointer'>X</p>
                            <p>{item?.name}</p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddInstructors;