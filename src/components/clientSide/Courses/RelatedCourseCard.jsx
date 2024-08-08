import React from 'react';

const RelatedCourseCard = () => {
    return (
        <>
            <div className="bg-white shadow-xl rounded-xl flex">
                <div className='border border-black w-1/4'>
                    <img
                        className=''
                        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                        alt="Movie" />
                </div>

                <div className="border border-black w-3/4">
                    <h2 className="">New movie is released!</h2>
                    <p>Click the button to watch on Jetflix app.</p>
                    <div className="">
                        <button className="btn btn-primary">Watch</button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default RelatedCourseCard;