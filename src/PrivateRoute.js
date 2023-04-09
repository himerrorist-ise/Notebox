import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';

// import {auth} from "./firebaseConfig";
import { AppContext } from "./Config/ContextProvider";

function PrivateRoute({Component, ...rest}) {
    const {setUserData} = useContext(AppContext);
    const temp = JSON.parse(localStorage.getItem("user"));

    React.useEffect(() => {
        if (temp){
            setUserData(temp);
        }
      }, []);
    // return (
    // <Route
    //   {...rest}
    //   render={props =>
    //     auth.currentUser ? <Component {...props} /> : <Navigate to="/login" />
    //   }
    // />
    // )

    return temp !== null ? <Component /> : <Navigate to="/login" />;
}

export default PrivateRoute