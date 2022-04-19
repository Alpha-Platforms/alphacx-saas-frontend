/* eslint-disable */
import React, { createContext, useState, useEffect, useContext } from 'react';

export const LayoutContext = createContext();

export function LayoutProvider(props) {
    const [appReduceSidebarWidth, setreduceSidebarWidth] = useState(false);
    const reduceSidebarWidth = () => {
        setreduceSidebarWidth(!appReduceSidebarWidth);
    };

    return (
        <LayoutContext.Provider
            value={{
                setreduceSidebarWidth,
                appReduceSidebarWidth,
                reduceSidebarWidth,
            }}
        >
            {props.children}
        </LayoutContext.Provider>
    );
}
