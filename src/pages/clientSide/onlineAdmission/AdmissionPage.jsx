

// import required modules
import { Helmet } from 'react-helmet-async';

import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import logo from '../../../assets/logo/mainLogo.png'
import ButtonStrong from '../../../Shared/Button/ButtonStrong';
import Loading from '../../../Shared/Loading/Loading';

const AdmissionPage = () => {
    const axiosPublic = useAxiosPublic();
    const { data: courses = [], refetch: coursesRefetch, isLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/course');
            return res.data;
        }
    })
    if (isLoading) {
        return <Loading/>
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const course = form.course.value;
        const gender = form.gender.value;
        const contact = form.contact.value;
        const address = form.address.value;
        const website = form.website.value;

        const theCourse = courses.find(item => item._id === course)
        const data = { name, email, course: theCourse?.title, courseId: theCourse?._id, gender, contact, address, website };
        console.log(data);
        
        axiosPublic.post('/admission', data)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    toast.success('Admission request added successfully')
                }
            })
            .catch()
        form.reset();


    }
    return (
        <>
            <Helmet>
                <title>Universe IT | Online Admission</title>
            </Helmet>



            <div>
            </div>

            <div className=' text-white px-10 '>
                <div className='flex justify-center items-center pt-1'>
                    <img src={logo} className='w-32
                    p-2' alt="" />
                </div>

                <div className='text-black'>
                    <h2 className='text-3xl font-bold text-center'>Online Admission Form</h2>
                </div>

                {/* form section  */}
                <div className=''>

                    <section className="text-gray-600 body-font relative">
                        <div className="container px-5  mx-auto">
                            <div className="flex flex-col text-center w-full ">
                                <p className="lg:w-full mx-auto  leading-relaxed text-[10px] lg:text-[12px] lg:text-sm pb-2">Unlock Your Creative Potential and Transform Your Fashion Dreams into Reality—Enroll Today!</p>
                            </div>
                            <div className="lg:w-full md:w-full mx-auto bg-white py-5 rounded-xl">

                                <div className="   rounded-2xl">
                                    <form action="" onSubmit={handleSubmit} className='   w-full -m-2'>
                                        <div className='w-1/2 mx-auto'>
                                            {/* name  */}
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-[12px] lg:text-sm text-gray-600">Name</label>
                                                    <input required type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                            </div>
                                            {/* email  */}
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-[12px] lg:text-sm text-gray-600">Email</label>
                                                    <input required type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                            </div>
                                            {/* course  */}
                                            <div className='p-2 w-full'>
                                                <label className="text-[12px] lg:text-sm">Select course</label>
                                                <select required name='course' className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] lg:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-2">

                                                    <option value="" defaultChecked>Select Course</option>
                                                    {
                                                        courses?.map(course => <option key={course?._id} value={course?._id} defaultChecked>{course.title}</option>)
                                                    }


                                                </select>
                                            </div>


                                            {/* contact number  */}
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-[12px] lg:text-sm text-gray-600">Contact No.</label>
                                                    <input required type="text" name="contact" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                            </div>
                                            {/* address  */}
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-[12px] lg:text-sm text-gray-600">Address</label>
                                                    <input required type="text" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                            </div>

                                            {/* Gender  */}
                                            <div className="p-2 w-full">
                                                <label className="leading-7 text-[12px] lg:text-sm text-gray-600">Gender</label>
                                                <div className="relative flex justify-start gap-5">
                                                    <br />
                                                    <input type="radio" name="gender" value={"male"} className="radio radio-secondary border-primary text-[10px] lg:text-sm" /> Male
                                                    <input type="radio" name="gender" value={"female"} className="radio radio-secondary border-primary text-[10px] lg:text-sm" /> Female
                                                </div>

                                            </div>
                                        </div>


                                        

                                        {/* website  */}
                                        <div className="p-2 sm:w-1/2 mx-auto">
                                            <div className="relative">
                                                <label className="leading-7 text-[12px] lg:text-sm text-gray-600">How you know About Our Website?</label>
                                                <textarea name="website" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                            </div>
                                        </div>
                                        <div className="p-2 flex justify-center items-center mx-auto">
                                            <ButtonStrong text={'Submit'} />
                                        </div>
                                    </form>



                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </>
    );
};

export default AdmissionPage;