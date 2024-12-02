/* eslint-disable react/prop-types */
// import React from 'react';

import { Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import auth from "../firebase/firebase.init";
import useRepresentative from "../hooks/useRepresentative";

const PrivateRouts = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isRepresentative, isRepresentativeLoading] = useRepresentative();
    
    if (loading || isAdminLoading || isRepresentativeLoading) {
        return 
    }
    
    if (user && isAdmin ) {
        return <div>
            {children}
        </div>

    } else if (user && isRepresentative) {
        return <div>
            {children}
        </div>
    }
    else {
        signOut(auth)
    }
    return <Navigate to={'/login'}></Navigate>;
};

export default PrivateRouts;