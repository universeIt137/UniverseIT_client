import React from 'react';
import Swal from 'sweetalert2';
import { uploadImg } from '../../../../UploadFile/uploadImg';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async';

const AddCareerPage = () => {

    const axiosPublic = useAxiosPublic();
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


        let careerImageUrl = '';
        if (!careerImage?.name) {
            careerImageUrl = ''
        } else {
            careerImageUrl = await uploadImg(careerImage);
        }

        const data = { education, skills, experience, position, salary, responsibilities, workplace, employment_status, job_location, careerImageUrl };
        console.log(data);

        axiosPublic.post('/career', data)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    console.log('data added')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "New Career Added",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })
            .catch()
        form.reset();
    }


    return (
        <>
            <Helmet>
                <title>Dashboard | Add Career</title>
            </Helmet>
            <div className='m-4 '>



                <p className='text-4xl'>Add New Career Post</p>
                <form onSubmit={handleSubmit} className="">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Education</span>
                            </label>
                            <input type="text" name='education' placeholder="Required Education" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Skills</span>
                            </label>
                            <input type="text" name="skills" placeholder="Enter Skills" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Experience</span>
                            </label>
                            <input type="text" name='experience' placeholder="Enter Job Experience" className="input input-bordered" required />

                        </div>

                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">Job Position</span>
                            </label>
                            <input type="text" name='position' placeholder="Enter Job Position" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Salary</span>
                            </label>
                            <input type="text" name='salary' placeholder="Enter Job Salary" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Job Responsibilities</span>
                            </label>
                            <textarea type="text" placeholder="Enter Job Responsibilities" name='responsibilities' className="input input-bordered" required />
                        </div>


                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">WorkPlace</span>
                        </label>
                        <input type="text" name='workplace' placeholder="eg: ... in Offfice, Remote, Intern" className="input input-bordered" required />

                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Employment Status</span>
                        </label>
                        <input type="text" name='employment_status' placeholder="eg: ..part-time, full-time" className="input input-bordered" required />

                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Job Location</span>
                        </label>
                        <input type="text" name='job_location' placeholder="Enter Job Location" className="input input-bordered" required />

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
                        <button className="btn bg-primary text-white">Add Career</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCareerPage;