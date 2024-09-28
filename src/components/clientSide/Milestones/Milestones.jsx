import CountUp from "react-countup";
import ComponentsTitle from '../../../Shared/ComponentsTitle/ComponentsTitle';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from "../../../Shared/Loading/Loading";
const Milestones = () => {
    const axiosPublic = useAxiosPublic()
    const { data: homepageContent = [], isLoading } = useQuery({
        queryKey: ['homepageContent'],
        queryFn: async () => {
            const res = await axiosPublic.get('/homepageContent')
            return res?.data
        }
    })
    if (isLoading) {
        return <Loading/>
    }
    const data = homepageContent[0] || [];
    const { enrolled, instructors, expert, successRatio, milestoneImage } = data;
    console.log(milestoneImage);

    const countStyle = ' h-[145px] lg:h-[11vw] xl:h-[155px] rounded-lg text-4xl flex justify-center px-5 sm:px-10 font-bold flex-col'
    return (
        <div className="max-w-7xl mx-auto py-10 px-5 ">
            <ComponentsTitle title={'Milestones'} description={'Explore our significant achievements, success stories, and impressive statistics all in one place'} />
            <div className='grid grid-cols-1 lg:grid-cols-2 pt-10 gap-10 '>
                <img className='order-2 lg:order-1 w-full max-w-[650px] mx-auto' src={milestoneImage} alt="" />
                <div className=' grid grid-cols-2 sm:w-max sm:h-max gap-3 lg:gap-10 mx-auto justify-center items-center '>
                    <div className={`${countStyle} bg-[#E0F7FA]`}>
                        <span className="text-xl lg:text-3xl"> <CountUp end={enrolled || 0} duration={9} /> +</span>
                        <p className='text-text_color font-medium text-lg'>Enrolled Students</p>
                    </div>

                    <div className={`${countStyle} bg-[#FFEBEE]`}>
                        <span className="text-xl lg:text-3xl"><CountUp end={instructors || 0} duration={9} /> +</span>
                        <p className='text-text_color font-medium text-lg'>Instructors</p>
                    </div>
                    <div className={`${countStyle} bg-[#E1BEE7]`}>
                        <span className="text-xl lg:text-3xl"><CountUp end={expert || 0} duration={9} /> +</span>
                        <p className='text-text_color font-medium text-lg'>Industry Experts</p>
                    </div>
                    <div className={`${countStyle} bg-[#f3edaf]`}>
                        <span className="text-xl lg:text-3xl"><CountUp end={successRatio || 0} duration={9} />%</span>
                        <p className='text-text_color font-medium text-lg'>Successful ratio</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Milestones;