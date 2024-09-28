import React from 'react';
import { Helmet } from 'react-helmet-async';
import { uploadImg } from '../../../../UploadFile/uploadImg';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Shared/Loading/Loading';
import Swal from 'sweetalert2';

const UpdateCareerPage = () => {

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: careerData = {}, refetch, isLoading } = useQuery({
        queryKey: ['careerData', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/career/${id}`)
            return res?.data
        }
    })

    if (isLoading) {
        return <Loading />
    }

    const { education, skills, experience, position, salary, responsibilities, workplace, employment_status, job_location,   careerImageUrl : incommingCareerImageUrl } = careerData;
    console.log(incommingCareerImageUrl);

    
    const handleSubmit = async (event) => {

        event.preventDefault();
        const form = event.target;
        

        const education = form.education.value;
        const skills = form.skills.value;
        const experience = form.experience.value;
        const position = form.position.value;
        const salary = form.salary.value;
        const responsibilities = form.responsibilities.value;
        const workplace = form.workplace.value;
        const employment_status = form.employment_status.value;
        const job_location = form.job_location.value;
        const careerImage = form.careerImg.files[0];


        let careerImageUrl = incommingCareerImageUrl;
        if (!careerImage?.name) {
            careerImageUrl = incommingCareerImageUrl;
        } else {
            careerImageUrl = await uploadImg(careerImage);
        }

        const data = { education, skills, experience, position, salary, responsibilities, workplace, employment_status, job_location, careerImageUrl };
        console.log(data);

        axiosPublic.put(`/career/${id}`, data)
            .then(res => {
                console.log(res.data)

                if (res.data.modifiedCount) {
                    console.log('career data updated')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Career data has been Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()

                }
            })
            .catch((err) => {
                console.log(err.message)
            })
        form.reset();
    }

    return (
        <>
        <Helmet>
            <title>Dashboard | Update Career</title>
        </Helmet>
        <div className='m-4 '>



            <p className='text-4xl'>Update Career Post</p>
            <form onSubmit={handleSubmit} className="">
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Education</span>
                        </label>
                        <input type="text" defaultValue={education} name='education' placeholder="Required Education" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Skills</span>
                        </label>
                        <input type="text" defaultValue={skills} name="skills" placeholder="Enter Skills" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Experience</span>
                        </label>
                        <input type="text" defaultValue={experience} name='experience' placeholder="Enter Job Experience" className="input input-bordered" required />

                    </div>

                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">Job Position</span>
                        </label>
                        <input type="text" defaultValue={position} name='position' placeholder="Enter Job Position" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Salary</span>
                        </label>
                        <input type="text" defaultValue={salary} name='salary' placeholder="Enter Job Salary" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Job Responsibilities</span>
                        </label>
                        <textarea type="text" defaultValue={responsibilities} placeholder="Enter Job Responsibilities" name='responsibilities' className="input input-bordered" required />
                    </div>


                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">WorkPlace</span>
                    </label>
                    <input type="text" defaultValue={workplace} name='workplace' placeholder="eg: ... in Offfice, Remote, Intern" className="input input-bordered" required />

                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Employment Status</span>
                    </label>
                    <input type="text" defaultValue={employment_status} name='employment_status' placeholder="eg: ..part-time, full-time" className="input input-bordered" required />

                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Location</span>
                    </label>
                    <input type="text" defaultValue={job_location} name='job_location' placeholder="Enter Job Location" className="input input-bordered" required />

                </div>

                </div>


                <div className=" items-center gap-3 mt-5">
                    <p>Already uploaded image</p>
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={incommingCareerImageUrl || "https://static-cse.canva.com/blob/567558/50stunninglybeautifulgeometricpatternsingraphicdesign.jpg"} />
                        </div>
                    </div>

                </div>

                

                {/* image upload */}
                <div className="p-2 w-full">
                    <div className="relative">
                        <label className="leading-7 text-sm text-gray-600 font-bold">Career Image</label><br />
                        <input type="file" name='careerImg' className="file-input file-input-bordered file-input-md w-full max-w-xs" />
                    </div>
                </div>



                <div className="form-control mt-6 lg:w-52">
                    <button className="btn bg-primary text-white">Updated Career</button>
                </div>
            </form>
        </div>
    </>
    );
};

export default UpdateCareerPage;