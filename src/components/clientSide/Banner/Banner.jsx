/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import ButtonLight from '../../../Shared/Button/ButtonLight';
import ButtonStrong from '../../../Shared/Button/ButtonStrong';
const Banner = ({ bannerImg = '', notice = '' }) => {
    return (
        <div className='bg-[#fefaee]'>
            <div className="px-5 lg:px-16 xl:px-20 flex gap-10 min-h-[70vh] md:min-h-[73vh] md:max-h-[73vh] max-w-7xl mx-auto ">
                <div className="md:min-h-[73vh] md:max-h-[73vh] flex justify-center items-center">
                    <div className="max-w-[532px] space-y-6 mx-auto">
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold ">Grow Your Skills, Secure <span className="text-primary">Your Future</span></h1>
                        <div dangerouslySetInnerHTML={{ __html: notice }}></div>
                        <div className="flex gap-5">
                            <div className="h-max rounded-md" style={{ boxShadow: `0px 0px 50px 50px #F4940140` }}><Link to={'/courses'}><ButtonStrong text={'Get Started'} /></Link></div>
                            <Link to={'/freeSeminar'}><ButtonLight text={'Join Free Seminar'} /></Link>
                        </div>
                    </div>
                </div>
                <div className="hidden md:block">
                    <img className="w-full h-full object-cover" src={bannerImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;