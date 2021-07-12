import React, { createContext, useState, useEffect, useContext } from "react";
export const LayoutContext = createContext();

export const LayoutProvider = (props) => {
  const [appReduceSidebarWidth, setreduceSidebarWidth] = useState(false);
  // const [deviceWidth, setDeviceWidth] = useState(0);
  // useEffect(() => {
  
  // }, [])
  const reduceSidebarWidth = () => {
    setreduceSidebarWidth(!appReduceSidebarWidth);
  };
  return (
    <LayoutContext.Provider
      value={{
        setreduceSidebarWidth,
        appReduceSidebarWidth,
        reduceSidebarWidth
      }}
    >
      {props.children}
    </LayoutContext.Provider>
  );
};
