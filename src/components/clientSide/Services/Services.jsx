import rewardIcon from '../../../assets/ServicesImg/reward.png'
import classIcon from '../../../assets/ServicesImg/class.png'
import affordablepriceIcon from '../../../assets/ServicesImg/affordableprice.png'
import educationIcon from '../../../assets/ServicesImg/education.png'
import realtimeProjectIcons from '../../../assets/ServicesImg/realtimeProject.png'
import { useEffect, useState } from 'react'
import serviceImage from '../../../assets/banner/servicesBanner.jpg'
import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from '../../../hooks/useAxiosPublic'
const Services = () => {
    const [servicesActive, setServicesActive] = useState('Industry Expert Mentor')
    const [allBenefits, setAllBenefits] = useState([])
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


    const axiosPublic = useAxiosPublic()
    const { data: homepageContent = [], isLoading } = useQuery({
        queryKey: ['homepageContent'],
        queryFn: async () => {
            const res = await axiosPublic.get('/homepageContent')
            return res?.data
        }
    })
    useEffect(() => {
        if (homepageContent[0]?.benefits) {
            setAllBenefits(homepageContent[0]?.benefits)
            setServicesActive(homepageContent[0]?.benefits[0])
        }
    }, [homepageContent, isLoading]);
    if (isLoading) {
        return ''
    }
    const data = homepageContent[0] || {};
    return (
        <div className="bg-[#fefaee] ">
            <div className="space-y-4  max-w-7xl mx-auto py-10 px-10">
                <h2 className="text-3xl sm:text-5xl font-bold text-text_color">Benefits You will get from us</h2>
                <p className="font-medium text-text_color">Join us to access a world of knowledge and skills to boost your Career.</p>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
                    <div className='space-y-5'>
                        {
                            allBenefits?.map((item, idx) => <div onClick={() => setServicesActive(item)} key={idx} className={`w-full max-w-[400px] h-14 border rounded-md flex gap-3 items-center px-5 ${servicesActive === item ? 'bg-text_color text-white' : 'bg-white'} transition-all duration-300 cursor-pointer active:scale-90`}>

                                <p className='text-base sm:text-lg font-medium'>{item}</p>
                            </div>)
                        }
                    </div>
                    <div className='lg:col-span-2'>
                        <img src={data?.servicesImage} className=' w-full max-w-[650px] mx-auto' alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;