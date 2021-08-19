import React, { createContext, useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import "react-responsive-modal/styles.css";
import axios from "axios";
import { getLocalItem } from "../components/helpers/authService";
import jwtDecode from "jwt-decode";
export const UserDataContext = createContext();

export const UserDataProvider = (props) => {
  const [user, setUser] = useState();
  const [count, setCount] = useState(0);
  const [firstTimeLoad, setFirstTimeLoad] = useState(true);

  useEffect(() => {
    RecallJwt();
  }, []);

  useEffect(() => {
    getUserFromStorage();
  }, []);

  // THIS CALLS JWT TOKEN EXP
  // To custantly check if the user token is expired
  const RecallJwt = () => {
    setInterval(async () => {
      ValidateToken();
    }, 9000);
  };

  const ValidateToken = () => {
    let token = localStorage.getItem("token");
    if (token == undefined || token == null || token == "") {
      setFirstTimeLoad(false);
      localStorage.clear();
      return (window.location.href = "/");
    }
    if (jwtDecode(token).exp < Date.now() / 1000) {
      setFirstTimeLoad(false);
      localStorage.clear();
      setFirstTimeLoad(false);
      return (window.location.href = "/");
    }
    setFirstTimeLoad(false);
    // console.log("still valid");
  };

  const getUserFromStorage = () => {
    let lUser = getLocalItem("user");
    if (lUser == undefined || lUser == null) {
      return;
    } else {
      setUser(lUser);
    }
  };
  return (
    <UserDataContext.Provider value={{}}>
      {props.children}
    </UserDataContext.Provider>
  );
};
