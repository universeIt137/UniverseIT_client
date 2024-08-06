import { useState } from "react";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";
import seminarBanner from '../../../assets/banner/seminarBanner.jpg'
const FreeSeminar = () => {
    const [seeMore, setSeeMore] = useState(false)
    const seminarSchedule = [
        {
            id: 1,
            date: "Oct 13, 23",
            day: "Friday",
            time: "09:00 AM",
            title: "Web Design"
        },
        {
            id: 2,
            date: "Oct 13, 23",
            day: "Friday",
            time: "02:00 PM",
            title: "Graphic Design"
        },
        {
            id: 3,
            date: "Oct 13, 23",
            day: "Friday",
            time: "05:00 PM",
            title: "Digital Marketing"
        },
        {
            id: 4,
            date: "Oct 14, 23",
            day: "Saturday",
            time: "10:00 AM",
            title: "SEO Fundamentals"
        },
        {
            id: 5,
            date: "Oct 14, 23",
            day: "Saturday",
            time: "01:00 PM",
            title: "Content Writing"
        }
    ];
    return (
        <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto py-10 px-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="space-y-10 max-w-[600px]">
                    <div className="space-y-4">
                        <h2 className="text-3xl sm:text-5xl font-bold">Free Seminar Schedule</h2>
                        <p className="font-medium text-sm sm:text-base text-justify">Need guidelines to choose a suitable course? Unlock new insights and opportunities by joining our complimentary seminars.</p>
                    </div>
                    <div className="py-5 space-y-5">
                        <div className={`space-y-4 ${seeMore ? 'max-h-[2000px]' : 'max-h-[300px]'} overflow-hidden transition-all duration-500`}>
                            {
                                seminarSchedule?.map((seminar, idx) => <div className="w-full  bg-primary/35 rounded-xl flex overflow-hidden gap-3" key={idx}>
                                    <p className="flex flex-col min-w-max max-w-max justify-center items-center pl-5 pr-2 sm:pr-4">
                                        <span className="text-xl sm:text-2xl font-bold">{seminar.date.split(' ')[1].split(',')[0]}</span>
                                        <span className="text-sm lg:text-base font-bold text-primary">
                                            {seminar.date.split(' ')[0]},  {seminar.date.split(' ')[2]}
                                        </span>
                                    </p>
                                    <div className="w-full h-full bg-white py-5 rounded-xl flex justify-between items-center flex-wrap gap-3 pl-3 sm:pl-5 pr-5 sm:pr-10">
                                        <div>
                                            <h2 className="text-sm sm:text-base font-bold">{seminar?.title}</h2>
                                            <p className="text-xs sm:text-sm font-medium">{seminar?.day} | Time: {seminar?.time}</p>
                                        </div>
                                        <ButtonStrong text={'Register Now'} />
                                    </div>

                                </div>)
                            }
                        </div>
                        <div className="flex">
                            <div className="w-max" onClick={() => setSeeMore(!seeMore)}>
                                <ButtonStrong text={seeMore ? 'View Less' : 'View All'} /></div>
                        </div>
                    </div>

                </div>
                <div className="flex justify-end">
                    <img src={seminarBanner} className=' w-full max-w-[650px] mx-auto rounded-lg sm:rounded-3xl object-cover' alt="" />
                </div>
            </div>
        </div>
    );
};

export default FreeSeminar;