import React from 'react';
import { Helmet } from 'react-helmet-async';
import FeedbackComponent from './FeedbackComponent';


const Feedback = () => {


    return (
        <div>
             <Helmet>
                <title>Universe IT | Feedback</title>
            </Helmet>

           <FeedbackComponent></FeedbackComponent>
        </div>
    );
};

export default Feedback;