import React from 'react';
import { Outlet } from 'react-router-dom';
import AddressNavbar from '../components/clientSide/AddressNavbar/AddressNavbar';
import Navbar from '../components/clientSide/Navbar/Navbar';
import Footer from '../components/clientSide/Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const MainLayout = () => {
    return (
        <div className='relative bg-white'>
            <ScrollToTop />
            <AddressNavbar />
            <div className='sticky top-0 z-40'>
                <Navbar />
            </div>
            <Outlet></Outlet>
            <Footer />
        </div>
    );
};

export default MainLayout;