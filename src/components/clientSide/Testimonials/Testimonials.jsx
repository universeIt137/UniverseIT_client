import Rating from "react-rating";
import ComponentsTitle from "../../../Shared/ComponentsTitle/ComponentsTitle";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const Testimonials = () => {
    const axiosPublic = useAxiosPublic();
    const { data: testimonials = [], refetch, isLoading } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const res = await axiosPublic.get('/testimonial');
            return res.data;
        }
    });

    return (
        <div className="bg-gray-100 py-10 px-5">
            <div className="max-w-7xl mx-auto space-y-5">
                <ComponentsTitle title={'Students Review'} description={'See What our students say about us.'} />
                <div className="space-y-5">

                    <div className="">
                        <div className="relative pt-14">
                            <div className="absolute w-full flex  gap-7 h-full top-0 justify-end">
                                <div className="courses-prev-btn text-xl p-3 rounded-full  cursor-pointer bg-primary/40 shadow-2xl hover:bg-primary/50 transition-all duration-100 active:scale-90  h-max"><GrFormPrevious /></div>
                                <div className="courses-next-btn text-xl p-3 rounded-full  cursor-pointer bg-primary/40 shadow-2xl hover:bg-primary/50 transition-all duration-100 active:scale-90 h-max"><GrFormNext /></div>
                            </div>
                            <div>
                                <Swiper
                                    navigation={{
                                        nextEl: '.courses-next-btn',
                                        prevEl: '.courses-prev-btn',
                                    }}
                                    modules={[Navigation]}
                                    spaceBetween={30}
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 1,
                                        },
                                        690: {
                                            slidesPerView: 2,
                                        },

                                    }}

                                    speed={300}
                                    className=""
                                >
                                    {
                                        testimonials.map((feedback, idx) => <SwiperSlide key={idx}>
                                            <div className="w-full p-10 bg-white space-y-5 mx-auto min-h-[300px]" key={idx}>
                                                <div className="text-base sm:text-xl text-primary">
                                                    <Rating
                                                        className="space-x-1"
                                                        emptySymbol={<FaRegStar />}
                                                        fullSymbol={<FaStar />}
                                                        initialRating={feedback?.rating || ''}
                                                        readonly
                                                    />

                                                </div>
                                                <p className="font-medium">{feedback.opinion || ''}</p>
                                                <div className="flex gap-2 sm:gap-4">
                                                    <img className="size-11 sm:size-12 rounded-full object-cover" src={feedback?.image || ''} alt="" />
                                                    <div className="text-sm font-medium">
                                                        <p className="font-bold">{feedback?.name || ''}</p>
                                                        <p className="text-gray-500 font-normal">{feedback?.designation || ''}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>)
                                    }

                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Testimonials;