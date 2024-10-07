import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const ContactGoogleMap = () => {
    return (
        <>


        <div className='w-full  mx-auto'>
            <div className=''>
                    <iframe className='lg:w-full w-full mx-auto border-[1.5px]  ' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.4200354728714!2d90.42140208037875!3d23.76805253309107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf537d1f2e09%3A0x8fe7a3faf331a140!2sUniverse%20IT%20Institute!5e0!3m2!1sen!2sbd!4v1728196624556!5m2!1sen!2sbd" width="600" height="450" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.4200354728714!2d90.42140208037875!3d23.76805253309107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf537d1f2e09%3A0x8fe7a3faf331a140!2sUniverse%20IT%20Institute!5e0!3m2!1sen!2sbd!4v1728196624556!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
            </div>
        </div>
    </>
    );
};

export default ContactGoogleMap;