import React, { createContext, useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import "react-responsive-modal/styles.css";
import axios from "axios";
import { getLocalItem } from "../components/helpers/authService";
import jwtDecode from "jwt-decode";
import { httpGetMain, httpPostMain } from "helpers/httpMethods";
import NotificationManager from "react-notifications/lib/NotificationManager";
export const UserDataContext = createContext();

export const UserDataProvider = (props) => {
  const [user, setUser] = useState();
  const [count, setCount] = useState(0);
  const [firstTimeLoad, setFirstTimeLoad] = useState(true);

  useEffect(() => {
    RecallJwt();
  }, []);

  // THIS CALLS JWT TOKEN EXP
  // To custantly (60sec) check if the user token is expired
  const RecallJwt = () => {
    setInterval(async () => {
      ValidateToken();
    }, 300000);
  };

  const ValidateToken = async () => {
    let token = localStorage.getItem("token");
    let refreshToken = localStorage.getItem("refreshToken");

    // zeelz: do proper check later
    // if (token == undefined || token == null || token == "") {
    //   setFirstTimeLoad(false);
    //   localStorage.clear();
    //   return (window.location.href = "/");
    // }

    if (token && jwtDecode(token).exp < Date.now() / 1000) {

        const res = await httpPostMain ("auth/refreshToken", {"refreshToken": refreshToken});

        if (res?.status == "success") {
          const {token: {token, refreshToken}} = res;

          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", refreshToken);
          
        } else {
          setFirstTimeLoad(false);
          localStorage.clear();
          return (window.location.href = "/login");
        }

    }
  };

  return (
    <UserDataContext.Provider value={{}}>
      {props.children}
    </UserDataContext.Provider>
  );
};