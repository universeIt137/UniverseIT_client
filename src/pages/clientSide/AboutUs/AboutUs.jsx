import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Testimonials from '../../../components/clientSide/Testimonials/Testimonials';
import Courses from '../../../components/clientSide/Courses/Courses';
import Banner from '../../../components/clientSide/Banner/Banner';
import HomeFreeSeminar from '../../../components/clientSide/HomeFreeSeminar/HomeFreeSeminar';
import { Link } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa';
import AboutBanner from './AboutBanner';
import Milestones from '../../../components/clientSide/Milestones/Milestones';
import CertifiedInstitute from './CertifiedInstitute';
import Services from '../../../components/clientSide/Services/Services';
import StudentGalleryTabs from '../../adminSide/manageStudentGallary/StudentGalleryTabs';
import AddStudentGallery from '../../adminSide/addStudentGallary/AddStudentGallary';
import SuccessStories from '../../../components/clientSide/SuccessStories/SuccessStories';
const AboutUs = () => {
    const scrollAnimationVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <div>
            <Helmet>
                <title>Universe IT | About Us</title>
            </Helmet>





            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={scrollAnimationVariants}
                viewport={{ once: false, amount: 0.2 }}
            >
                <AboutBanner></AboutBanner>
            </motion.div>

           
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={scrollAnimationVariants}
                viewport={{ once: false, amount: 0.2 }}
            >
                <Milestones/>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={scrollAnimationVariants}
                viewport={{ once: false, amount: 0.2 }}
            >
                <Services />
            </motion.div>


            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={scrollAnimationVariants}
                viewport={{ once: false, amount: 0.2 }}
            >
                <HomeFreeSeminar />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={scrollAnimationVariants}
                viewport={{ once: false, amount: 0.2 }}
            >
                <SuccessStories></SuccessStories>
            </motion.div>


            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={scrollAnimationVariants}
                viewport={{ once: false, amount: 0.2 }}
            >
                <Testimonials />
            </motion.div>
        </div>
    );
};

export default AboutUs;