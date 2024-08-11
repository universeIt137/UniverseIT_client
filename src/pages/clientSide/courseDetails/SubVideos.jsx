/* eslint-disable react/prop-types */
import Marquee from "react-fast-marquee";
import ReactPlayer from "react-player";

const SubVideos = ({ subVideos }) => {
    const videoDivStyle = 'rounded-md overflow-hidden k w-[230px] h-[130px]'
    const titleStyle = 'text-black font-medium py-1 max-w-[230px]'
    return (
        <div className="relative hidden  lg:flex pt-10 z-10">
            <Marquee pauseOnHover={true}>
                <div className="flex gap-10 pr-10">
                    {
                        subVideos?.map((video, idx) => <div key={idx}>
                            <div className={`${videoDivStyle}`}>
                                <ReactPlayer
                                    controls="true"

                                    url={video?.url}
                                    width="100%"
                                    height='100%'
                                />
                            </div>

                            <p className={`${titleStyle}`}>{video?.title}</p>
                        </div>)
                    }
                </div>
            </Marquee>

        </div>
    );
};

export default SubVideos;