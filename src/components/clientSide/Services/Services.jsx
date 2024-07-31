import rewardIcon from '../../../assets/ServicesImg/reward.png'
import classIcon from '../../../assets/ServicesImg/class.png'
import affordablepriceIcon from '../../../assets/ServicesImg/affordableprice.png'
import educationIcon from '../../../assets/ServicesImg/education.png'
import realtimeProjectIcons from '../../../assets/ServicesImg/realtimeProject.png'
import { useState } from 'react'
import serviceImage from '../../../assets/coursesImg/digital marketing.jpg'
const Services = () => {
    const [servicesActive, setServicesActive] = useState('Industry Expert Mentor')
    const services = [
        {
            text: 'Industry Expert Mentor',
            icon: rewardIcon
        },
        {
            text: 'Quality Learning',
            icon: educationIcon
        },
        {
            text: 'Recorded Classes',
            icon: classIcon
        },
        {
            text: 'Affordable Prices',
            icon: affordablepriceIcon
        },
        {
            text: 'Real project assignment',
            icon: realtimeProjectIcons
        },
    ]
    return (
        <div className="bg-[#fefaee] ">
            <div className="space-y-4  max-w-7xl mx-auto py-10 px-10">
                <h2 className="text-3xl sm:text-5xl font-bold">Benefits You will get from us</h2>
                <p className="font-medium">Join us to access a world of knowledge and skills to boost your Career.</p>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
                    <div className='space-y-5'>
                        {
                            services?.map((service, idx) => <div onClick={() => setServicesActive(service?.text)} key={idx} className={`w-full max-w-[400px] h-14 border rounded-md flex gap-3 items-center px-5 ${servicesActive === service.text ? 'bg-primary text-white' : 'bg-white'} transition-all duration-300 cursor-pointer active:scale-90`}>
                                <img className='size-7 object-cover' src={service?.icon} alt="" />
                                <p className='text-base sm:text-lg font-medium'>{service?.text}</p>
                            </div>)
                        }
                    </div>
                    <div className='lg:col-span-2'>
                        <img src={serviceImage} className=' w-full max-w-[650px] mx-auto' alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;