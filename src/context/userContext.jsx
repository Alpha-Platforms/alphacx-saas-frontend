import React, { createContext, useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import "react-responsive-modal/styles.css";
import axios from "axios";
import { getLocalItem } from "../components/helpers/authService";
export const UserDataContext = createContext();

export const UserDataProvider = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    getUserFromStorage();
  }, []);
  const getUserFromStorage = () => {
    let lUser = getLocalItem("user");
    //alert(lUser);
    if (lUser == undefined || lUser == null) {
      // window.location.href = "/";
    } else {
      console.log(lUser);
      setUser(lUser);
    }
  };
  return (
    <UserDataContext.Provider value={{}}>
      {props.children}
    </UserDataContext.Provider>
  );
};
