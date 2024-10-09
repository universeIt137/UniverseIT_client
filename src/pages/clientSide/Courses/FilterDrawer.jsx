/* eslint-disable react/prop-types */
import { Button, Drawer, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import CoursesRadioStyle from "./CoursesRadioStyle";
import Share from "../courseDetails/Share";
import Loading from "../../../Shared/Loading/Loading";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FilterDrawer = ({ tabName, setTabName, isLoading, popularCategories }) => {
    const [openBottom, setOpenBottom] = useState(false);
    const openDrawerBottom = () => setOpenBottom(true);
    const closeDrawerBottom = () => setOpenBottom(false);
    useEffect(()=> {
        closeDrawerBottom()
    },[tabName])
    return (
        <>
            <div className='flex justify-center items-center w-full'><button onClick={openDrawerBottom} className='text-lg sm:text-2xl bg-text_color p-2 rounded-lg text-white hover:bg-primary hover:text-white transition-all duration-300 active:scale-90'><IoFilterOutline /></button></div>

            <Drawer
                placement="bottom"
                open={openBottom}
                onClose={closeDrawerBottom}
                size={540}
                className="p-4 overflow-auto"
            >
                <div className="mb-6 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">
                        Filter
                    </Typography>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={closeDrawerBottom}
                    >
                       <FaChevronDown className="text-lg text-black" />
                    </IconButton>
                </div>
                <div className=''>

                    <div className='px-2 max-w-[270px]'><Share isCoursePage={true} /></div>
                    <div className='p-5 space-y-2'>
                        <CoursesRadioStyle tabName={tabName} setTabName={setTabName} name={'All Courses'} />
                        <CoursesRadioStyle tabName={tabName} setTabName={setTabName} name={'Online'} />
                        <CoursesRadioStyle tabName={tabName} setTabName={setTabName} name={'Offline'} />
                        <CoursesRadioStyle tabName={tabName} setTabName={setTabName} name={'Corporate'} />

                    </div>

                    <div className='p-5 space-y-2'>
                        <p className='font-semibold'>Search By Popular Courses</p>
                        {
                            isLoading ? <Loading /> :
                                popularCategories.map((category, idx) =>

                                    <CoursesRadioStyle key={idx} tabName={tabName} setTabName={setTabName} name={`${category.popularCategory}`} />

                                )

                        }

                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default FilterDrawer;