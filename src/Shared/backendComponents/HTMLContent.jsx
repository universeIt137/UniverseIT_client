import React from 'react';
import DOMPurify from 'dompurify';


const HTMLContent = ({ content }) => {
    // Sanitize HTML content
    const sanitizedContent = DOMPurify.sanitize(content);
    return (
        <div>
            <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            ></div>
        </div>
    );
};

export default HTMLContent;