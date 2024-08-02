import React from 'react';
import { Outlet } from 'react-router-dom';
import AddressNavbar from '../components/clientSide/AddressNavbar/AddressNavbar';
import Navbar from '../components/clientSide/Navbar/Navbar';
import Footer from '../components/clientSide/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='relative bg-gray-100'>
            <AddressNavbar />
            <div className='sticky top-0 z-50'>
                <Navbar />
            </div>
            <Outlet></Outlet>
            <Footer />
        </div>
    );
};

export default MainLayout;