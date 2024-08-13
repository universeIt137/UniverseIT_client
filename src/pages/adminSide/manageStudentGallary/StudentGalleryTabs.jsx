/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation } from 'swiper/modules';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
const StudentGalleryTabs = ({ tabName, setTabName, studentCategory }) => {
    console.log(studentCategory);

    const categories = ['Semester Details', 'Career Objective']
    const tabStyle = (incomingTabName) => {
        return `text-sm sm:text-base bg-primary/95 font-medium  rounded-t-lg active:scale-90 transition-all duration-300 hover:bg-primary ${incomingTabName === tabName ? 'bg-primary text-white' : 'bg-white hover:bg-primary/30'} w-full h-[50px] px-2`
    }

    return (
        <div className={` max-w-[800px] mx-auto relative px-12 `}>
            <Swiper
                spaceBetween={10}

                breakpoints={{
                    0: { // when window width is >= 0px
                        slidesPerView: 1,
                    },
                    380: { // when window width is >= 550px
                        slidesPerView: 2,
                    },
                    620: { // when window width is >= 790px
                        slidesPerView: 3,
                    },
                    780: { // when window width is >= 1024px
                        slidesPerView: 4,
                    },
                    // 1270: { // when window width is >= 1024px
                    //     slidesPerView: 5,
                    // },
                }}
                freeMode={true}
                // navigation={true}
                navigation={{
                    nextEl: '.tabs-next-btn',
                    prevEl: '.tabs-prev-btn',
                }}
                modules={[FreeMode, Pagination, Navigation]}
                className=" bg-white rounded-t-lg"
            >
                <SwiperSlide >
                        <button
                            className={`${tabStyle('All')}`}
                            onClick={() => setTabName('All')}
                        >{'All'}</button>
                    </SwiperSlide>
                {
                    studentCategory?.map((category) => <SwiperSlide key={category?._id}>
                        <button
                            className={`${tabStyle(category?.category_name)}`}
                            onClick={() => setTabName(category?.category_name)}
                        >{category?.category_name}
                        </button>
                    </SwiperSlide>)
                }
                
            </Swiper>

            <div className="block tabs-prev-btn text-xl p-2 sm:p-3 rounded-full  cursor-pointer  shadow-2xl  transition-all duration-100 active:scale-90  w-max absolute left-0 top-0.5 z-10"><GrFormPrevious /></div>
            <div className="block tabs-next-btn text-xl p-2 sm:p-3 rounded-full  cursor-pointer  shadow-2xl  transition-all duration-100 active:scale-90 w-max absolute right-0 top-0.5 z-10"><GrFormNext /></div>
        </div>
    );
};

export default StudentGalleryTabs;