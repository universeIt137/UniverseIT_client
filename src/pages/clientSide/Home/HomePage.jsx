import React from 'react';
import Banner from '../../../components/clientSide/Banner/Banner';
import Courses from '../../../components/clientSide/Courses/Courses';
import Services from '../../../components/clientSide/Services/Services';
import { Helmet } from 'react-helmet-async';
import Milestones from '../../../components/clientSide/Milestones/Milestones';
import HomeFreeSeminar from '../../../components/clientSide/HomeFreeSeminar/HomeFreeSeminar';
import SuccessStories from '../../../components/clientSide/SuccessStories/SuccessStories';
import Testimonials from '../../../components/clientSide/Testimonials/Testimonials';
import CallUs from '../../../components/clientSide/CallUs/CallUs';
import { motion } from 'framer-motion';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const HomePage = () => {
    const axiosPublic = useAxiosPublic()
    const { data: homepageContent = [], refetch: homepageContentRefetch, isLoading } = useQuery({
        queryKey: ['homepageContent'],
        queryFn: async () => {
            const res = await axiosPublic.get('/homepageContent')
            return res?.data
        }
    })
    if (isLoading) {
        return ''
    }
    const data = homepageContent[0] || [];
    const scrollAnimationVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };
    

    return (
        <>
            <Helmet>
                <title>Universe IT | Home</title>
            </Helmet>
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={scrollAnimationVariants}
                viewport={{ once: false, amount: 0.2 }}
            >
                <Banner bannerImg={data?.imageUrl || ''} data={data} notice={data?.notice || ''} />
            </motion.div>


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
                <Services />
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={scrollAnimationVariants}
                viewport={{ once: false, amount: 0.2 }}
            >
                <Milestones />
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
                <SuccessStories isHomePage={true} />
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={scrollAnimationVariants}
                viewport={{ once: false, amount: 0.2 }}
            >
                <Testimonials />
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={scrollAnimationVariants}
                viewport={{ once: false, amount: 0.2 }}
            >
                <CallUs />
            </motion.div>
        </>
    );
};

export default HomePage;
