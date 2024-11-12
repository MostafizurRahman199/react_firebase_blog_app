import React from 'react'
import { useFirebase } from '../context/Firebase';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({children}) => {

const {user, loading} = useFirebase();


if(loading){
    return (
        <div className="h-screen flex items-start justify-center mt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
}


  return (
    <div>
        {user ? children : <Navigate to="/login"></Navigate>}

    </div>
  )
}

export default PrivateRoutes