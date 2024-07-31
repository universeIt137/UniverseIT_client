import rewardIcon from '../../assets/ServicesImg/reward.png'
import classIcon from '../../assets/ServicesImg/class.png'
import affordablepriceIcon from '../../assets/ServicesImg/affordableprice.png'
import educationIcon from '../../assets/ServicesImg/education.png'
import realtimeProjectIcons from '../../assets/ServicesImg/realtimeProject.png'
const Services = () => {
    const services = [
        {
            text: 'Industry Expert Mentor',
            icon: rewardIcon
        },
        {
            text: 'Industry Expert Mentor',
            icon: rewardIcon
        },
        {
            text: 'Industry Expert Mentor',
            icon: rewardIcon
        },
        {
            text: 'Industry Expert Mentor',
            icon: rewardIcon
        },
        {
            text: 'Industry Expert Mentor',
            icon: rewardIcon
        },
    ]
    return (
        <div className="bg-[#fefaee] py-10 px-10">
            <div className="space-y-4">
                <h2 className="text-3xl sm:text-5xl font-bold">Benefits You will get from us</h2>
                <p className="font-medium">Join us to access a world of knowledge and skills to boost your Career.</p>
                <div className='space-y-5'>
                    {
                        services?.map((service,idx)=> <div key={idx} className="w-full max-w-[350px] h-11 border rounded-md flex gap-3 items-center px-5">
                        <img className='size-7 object-cover' src={service?.icon} alt="" />
                        <p className='text-base sm:text-lg font-medium'>{service?.text}</p>
                    </div>)
                    }
                </div>
                
            </div>
        </div>
    );
};

export default Services;