import React from "react";
import "./AccountSettings.scss";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import { useState } from "react";
import Branding from "./components/Branding";
import { Link } from "react-router-dom";
import { timezone } from "../../../shared/timezone";
import { languages } from "../../../shared/languages";
import { countries } from "../../../shared/countries";
import { useEffect } from "react";
import { httpGetMain, httpPatchMain } from "../../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
import ScaleLoader from "react-spinners/ScaleLoader";
const AccountSettings = () => {
  const [accountLoading, setAccountLoading] = useState(false);
  const [personalInformation, setPersonalInformation] = useState({
    avatar: {},
    notifications: false,
    security: false,
  });

  const [accountSettings, setAccountSettings] = useState({
    two_factor: false,
  });

  const handleAvatar = (e) => {
    e.preventDefault();
    const files = e.target.files;
    let avatarImage = URL.createObjectURL(files[0]);
    console.clear();
    setPersonalInformation({
      ...personalInformation,
      avatar: { file: files[0], blob: avatarImage },
    });
    console.log(avatarImage);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInformation({
      ...personalInformation,
      [name]: value,
    });
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setAccountSettings({
      ...accountSettings,
      [name]: value,
    });
  };

  const getUserInfo = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    user = user.user;
    console.clear();
    console.log("user", user);
    const res = await httpGetMain(`users/${user?.id}`);
    if (res?.status == "success") {
      console.clear();
      console.log(res?.data);
      setPersonalInformation(res?.data);
    } else {
      // setLoadingTicks(false);

      console.log("error", res);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  const updateUserInfo = async () => {
    setAccountLoading(true);
    let user = JSON.parse(localStorage.getItem("user"));
    user = user.user;
    const res = await httpPatchMain(`users/${user?.id}`, personalInformation);
    setAccountLoading(false);
    if (res?.status == "success") {
      console.clear();
      console.log(res);
    } else {
      // setLoadingTicks(false);

      console.log("error", res);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="account-settings">
      {accountLoading && (
        <div
          className={`cust-table-loader ${
            accountLoading && "add-loader-opacity"
          }`}
        >
          <ScaleLoader loading={accountLoading} color={"#006298"} />
        </div>
      )}
      <div className="card card-body bg-white border-0">
        <div id="mainContentHeader" className="breadcrumb">
          <h6 className="text-muted f-14">
            <Link to="/settings">
              <span className="text-custom">Settings</span>
            </Link>{" "}
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
            <span>User Profile</span>
          </h6>
        </div>

        <div className="tab-content" id="pills-tabContent">
          {/*
          <!--* Personal Information View -->
          */}
          <div className="d-flex justify-content-between col-md-8">
            {/* <h5 className="fw-bold">Personal Information Settings</h5> */}

            <h3 className="fs-6 text-black">Personal Information Settings</h3>

            <button
              type="button"
              className="btn btn-sm bg-at-blue-light text-white px-4"
              onClick={updateUserInfo}
            >
              Save Changes
            </button>
          </div>
          <div
            className="show fade col-md-8"
            id="personal-information-view"
            role="tabpanel"
            aria-labelledby="pills-personal-tab"
          >
            <div className="mb-5 mt-4">
              <div className="d-flex mb-3">
                <div className="me-2 w-100">
                  <label for="first-name" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="firstname"
                    className="form-control"
                    value={personalInformation.firstname || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-100">
                  <label className="form-label" for="last-name">
                    Last Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="last-name"
                    name="lastname"
                    value={personalInformation.lastname || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" for="first-name">
                  Email
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="email"
                  name="email"
                  value={personalInformation.email || ""}
                  disabled
                />
              </div>
            </div>
            {/*
            <!-- * upload photo section -->
            */}
            <div className="d-flex mb-5">
              <div
                id="uploadPersonalPhotoInputImgPreview"
                style={{ width: "6rem", height: "6rem" }}
                className="
                  border border-1
                  rounded-3
                  me-5
                  d-flex
                  justify-content-center
                  align-items-center
                "
              >
                <div
                  style={{
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                  }}
                  className="ms-0 d-flex justify-content-between align-items-center"
                >
                  {personalInformation?.avatar?.blob ||
                    (personalInformation.avatar !== {} && (
                      <img
                        className="avatarImage"
                        src={
                          personalInformation?.avatar?.blob ||
                          personalInformation?.avatar
                        }
                        alt=""
                      />
                    ))}
                </div>
              </div>
              <div>
                <label
                  for="uploadPersonalPhotoInput"
                  className="btn btn-sm bg-at-blue-light px-4 py-1 mb-2 mt-1"
                >
                  Upload Photo
                </label>
                <input
                  type="file"
                  name="uploadPersonalPhotoInput"
                  id="uploadPersonalPhotoInput"
                  onChange={handleAvatar}
                />
                <p className="mb-0 text-at-red">
                  <small id="uploadPersonalPhotoInputError"></small>
                </p>
                <p className="uploadInfoWrapper">
                  <small id="uploadPersonalPhotoInputInfo">
                    Upload personal photo, uploaded file must be an image.
                  </small>
                </p>
              </div>
            </div>
            {/*
            <!-- * change password -->
            */}
            <div className="mb-5">
              <label className="form-label" for="change-password">
                Change Password
              </label>
              <input
                className="form-control"
                type="password"
                name="change_password"
                id="change-password"
                value={personalInformation.change_password || ""}
                onChange={handleChange}
              />
              <button className="btn btn-sm bg-at-blue-light px-3 py-1 mt-3">
                Change Password
              </button>
            </div>
            {/*
            <!-- * Notifications -->
            */}
            <div className="d-flex">
              {/* <div className="mb-3">
                  <label className="d-block">Notifications</label>
                  <label>
                    <small>Disable notifications</small>
                  </label>
                  <div className="mt-2 d-flex">
                    <div className="border border-1 d-inline-block px-4 py-2 rounded-3">
                      <div className="form-check form-switch d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckDefault"
                          checked={personalInformation.notifications}
                          onChange={(e) =>
                            setPersonalInformation({
                              ...personalInformation,
                              notifications: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="form-check-label ms-3"
                          for="flexSwitchCheckDefault"
                          style={{ width: 20 }}
                        >
                          {personalInformation.notifications ? "Yes" : "No"}
                        </label>
                      </div>
                    </div>
                  </div>
                </div> */}
              {/* <!-- * Security and Privacy --> */}
              {/* <div className="mb-5" style={{ marginLeft: 50 }}>
                  <label className="d-block" for="">
                    Security and Privacy (MFA)
                  </label>
                  <label>
                    <small>Enable Security</small>
                  </label>
                  <div className="mt-2 d-flex">
                    <div className="border border-1 d-inline-block px-4 py-2 rounded-3">
                      <div className="form-check form-switch d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="security-switch"
                          checked={personalInformation.security}
                          onChange={(e) =>
                            setPersonalInformation({
                              ...personalInformation,
                              security: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="form-check-label ms-3"
                          for="security-switch"
                          style={{ width: 20 }}
                        >
                          {personalInformation.security ? "Yes" : "No"}
                        </label>
                      </div>
                    </div>
                  </div>
                </div> */}
            </div>
          </div>
          {/*
          <!--* End of Personal Information View -->
          */}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
