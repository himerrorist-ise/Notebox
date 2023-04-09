import React, { useState, createContext } from "react";

// header context
export const AppContext = createContext();

const ContextProvider = (props) => {

  const [userData, setUserData] = useState({
    email: "",
    name: "",
  });

  const handleUserDataChange = (user) => setUserData(user);

  return(
    <AppContext.Provider value={{
      userData,
      setUserData: handleUserDataChange,
    }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default ContextProvider;