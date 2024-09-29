import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AddressNavbar from '../components/clientSide/AddressNavbar/AddressNavbar';
import Navbar from '../components/clientSide/Navbar/Navbar';
import Footer from '../components/clientSide/Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import NavBarDrawer from '../components/clientSide/Navbar/NavBarDrawer';
import BottomNavbar from '../pages/clientSide/BottomNavbar/BottomNavbar';

const MainLayout = () => {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        setOpen(false)
    }, [pathname])
    return (
        <div className='relative bg-white'>
            <NavBarDrawer open={open} setOpen={setOpen} />
            <ScrollToTop />
            <AddressNavbar />
            <div className='subxl:sticky top-0 z-40'>
                <Navbar open={open} setOpen={setOpen} />
            </div>
            <div className='fixed bottom-0 left-0 w-full z-20 block subxl:hidden'>
                <BottomNavbar/>
            </div>
            <Outlet></Outlet>
            <Footer />
        </div>
    );
};

export default MainLayout;