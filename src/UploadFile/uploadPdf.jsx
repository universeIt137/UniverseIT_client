import axios from "axios";

export const uploadPdf = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'pdf_preset');  // Ensure you set a preset for PDFs in Cloudinary
    
    try {
        let api = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;  // Use 'raw' for non-image files like PDFs
        const res = await axios.post(api, data);
        
        const { secure_url } = res.data;  // Extract secure URL from response
        console.log(secure_url);
        return secure_url;
    } catch (error) {
        console.log(error);
        return '';
    }
};