import { FaFacebook, FaWhatsapp, FaTwitter, FaLinkedin, FaTelegram, FaViber } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { BsMessenger } from "react-icons/bs";
import toast from "react-hot-toast";
 
const Share = () => {
    const shareText = "Check out this awesome course!";
    const shareUrl = window.location.href;
    const openModal = () => document.getElementById('shareNowModal').showModal()
    const shareOnFacebook = () => {
        const url = `https://www.facebook.com/dialog/share?app_id=87741124305&href=${encodeURIComponent(`${shareText} ${shareUrl}`)}&display=popup`;
        window.open(url, '_blank');
    };

    const shareOnMail = () => {
        const subject = "Check this out!";
        const body = `${shareText} ${shareUrl}`;
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    const shareOnWhatsApp = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
        window.open(url, '_blank');
    };

    const shareOnTwitter = () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
        window.open(url, '_blank');
    };

    const shareOnLinkedIn = () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank');
    };



    const shareOnTelegram = () => {
        const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank');
    };

    const shareOnViber = () => {
        const url = `viber://forward?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
        window.open(url, '_blank');
    };

    const shareOnMessenger = () => {
        const url = `fb-messenger://share?link=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank');
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
               toast.success('Copied!!')
            })
            .catch(err => {
                toast.error(err.message)
            });
    }
    const shareIconsStyle = `text-3xl md:text-[40px] border-black rounded-full flex justify-center items-center cursor-pointer`;

    return (
        <>
            <div className="space-y-3 pr-5 pb-3 text-end">
                <button onClick={openModal} className="lg:p-3 p-1 rounded-lg bg-primary text-white hover:text-black  active:bg-white-700 focus:outline-none focus:ring focus:ring-red-300 focus:text-white w-max ">Share now</button>


            </div>
            <dialog id="shareNowModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg pb-5">Share</h3>
                    <div className="space-y-4">
                        <div className="flex gap-4 flex-wrap">
                            <p onClick={shareOnFacebook} className={`${shareIconsStyle} text-blue-700`}><FaFacebook /></p>
                            <p onClick={shareOnWhatsApp} className={`${shareIconsStyle} text-green-600`}><FaWhatsapp /></p>
                            <p onClick={shareOnMail} className={`${shareIconsStyle}  text-white bg-gray-500 size-8 md:size-10`}><span className="text-2xl md:text-3xl"><IoMdMail /></span></p>
                            <p onClick={shareOnTwitter} className={`${shareIconsStyle} text-blue-400`}><FaTwitter /></p>
                            <p onClick={shareOnLinkedIn} className={`${shareIconsStyle} text-blue-700`}><FaLinkedin /></p>

                            <p onClick={shareOnTelegram} className={`${shareIconsStyle} text-blue-400`}><FaTelegram /></p>
                            <p onClick={shareOnViber} className={`${shareIconsStyle} text-blue-600`}><FaViber /></p>
                            <p onClick={shareOnMessenger} className={`${shareIconsStyle} text-blue-600`}><BsMessenger /></p>
                        </div>
                        <div className="border border-gray-500 rounded-lg px-2 flex gap-5 py-1">
                            <p className="text-xs sm:text-sm font-medium   py-2 overflow-hidden">{shareUrl}</p>
                            <button onClick={handleCopy} className=" px-4 rounded-full text-sm bg-primary/95 text-white hover:bg-primary active:scale-95 transition-all duration-100">Copy</button>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Share;
