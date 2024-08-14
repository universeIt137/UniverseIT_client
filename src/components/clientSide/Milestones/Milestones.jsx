import banner from '../../../assets/banner/milestoneBanner.jpg'
import CountUp from "react-countup";
import ComponentsTitle from '../../../Shared/ComponentsTitle/ComponentsTitle';
const Milestones = () => {
    const countStyle = 'w-[210px] sm:w-[240px] lg:w-[20vw] xl:w-[260px] h-[145px] lg:h-[11vw] xl:h-[155px] rounded-lg text-4xl flex justify-center px-5 sm:px-10 font-bold flex-col'
    return (
        <div className="max-w-7xl mx-auto py-10 px-5">
            <ComponentsTitle title={'Milestones'} description={'Explore our significant achievements, success stories, and impressive statistics all in one place'} />
            <div className='grid grid-cols-1 lg:grid-cols-2 pt-10 gap-10'>
                <img className='order-2 lg:order-1 w-full max-w-[650px] mx-auto' src={banner} alt="" />
                <div className='flex flex-wrap sm:grid sm:grid-cols-2 sm:w-max sm:h-max gap-10 mx-auto justify-center items-center'>
                    <div className={`${countStyle} bg-text_color`}>
                        <span className='text-white'> <CountUp end={500} duration={9} /> +</span>
                        <p className='text-white font-medium sm:text-lg'>Enrolled Students</p>
                    </div>
                    <div className={`${countStyle} bg-[#FFEBEE]`}>
                        <span><CountUp end={30} duration={9} /> +</span>
                        <p className='text-base font-medium sm:text-lg'>Instructors</p>
                    </div>
                    <div className={`${countStyle} bg-[#E1BEE7]`}>
                        <span><CountUp end={350} duration={9} /> +</span>
                        <p className='text-base font-medium sm:text-lg'>Industry Experts</p>
                    </div>
                    <div className={`${countStyle} bg-text_color`}>
                        <span className='text-white'><CountUp end={90} duration={9} />%</span>
                        <p className='text-white font-medium sm:text-lg'>Successful ratio</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Milestones;