import React from 'react';
import Banner from '../../../components/clientSide/Banner/Banner';
import Courses from '../../../components/clientSide/Courses/Courses';
import Services from '../../../components/clientSide/Services/Services';

const HomePage = () => {
    return (
        <>
            <Banner />
            <Courses />
            <Services />
        </>
    );
};

export default HomePage;