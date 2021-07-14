import React, { createContext, useState, useEffect, useContext } from "react";

import jwtDecode from "jwt-decode";
import { NotificationManager } from "react-notifications";
import { hideLoader, showLoader } from "./../components/helpers/loader";
import { httpPost } from "../helpers/httpMethods";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [appReduceSidebarWidth, setreduceSidebarWidth] = useState(false);
  const [UserInfo, setUserInfo] = useState("");
  const [userWallet, setUserWallet] = useState([]);
  const [UserClearingAccount, setUserClearingAccount] = useState([]);
  const [UserAccounts, SetUserAccounts] = useState([]);
  const [loadApi, setloadApi] = useState(false);
  const [toggleProfilePicModal, settoggleProfilePicModal] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [reloadAccount, setReloadAccount] = useState(false);
  const [reloadPage, setReloadPage] = useState(true);
  const [expiredSession, setExpiredSession] = useState(true);
  const [userAvatar, setUserAvatar] = useState(
    "https://tooxclusive.com/wp-content/uploads/2019/12/simi.jpg"
  );

  const toggleProfilePicModalFun = () => {
    settoggleProfilePicModal(!toggleProfilePicModal);
  };

  const ValidateToken = () => {
    setExpiredSession(true);
    let token = localStorage.getItem("token");
    if (token) {
      if (jwtDecode(token).exp < Date.now() / 1000) {
        window.location.href = "/login";
      } else {
        setExpiredSession(false);
      }
    } else {
      window.location.href = "/login";
    }
  };

  const GetUserInfoFromStorge = () => {
    let userData = localStorage.getItem("user");
    if (userData) {
      localStorage.setItem("checkTokenExp", false);
      console.log("Active Session");
      let parseUserData = JSON.parse(userData);
      setUserInfo(parseUserData);
      if (!parseUserData.accounts) {
        return;
      }

      let wallet = parseUserData.accounts.filter((data) => {
        return data.acctype === "Wallet";
      });
      setUserWallet(wallet);
      let clearingaccount = parseUserData.accounts.filter((data) => {
        return data.acctype === "clearingaccount";
      });
      setUserClearingAccount(clearingaccount);

      let getUserAccounts = parseUserData.accounts.filter((data) => {
        return data.acctype !== "clearingaccount";
      });
      SetUserAccounts(getUserAccounts);
      console.log("user Accounts>>>", getUserAccounts);
      setReloadAccount(true);
      setloadApi(true);
    }
  };

  const updateUserAccount = async (username, address) => {
    showLoader();
    const data = {
      user_name: username,
      address: address,
      device_id: "12345432",
      email: UserInfo.email,
      image: UserInfo.profileimage,
    };
    const res = await httpPost("profile/manage_profile", data);
    console.log(res);
    if (res) {
      if (res.responseCode === "200") {
        refreshAccount();
        hideLoader();
        return true;
      }

      hideLoader();
      return false;
    }

    hideLoader();
  };

  const updateUserProfilePic = async (imageFromAws) => {
    showLoader();
    const data = {
      user_name: UserInfo.username,
      address: UserInfo.profileaddress,
      device_id: "12345432",
      email: UserInfo.email,
      image: imageFromAws,
    };
    const res = await httpPost("profile/manage_profile", data);
    console.log(res);
    if (res) {
      if (res.responseCode === "200") {
        setReloadAccount(true);
        toggleProfilePicModalFun();
        refreshAccount();
        setReloadPage(!reloadPage);
      }

      hideLoader();
    } else {
    }

    hideLoader();
  };

  const refreshAccount = async () => {
    showLoader();
    const data = {
      username: UserInfo.username,
    };
    const res = await httpPost("wallet/account_refresh", data);

    if (res) {
      console.log(res.data);
      if (res.responseCode === "200") {
        setUserAvatar(res.profileimage);
        localStorage.setItem("user", JSON.stringify(res));
        GetUserInfoFromStorge();
        NotificationManager.success("Account Updated successfully", "Yepp");
      }

      hideLoader();
    } else {
      alert(5);
      console.log("SEEE ERRR>>>>", res);
    }

    hideLoader();
  };

  const logout = () => {
    return;
  };

  // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjE4OTM1NTk0LCJqdGkiOiIzOTViZjJhZjYyMTE0YjM4OWQxYzE1MWE5Mzk2NDY2ZSIsInVzZXJfaWQiOjc1LCJuYW1lIjoiMDgwODE0ODYxOTQiLCJhY2NvdW50cyI6IlsnMDgwODE0ODYxOScsICczNzEwMDY0MTAzJ10iLCJncm91cCI6InNldCgpIiwicGVybWlzc2lvbiI6InNldCgpIiwiYWNjb3VudF90eXBlIjoiY2hhbm5lbF91c2VyIn0.2sgwtQNPIPxJmhOGCeAFmByUfJ5pXuHUf1dZDf7K4-w

  useEffect(() => {
    ValidateToken();
    // if (expiredSession === false) {
    GetUserInfoFromStorge();
    //   console.log(UserInfo);
    // }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        logout,
        UserInfo,
        userWallet,
        UserClearingAccount,
        UserAccounts,
        GetUserInfoFromStorge,
        loadApi,
        setloadApi,
        updateUserAccount,
        toggleProfilePicModalFun,
        refreshAccount,
        reloadAccount,
        reloadPage,
        setReloadPage,
        userAvatar,
        setUserAvatar,
        ValidateToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
