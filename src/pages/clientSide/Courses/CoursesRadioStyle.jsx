/* eslint-disable react/prop-types */

const CoursesRadioStyle = ({ tabName, setTabName, name }) => {
    return (
        <div onClick={() => setTabName(name)} className='flex gap-2 items-center cursor-pointer radioParent'>
            <div className={`size-5 ${tabName===name?'bg-primary':'bg-black '} rounded-full p-[2px] radioChild transition-all duration-300`}>
                <div className={` w-full h-full bg-white rounded-full p-[2px]`}>
                    <div className={`transition-all duration-300  w-full h-full  rounded-full ${tabName === name ? 'bg-primary' : 'bg-black'}`}>

                    </div>
                </div>
            </div>
            <p className='text-lg font-medium'>{name}</p>
        </div>
    );
};

export default CoursesRadioStyle;