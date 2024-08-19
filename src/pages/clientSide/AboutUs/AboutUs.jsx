import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Testimonials from '../../../components/clientSide/Testimonials/Testimonials';
import Courses from '../../../components/clientSide/Courses/Courses';
import Banner from '../../../components/clientSide/Banner/Banner';
import HomeFreeSeminar from '../../../components/clientSide/HomeFreeSeminar/HomeFreeSeminar';
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
                <Courses />
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
                <Testimonials />
            </motion.div>
        </div>
    );
};

export default AboutUs;