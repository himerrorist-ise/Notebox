import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import {auth} from "./firebaseConfig";

function PrivateRoute({Component, ...rest}) {
    
    // return (
    // <Route
    //   {...rest}
    //   render={props =>
    //     auth.currentUser ? <Component {...props} /> : <Navigate to="/login" />
    //   }
    // />
    // )

    return auth.currentUser ? <Component /> : <Navigate to="/login" />;
}

export default PrivateRoute