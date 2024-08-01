import Banner from '../../../components/clientSide/Banner/Banner';
import Courses from '../../../components/clientSide/Courses/Courses';
import Services from '../../../components/clientSide/Services/Services';
import { Helmet } from 'react-helmet-async';
import Milestones from '../../../components/clientSide/Milestones/Milestones';
import FreeSeminar from '../../../components/clientSide/FreeSeminar/FreeSeminar';

const HomePage = () => {
    return (
        <>
            <Helmet>
                <title>Universe IT | Home</title>
            </Helmet>
            <Banner />
            <Courses />
            <Services />
            <Milestones />
            <FreeSeminar />
        </>
    );
};

export default HomePage;