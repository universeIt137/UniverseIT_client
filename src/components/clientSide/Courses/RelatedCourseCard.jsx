import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Rating from 'react-rating';

const RelatedCourseCard = ({imageLink}) => {
    return (
        <>
            <div className="bg-white shadow-xl rounded-xl flex gap-2 justify-center items-center p-2">
                <div className='w-2/4'>
                    <img
                        className='h-auto w-full '
                        src={imageLink}
                        alt="Movie" />
                </div>

                <div className="w-2/4">
                    <p className='font-bold text-[10px]'>Typography Masterclass</p>
                    <p className='font-bold text-[10px]'>প্রশিক্ষকঃ Dinar Minhaj</p>
                    <p className='text-primary'>
                        <Rating
                            className="space-x-1"
                            emptySymbol={<FaRegStar />}
                            fullSymbol={<FaStar />}
                            initialRating={4}
                            readonly
                        />
                    </p>
                    <div className='flex gap-2 justify-center items-center'>
                        <p className='text-[10px] font-bold'>৩০০০ টাকা</p>
                        <button className='text-[10px] bg-primary text-white p-2 rounded-lg'>কোর্সটি কিনুন</button>
                    </div>

                </div>

            </div>
        </>
    );
};

export default RelatedCourseCard;