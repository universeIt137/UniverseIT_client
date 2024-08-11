/* eslint-disable react/prop-types */

const FacultyCard = ({ faculty, slide }) => {
    return (

        

        <div className={`card max-w-[160px] sm:max-w-[320px] sm:w-[320px] border border-gray-500 bg-base-100 shadow-xl ${slide ? 'w-[60vw]' : 'w-[45%] md:w-[30%] lg:w-[20%]'}`}>
            <figure className="px-2 sm:px-10 pt-2 sm:pt-10 h-40 sm:h-60 w-full overflow-hidden">
                <img
                    src={faculty.image}
                    alt="Faculty"
                    className="rounded-xl w-full h-full object-cover"
                />
            </figure>
            <div className="card-body text-center flex flex-col justify-between p-2 sm:p-4">
                <div className="flex justify-center items-center flex-col">
                    <h2 className="card-title font-semibold text-sm sm:text-lg">
                        {slide ? (faculty?.name || 'Not Given') : (faculty?.name || 'Not Given')}
                    </h2>
                    <p className="font-semibold text-sm sm:text-lg">
                        {slide ? (faculty?.background_of_study?.slice(0, 20) || 'Not Given') : (faculty?.background_of_study || 'Not Given')}
                    </p>
                </div>
                <p className="font-semibold flex items-end justify-center text-xs sm:text-base">
                    Experience: {faculty?.job_experience ? `${faculty?.job_experience}+` : 'Not given'}
                </p>
            </div>
        </div>

        







    );
};

export default FacultyCard;