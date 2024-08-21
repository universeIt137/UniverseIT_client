/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import ReactPlayer from "react-player";
import SingleSubVideos from "./SingleSubVideos";
 
const SubVideos = ({ subVideosArray, setSubVideos }) => {
    const videoDivStyle = 'rounded-md overflow-hidden k w-[230px] h-[130px]'
    const titleStyle = 'text-black font-medium py-1 max-w-[230px]'
    const handleDelete = (id) => {
        const filteredVideos = subVideosArray?.filter(item=> item.id !== id);
        setSubVideos(filteredVideos)
    }
    return (
        <div className='p-2 flex gap-5 flex-wrap'>

            {
                subVideosArray.map(item => <div key={item.id} className="relative">
                    <p onClick={() => handleDelete(item.id)} className='absolute top-2 right-2 size-7 rounded-md bg-red-500 hover:bg-red-600 flex justify-center items-center text-lg text-white active:scale-90 transition-all duration-300 cursor-pointer z-10'><MdDelete /></p>
                    <SingleSubVideos video={item?.url} />
                    <p className={`${titleStyle}`}>{item?.title}</p>
                </div>)
            }
        </div>
    );
};

export default SubVideos;