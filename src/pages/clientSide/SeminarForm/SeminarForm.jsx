import useAxiosPublic from '../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { useLoaderData, useParams } from 'react-router-dom';
import logo from '../../../assets/logo/mainLogo.png'
import { useQuery } from '@tanstack/react-query';
import ButtonLight from '../../../Shared/Button/ButtonLight';
import ButtonStrong from '../../../Shared/Button/ButtonStrong';
import Loading from '../../../Shared/Loading/Loading';
const SeminarForm = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic();
    const { data: seminar = {}, refetch, isLoading } = useQuery({
        queryKey: ['seminars', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/seminar/${id}`);
            return res.data;
        }
    })
    if (isLoading) {
        return <Loading />
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const course = form.course.value;

        const whatsapp = form.whatsapp.value;
        const segment = form.segment.value;



        const data = { name, email, course, whatsapp, segment };
        console.log(data)


        axiosPublic.post('/seminarRequest', data)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    toast.success('Seminar request added successfully')
                }
            })
            .catch()
        form.reset();
    }
    return (
        <div>
            <Helmet>
                <title>Universe IT | Seminar Registration</title>
            </Helmet>

            <div className=' text-white px-10'>
                <div className='flex justify-center items-center pt-2'>
                    <img src={logo} className='w-32
                    p-2' alt="" />
                </div>

                <div className=' text-black'>
                    <h2 className='text-3xl font-bold text-center'>Free Seminar</h2>
                </div>

                {/* form section  */}
                <div className=''>

                    <section className="text-gray-600 body-font relative">
                        <div className="container px-5  mx-auto">
                            <div className="flex flex-col text-center w-full ">
                                <p className="lg:w-2/3 mx-auto  leading-relaxed text-sm pb-2">Fill up the form to attend our free seminar</p>
                            </div>
                            <div className="w-8/12 mx-auto bg-white lg:px-10 py-5 rounded-xl">

                                <div className=" rounded-2xl w-full">
                                    <form action="" onSubmit={handleSubmit} className='flex flex-wrap -m-2 w-full'>
                                        <div className='w-2/3 mx-auto mt-5'>
                                            {/* name  */}
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-[12px] lg:text-sm text-gray-600">Name</label>
                                                    <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                            </div>
                                            {/* email  */}
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-[12px] lg:text-sm text-gray-600">Email</label>
                                                    <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                            </div>

                                            {/* mobile  */}
                                            <div className="p-2 w-full  ">
                                                <div className="relative">
                                                    <label className="leading-7 text-[12px] lg:text-sm text-gray-600">Whatsapp/Mobile Number</label>
                                                    <input type="text" id="" name="whatsapp" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                            </div>
                                            {/* course  */}
                                            <div className="p-2 w-full  ">
                                                <div className="relative">
                                                    <label className="leading-7 text-[12px] lg:text-sm text-gray-600">Course</label>
                                                    <input type="text" id="" name="course" value={seminar?.topic} readOnly className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-[12px] lg:text-sm outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                            </div>





                                            {/* segment  */}
                                            <div className='p-2 w-full  '>
                                                <label className="text-[12px] lg:text-sm">Select Segment Type</label>
                                                <select name='segment' className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] lg:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-2">

                                                    <option value="" selected>Select Segment</option>
                                                    <option value={"Online Segment"}>Online Segment</option>
                                                    <option value={"Offline Segment"}>Offline Segment</option>


                                                </select>
                                            </div>
                                        </div>









                                        <div className="p-2 relative w-full flex justify-center items-center mx-auto">
                                            <ButtonStrong text={'Submit'} />
                                        </div>


                                    </form>


                                    <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                                        <a className="text-indigo-500">info@universeIt.com</a>
                                        <p className="leading-normal my-5">House # 3/GA,
                                            <br />Shyamoli, Road # 1. Dhaka-1207.
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </div>
    );
};

export default SeminarForm;