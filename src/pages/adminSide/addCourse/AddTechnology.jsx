/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { uploadImg } from '../../../UploadFile/uploadImg';

const AddTechnology = ({ allTechnology, setAllTechnology }) => {
    const [technologyName, setTechnologyName] = useState('');
    const [technologyImg, setTechnologyImg] = useState('');
    const [err, setErr] = useState('')
    const handleStoreTechnology = async () => {
        setErr('');
        if (!technologyName || !technologyImg) {
            return setErr('Please, give a name and select an image')
        }
        const image = await uploadImg(technologyImg)
        setAllTechnology([...allTechnology, { name: technologyName, image }])
        setTechnologyName('')
        document.getElementById('technologyImageInputField').value = ''
    }
    const handleDeleteImage = (item) => {
        const newTechnology = allTechnology?.filter(i => i?.image !== item?.image);
        setAllTechnology(newTechnology)
    }
    return (
        <div className='w-full md:col-span-2'>
            <label className="leading-7 text-sm text-gray-600 font-bold">Add Technology</label>
            <div className='w-full'>
                <div className="p-2 w-full">
                    <div className="relative space-y-2">
                       <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                            <div>
                                <label className="leading-7 text-sm text-gray-600 font-medium">Technology Name</label><br />
                                <input onChange={(e) => setTechnologyName(e.target.value)} value={technologyName} className="file-input file-input-bordered file-input-md w-full" type="text" />
                            </div>
                            <div>
                                <label className="leading-7 text-sm text-gray-600 font-medium">Technology Image</label><br />
                                <input id='technologyImageInputField' onChange={(e) => setTechnologyImg(e.target.files[0])} type="file" name='image1' className="file-input file-input-bordered file-input-md w-full" />
                            </div>
                       </div>
                        <p className='text-red-500 text-sm'>{err}</p>
                        {/* <p className='text-red-600'>{imageInputErr}</p> */}
                        <p onClick={handleStoreTechnology} className='btn flex flex-col justify-center items-center px-7 py-1 rounded-md bg-primary text-white hover:font-bold transition-all duration-300 hover:bg-orange-700  active:bg-primary focus:outline-none focus:ring focus:ring-red-300 active:scale-90 focus:text-white w-max'>Add</p>
                        <p>Added Technology</p>
                        {allTechnology?.length < 1 && <p>No Technology Added!!</p>}

                        <div className="flex flex-wrap gap-4 pb-5">
                            {allTechnology.map((item, index) => (
                                <div key={index} className="flex lg:justify-center  gap-2 ">
                                    <div className="avatar">
                                        <div className="w-12 rounded-full ">
                                            <img src={item?.image} />
                                        </div>
                                    </div>
                                    <p className='font-bold  mb-2 text-center'>{item?.name}</p>
                                    <p onClick={() => handleDeleteImage(item)} className='text-center bg-gray-200 w-6  h-6 rounded-md ml-auto mb-2 cursor-pointer'>X</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AddTechnology;