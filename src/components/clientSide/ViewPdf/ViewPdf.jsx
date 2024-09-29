import pdf from '../../../assets/pdf/JunayetsCV.pdf'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
const ViewPdf = () => {
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">

            <div className='h-[100vh] overflow-auto'>
                <Viewer fileUrl={pdf} />
            </div>
        </Worker>
    );
};

export default ViewPdf;