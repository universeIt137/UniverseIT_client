/* eslint-disable react/prop-types */
import { useState } from "react";

const AddBenefits = ({ allBenefits, setAllBenefits }) => {
    const [writtenBenefit, setWrittenBenefit] = useState('')
    const [writtenBenefitErr, setWrittenBenefitErr] = useState(false)
    const handleStoreBenefit = () => {
        setWrittenBenefitErr(false)
        if (!writtenBenefit) {
            return setWrittenBenefitErr(true)
        }
        setAllBenefits([...allBenefits, writtenBenefit])
        setWrittenBenefit('')
    }

    const handleDeleteBenefit = (item) => {
        const newBenefits = allBenefits?.filter(i => i !== item);
        setAllBenefits(newBenefits)
    }
    return (
        <div className=" w-full">
            <div className="relative">
                <label className="leading-7 text-sm text-gray-600 font-bold">Add benefits</label><br />
                <fieldset className="form-control w-full">
                    <div className="join">
                        <input
                            value={writtenBenefit}

                            onChange={(e) => {
                                setWrittenBenefitErr(false)
                                setWrittenBenefit(e.target.value)
                            }}
                            type="text"
                            placeholder=""
                            className="input input-bordered join-item w-full" />
                        <p onClick={handleStoreBenefit} className="btn btn-primary join-item  bg-primary/95 border-none hover:bg-primary px-5 text-white">Add</p>
                    </div>
                </fieldset>
                <p className="text-sm text-red-500"> {writtenBenefitErr && 'Please write a benefit!!'}</p>
                <div className="flex flex-col gap-5 py-5">
                    {allBenefits.map((item, index) => (
                        <div key={index} className="gap-2 relative">
                            <li className='  flex items-center text-black gap-2'><span>{item}</span></li>
                            <hr className='border-primary' />
                            <p onClick={() => handleDeleteBenefit(item)} className='text-center bg-primary/30 text-text_color size-6 absolute right-[-16px] top-[-16px] rounded-md ml-auto mb-2 cursor-pointer'>X</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddBenefits;