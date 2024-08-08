import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import BackendNavbar from '../Shared/backendComponents/BackendNavbar';
import Sidebar from '../Shared/backendComponents/Sidebar';

const DashboardLayout = () => {
    return (
        <>
            <ScrollToTop />
            <div className="lg:flex min-h-screen bg-gray-100">
                <div className='lg:w-64'>
                    <div className=' hidden lg:block lg:fixed left-0 top-0'>
                        <Sidebar></Sidebar>
                    </div>
                </div>
                <div className='flex-1'>

                    <BackendNavbar></BackendNavbar>
                    <div className=''>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;