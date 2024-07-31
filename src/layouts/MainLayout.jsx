import React from 'react';
import { Outlet } from 'react-router-dom';
import AddressNavbar from '../components/clientSide/AddressNavbar/AddressNavbar';
import Navbar from '../components/clientSide/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div className='relative'>
            <AddressNavbar />
            <div>
                <Navbar/>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;