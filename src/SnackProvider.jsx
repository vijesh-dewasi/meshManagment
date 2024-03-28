import React, { createContext, useContext, useState } from 'react';


const SnackContext=createContext()

export const SnackProvider = ({ children }) => {

    const [snack, setSnack]=useState({
        open:false,
        msg:"I love snacks",
        severity:"info"
      });
    
  return (
    <SnackContext.Provider value={{snack,setSnack }}>
      {children}
    </SnackContext.Provider>
  );
};

export const useSnackContext = () => useContext(SnackContext);