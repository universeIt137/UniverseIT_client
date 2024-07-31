import banner from '../../../assets/banner/milestoneBanner.jpg'
import CountUp from "react-countup";
const Milestones = () => {
    const countStyle = 'w-[210px] sm:w-[240px] lg:w-[20vw] xl:w-[260px] h-[145px] lg:h-[11vw] xl:h-[155px] rounded-lg text-4xl flex justify-center px-5 sm:px-10 font-bold flex-col'
    return (
        <div className="max-w-7xl mx-auto py-10 px-5">
            <h1 className="text-5xl font-bold text-center">Milestones</h1>
            <p className="font-medium text-center pt-5">Explore our significant achievements, success stories, and impressive statistics all in one place</p>

            <div className='grid grid-cols-1 lg:grid-cols-2 pt-10 gap-10'>
                <img src={banner} alt="" />
                <div className='grid grid-cols-1 sm:grid-cols-2 w-max h-max gap-10 mx-auto'>
                    <div className={`${countStyle} bg-[#E0F7FA]`}>
                       <span> <CountUp end={500} duration={9} /> +</span>
                        <p className='text-base font-medium sm:text-lg'>Enrolled Students</p>
                    </div>
                    <div className={`${countStyle} bg-[#FFEBEE]`}>
                        <span><CountUp end={30} duration={9} /> +</span>
                        <p className='text-base font-medium sm:text-lg'>Instructors</p>
                    </div>
                    <div className={`${countStyle} bg-[#E1BEE7]`}>
                        <span><CountUp end={350} duration={9} /> +</span>
                        <p className='text-base font-medium sm:text-lg'>Industry Experts</p>
                    </div>
                    <div className={`${countStyle} bg-[#f3edaf]`}>
                        <span><CountUp end={90} duration={9} />%</span>
                        <p className='text-base font-medium sm:text-lg'>Successful ratio</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Milestones;