/* eslint-disable react/prop-types */
import Marquee from "react-fast-marquee";
import ReactPlayer from "react-player";
import SingleSubVideos from "../../../Shared/SingleSubVideos";

const CourseDetailsPageSubVideos = ({ subVideos }) => {
   
    const titleStyle = 'text-black font-medium py-1 max-w-[230px]'
    return (
        <div className="relative hidden  lg:flex pt-10 z-10">
            <Marquee pauseOnHover={true}>
                <div className="flex gap-10 pr-10">
                    {
                        subVideos?.map((video, idx) => <div key={idx}>
                            <SingleSubVideos video={video?.url} />

                            <p className={`${titleStyle}`}>{video?.title}</p>
                        </div>)
                    }
                </div>
            </Marquee>

        </div>
    );
};

export default CourseDetailsPageSubVideos;