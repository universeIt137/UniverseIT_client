import React, { useState } from 'react';
import ContactBanner from './ContactBanner';
import ContactForm from './ContactForm';
import ContactGoogleMap from './ContactGoogleMap';

const ContactUsPage = () => {
    

    return (
        <div className=''>
            <ContactBanner></ContactBanner>
            
            <ContactForm></ContactForm>
            <ContactGoogleMap></ContactGoogleMap>
        </div>
    );
};

export default ContactUsPage;