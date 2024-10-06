import React, { useRef, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaFacebook, FaLinkedin, FaPhone, FaYoutube } from 'react-icons/fa';
import { IoLocation, IoMailOpenSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';


const ContactForm = () => {

    const formRef = useRef();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_ql0xjkf', 'template_ope8b6j', formRef.current, {
                publicKey: 'PbUISmrSE9uXrKvsb',
            })
            .then(
                () => {
                    setSuccess(true);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Email Sent Successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                },
                (error) => {
                    setError(true);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Email Sent Failed",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    console.log('FAILED...', error.text);
                },
            );
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="main-container bg-gray-300 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-11/12 lg:w-10/12 mx-auto py-10">
                {/* Left Section */}
                <div className="">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-secondary font-semibold">Get In Touch</h2>
                    <p className="text-sm md:text-base">
                        We’d love to hear from you! Whether you have a question, need assistance, or just want to say hello, we’re here to help.
                    </p>

                    <div className="mt-10 space-y-5">
                        {/* Address */}
                        <div className="flex gap-3 items-start">
                            <div className="bg-primary text-2xl flex p-4 rounded-full text-white items-center justify-center">
                                <IoLocation />
                            </div>
                            <div>
                                <p className="text-secondary font-bold text-lg md:text-xl lg:text-2xl">Address</p>
                                <p className="font-body text-gray-500 text-sm md:text-base">Aftabnagar, Merul Badda, Dhaka.</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex gap-3 items-start">
                            <div className="bg-primary text-2xl flex p-4 rounded-full text-white items-center justify-center">
                                <FaPhone />
                            </div>
                            <div>
                                <p className="text-secondary font-bold text-lg md:text-xl lg:text-2xl">Phone Number</p>
                                <p className="font-body text-gray-500 text-sm md:text-base">01886-061401</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex gap-3 items-start">
                            <div className="bg-primary text-2xl flex p-4 rounded-full text-white items-center justify-center">
                                <IoMailOpenSharp />
                            </div>
                            <div>
                                <p className="text-secondary font-bold text-lg md:text-xl lg:text-2xl">E-mail</p>
                                <p className="font-body text-gray-500 text-sm md:text-base">universeitinstitute@gmail.com</p>
                            </div>
                        </div>

                        <div className="divider"></div>
                    </div>

                    {/* Social Links */}
                    <h2 className="text-lg md:text-xl lg:text-2xl mb-4 text-secondary font-semibold">Follow Us:</h2>
                    <div className="flex gap-3">
                        <Link to={"https://www.facebook.com/UniverseITInstitute"}>
                            <div className="bg-primary flex p-4 rounded-full text-white items-center justify-center">
                                <FaFacebook className='text-2xl' />
                            </div>
                        </Link>
                        <Link to={"https://www.linkedin.com/company/universe-it-institute/"}>
                            <div className="bg-primary flex p-4 rounded-full text-white items-center justify-center">
                                <FaLinkedin className='text-2xl' />
                            </div>
                        </Link>
                        <Link to={"https://www.youtube.com/@universeitinstitute9947"}>
                            <div className="bg-primary flex p-4 rounded-full text-white items-center justify-center">
                                <FaYoutube className='text-2xl' />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Right Section - Contact Form */}
                <div className="flex justify-center lg:justify-end">
                    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
                        <h2 className="text-2xl md:text-3xl mb-4 text-secondary font-semibold">Send a Message</h2>
                        <form
                            ref={formRef}
                            onSubmit={sendEmail} className="space-y-4 py-5">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="E-mail address"
                                    
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div className="text-xs md:text-sm text-gray-500">
                                By submitting, you agree to the processing of your personal data by Sub as described in the Privacy Statement.
                            </div>
                            <button
                                type="submit"
                                className="p-4 px-8 bg-orange-500 text-white font-semibold rounded-[30px] hover:bg-orange-600 transition duration-300 w-full md:w-auto"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
