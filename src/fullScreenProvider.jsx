import React, { createContext, useContext, useState } from 'react';


const FullScreenContext=createContext()

export const FullScreenProvider = ({ children }) => {

    const [fullScreen, setFullScreen]=useState(false);
    
  return (
    <FullScreenContext.Provider value={{fullScreen,setFullScreen}} >
      {children}
    </FullScreenContext.Provider>
  );
};

export const useFullScreenContext = () => useContext(FullScreenContext);