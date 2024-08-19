import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BiLogoTwitter } from 'react-icons/bi';
import { TbBrandYoutubeFilled } from 'react-icons/tb';
import { FaFacebook } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CreateCertificate = () => {
    const axiosPublic = useAxiosPublic();
    const [durationLoading, setDurationLoading] = useState(false)
    // const [courseDurations, setCourseDurations] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('')
    const [selectedYear, setSelectedYear] = useState('')
    // const [selectedDuration, setSelectedDuration] = useState('')
    const [givenCertificateNumber, setGivenCertificateNumber] = useState('');
    // const [studentIdLoading, setStudentIDLoading] = useState(false);
    // const [studentIdErr, setStudentIDErr] = useState(false);
    // const [studentID, setStudentID] = useState('')
    const { register, handleSubmit, reset } = useForm();
    const { data: courses = [], isLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/course');
            return res.data;
        }
    })


    // useEffect(() => {
    //     if (selectedCourse && selectedDuration && selectedYear && givenCertificateNumber) {
    //         const courseNameFirstLetter = selectedCourse.split(' ').map(item => item[0]).join('');
    //         const durationFirstLetter = `${selectedDuration.split(' ')[0]}${selectedDuration.split(' ')[1][0].toUpperCase()}`;
    //         const yearFirstLetter = selectedYear.slice(-2);
    //         const createdStudentID = courseNameFirstLetter + durationFirstLetter + yearFirstLetter + givenCertificateNumber.toString().padStart(4, '0');
    //         // setStudentID(createdStudentID)
    //         setStudentIDLoading(true)
    //         axiosPublic.get('/certificate')
    //             .then(res => {
    //                 console.log(res?.data);
    //                 const isIdUnique = !res?.data?.find(item => item?.studentID === createdStudentID);
    //                 console.log(isIdUnique);
    //                 setStudentIDErr(!isIdUnique)
    //                 setStudentIDLoading(false)
    //             })
    //             .catch(() => {
    //                 setStudentIDLoading(false)
    //             })
    //     } else {
    //         // setStudentID('')
    //         setStudentIDErr(false)
    //     }
    // }, [selectedCourse, selectedDuration, selectedYear, givenCertificateNumber])

    // useEffect(,[])
    if (isLoading) {
        return ''
    }


    const onSubmit = async (data) => {
        // if (studentIdErr) {
        //     return Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "take a unique Student Id",
        //     });
        // }
        const finalData = {
            ...data,
            // studentID: studentID
        };
        console.log(finalData);
        const toastId = toast.loading("Certificate is creating...");
        axiosPublic.post('/certificate', finalData)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Certificate created successfully', { id: toastId })
                    reset()
                    setSelectedCourse('');
                    // setSelectedDuration('');
                    setSelectedYear('');
                    setGivenCertificateNumber('')
                }
            })
            .catch(err => {
                toast.error(err?.message, { id: toastId })

            })
    };

    const inputFieldStyle = 'w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out h-[40px]'

    const handleCourseChange = (e) => {
        const courseID = courses?.find(item => item?.title === e.target.value)?._id || '';
        setSelectedCourse(e.target.value);
        // setSelectedDuration('')
        if (courseID) {
            setDurationLoading(true)
            axiosPublic.get(`/courseCategory/course/${courseID}`)
                .then(res => {
                    const durationArray = res.data.map(item => item?.duration);
                    console.log(durationArray);
                    // setCourseDurations(durationArray)
                    setDurationLoading(false)
                })
                .catch(() => {
                    setDurationLoading(false)
                })
        } else {
            // setCourseDurations([])
        }


    }

    return (
        <>
            <Helmet>
                <title>Dashboard | Add Faculty</title>
            </Helmet>
            <div className='bg-gray-100 text-black'>

                {/* form section  */}
                <div className=''>

                    <section className="text-gray-600 body-font relative">
                        <div className="container  px-4  mx-auto">

                            <div className="lg:w-full md:w-2/3 mx-auto bg-white px-10 py-5 rounded-xl">
                                <p className='text-center text-2xl font-bold pb-2'>Create Certificate</p>

                                <div className="rounded-2xl">
                                    <form action="" onSubmit={handleSubmit(onSubmit)} className='sm:grid sm:grid-cols-2 -m-2'>

                                        {/* Student Name  */}

                                        {/* about Student */}
                                        <h2 className='sm:col-span-2 text-lg font-bold'>Student Info.</h2>
                                        <div className="p-2 w-full">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Student Name</label>
                                                <input type="text" {...register("studentName", { required: true })} className={`${inputFieldStyle}`} />
                                            </div>
                                        </div>

                                        {/* email  */}
                                        <div className="p-2 w-full">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Student Email</label>
                                                <input type="email" {...register('email', { required: true })} className={`${inputFieldStyle}`} />
                                            </div>
                                        </div>
                                        {/* Certificate Number  */}
                                        <div className="p-2 w-full">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Certificate Number</label>
                                                <input value={givenCertificateNumber} type="text" {...register('certificateNumber', {
                                                    required: true, onChange: (e) => {
                                                        setGivenCertificateNumber(e.target.value);

                                                    }
                                                })} className={`${inputFieldStyle}`} />
                                            </div>
                                        </div>
                                        {/* Student ID */}
                                        {/* <div className="p-2 w-full">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Student ID</label>
                                                <div className={`${inputFieldStyle} h-max`}>
                                                    {studentID || <p className='text-sm'>Student ID auto-generated after form submission.</p>}
                                                </div>
                                            </div>
                                            {studentID && <p className='text-sm'>{studentIdLoading ? <span>checking student ID <span className="loading loading-spinner loading-xs ml-2"></span></span> : studentIdErr ? <span className='text-red-500'>The Student is not available. Use another serial number</span> : <span className='text-green-500'>The Student Id is available</span>}</p>}
                                        </div> */}
                                        {/* course Info*/}
                                        <h2 className='sm:col-span-2 text-lg font-bold'>Course Info.</h2>
                                        {/* CourseName  */}
                                        <div className="p-2 w-full">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Course</label>
                                                <select value={selectedCourse} type="text" {...register('courseName', {
                                                    required: true, onChange: (e) => handleCourseChange(e)
                                                })} className={`${inputFieldStyle}`}>
                                                    <option value="">Select A course</option>
                                                    {
                                                        courses?.map(item => <option key={item?._id} value={item?.title}>{item?.title}</option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        {/* Batch Year*/}
                                        <div className="p-2 w-full">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Batch Name</label>
                                                <input value={selectedYear} type="text" {...register('batch', {
                                                    required: true, onChange: (e) => {
                                                        setSelectedYear(e.target.value);

                                                    }
                                                })} className={`${inputFieldStyle}`}/>
                                            </div>
                                        </div>
                                        {/* Course Duration*/}

                                        <div className="p-2 w-full">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Course Duration {durationLoading && <span className="loading loading-spinner loading-xs ml-2"></span>}</label>
                                                <input  type="text" {...register('courseDuration')} className={`${inputFieldStyle}`}/>
                                            </div>
                                        </div>



                                        <div className="p-2 w-full col-span-2">
                                            <button className="flex  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
                                        </div>
                                    </form>


                                    <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                                        <a className="text-indigo-500">info@UniverstIT.com</a>
                                        <p className="leading-normal my-5">House # 3/GA,
                                            <br />Shyamoli, Road # 1. Dhaka-1207.
                                        </p>
                                        <span className="inline-flex">
                                            <a className="text-gray-500">
                                                <Link to="https://x.com/"><BiLogoTwitter className="text-2xl" /></Link>
                                            </a>
                                            <a className="ml-4 text-gray-500">
                                                <Link to="https://www.youtube.com/"><TbBrandYoutubeFilled className="text-2xl" /></Link>
                                            </a>
                                            <a className="ml-4 text-gray-500">
                                                <Link to="https://www.facebook.com/"><FaFacebook className="text-xl" /></Link>
                                            </a>

                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default CreateCertificate;