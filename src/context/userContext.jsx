import React, { createContext, useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import "react-responsive-modal/styles.css";
import axios from "axios";
export const UserDataContext = createContext();

export const UserDataProvider = (props) => {
  useEffect(() => {}, []);

  return (
    <UserDataContext.Provider value={{}}>
      {props.children}
    </UserDataContext.Provider>
  );
};
