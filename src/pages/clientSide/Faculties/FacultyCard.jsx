/* eslint-disable react/prop-types */
import log from '../../../assets/logo/shortLogo.png'
import log21 from '../../../assets/logo/mainLogo.png'
const FacultyCard = ({ faculty, slide }) => {
    const { image, name, background_of_study, job_experience, designation, contact, email
    } = faculty;
    console.log(faculty);

    return (



        <div className="bg-primary/30 p-2.5 w-[290px] rounded-lg">
            <div className="bg-[#dad1c1]">
                <div className='flex gap-1 justify-end p-5 pb-3 items-center'>
                    <img className='h-6 object-cover' src={log21} alt="" />
                    {/* <h2 className='font-bold text-xs'>Universe IT <br /> Institute</h2> */}


                </div>
                <div className=' h-[120px] relative  flex flex-col justify-center items-center gap-5'>
                    <div className='w-full h-3.5 bg-gray-800'></div>
                    <div className='w-full h-3.5 bg-gray-800'></div>
                    <div className='w-full h-full absolute top-0 flex justify-center items-center '>
                        <img className='size-24 rounded-full object-cover border-4 border-gray-800' src={image} alt="" />
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='text-base font-bold capitalize'>{name}</h2>
                    <h2 className='text-sm'>{designation}</h2>
                    <h2 className='text-sm pt-1'>{contact}</h2>
                    <h2 className='text-sm break-words'>{email}</h2>
                </div>

                <div className='pb-7'>
                    <div className='bg-gray-800 w-[50%] text-white mt-5 ml-auto py-1 text-sm pl-5'>
                        <p>Experience:</p>
                        <p>{job_experience} Years +</p>
                    </div>
                </div>
            </div>
        </div>









    );
};

export default FacultyCard;