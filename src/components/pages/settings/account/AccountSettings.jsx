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
  const [activeTab, setActiveTab] = useState("personal");
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
      setPersonalInformation({ ...res?.data });
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
        <div id="mainContentHeader">
          <h6 className="text-muted f-14">
            <Link to="/settings">
              <span className="text-custom">Settings</span>
            </Link>{" "}
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
            <span>Account Settings</span>
          </h6>
          <div id="pageTabs" className="mb-5 mt-3">
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={` ${
                    activeTab === "personal" && "active"
                  } nav-link text-muted px-0 me-5`}
                  id="pills-personal-tab"
                  onClick={() => setActiveTab("personal")}
                >
                  Personal Information
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`${
                    activeTab === "account" && "active"
                  } nav-link text-muted px-0 me-5`}
                  id="pills-account-tab"
                  onClick={() => setActiveTab("account")}
                >
                  Account Settings
                </button>
              </li>
              {/* <li className="nav-item" role="presentation">
                <button
                  className={`${
                    activeTab === "branding" && "active"
                  } nav-link text-muted px-0 me-5`}
                  id="pills-account-tab"
                  onClick={() => setActiveTab("branding")}
                >
                  Branding
                </button>
              </li> */}
            </ul>
          </div>
        </div>

        {activeTab === "personal" ? (
          <div className="tab-content" id="pills-tabContent">
            {/*
          <!--* Personal Information View -->
          */}
            <div className="d-flex justify-content-between col-md-8">
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
        ) : activeTab === "account" ? (
          <div
            className="tab-pane"
            id="account-settings-view"
            role="tabpanel"
            aria-labelledby="pills-account-tab"
          >
            {/* <!--* Start of Account Settings View --> */}
            <div className="d-flex justify-content-between col-md-8">
              <h3 className="fs-6 text-black">Account Settings</h3>
              <button
                type="button"
                className="btn btn-sm bg-at-blue-light text-white px-4"
              >
                Save Changes
              </button>
            </div>

            <div className="mt-4 mb-5 col-md-8">
              <div className="mb-3">
                <label for="organisation-name" className="form-label">
                  Organisation Name
                </label>
                <input
                  type="text"
                  name="organisation_name"
                  className="form-control"
                  id="organisation-name"
                  value={accountSettings.organisation_name || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label for="domain-field" className="form-label">
                  Domain
                </label>
                <input
                  name="domain_field"
                  type="text"
                  className="form-control"
                  id="domain-field"
                  value={accountSettings.domain_field || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label for="organisation-profile" className="form-label">
                  Organisation Profile
                </label>
                <textarea
                  name="organisation_profile"
                  className="form-control"
                  id="organisation-profile"
                  value={accountSettings.organisation_profile || ""}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="row">
                <div className="mb-3 col-6">
                  <label for="account-email" className="form-label">
                    Email
                  </label>
                  <input
                    name="account_email"
                    type="email"
                    className="form-control"
                    id="account-email"
                    value={accountSettings.account_email || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-6">
                  <label for="account-website" className="form-label">
                    Website
                  </label>
                  <input
                    name="account_website"
                    type="text"
                    className="form-control"
                    id="account-website"
                    value={accountSettings.account_website || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-6">
                  <label for="account-address" className="form-label">
                    Address
                  </label>
                  <input
                    name="account_address"
                    type="text"
                    className="form-control"
                    id="account-address"
                    value={accountSettings.account_address || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-6">
                  <label for="account-phone" className="form-label">
                    Phone
                  </label>
                  <input
                    name="account_phone"
                    type="tel"
                    className="form-control"
                    id="account-phone"
                    value={accountSettings.account_phone || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-6">
                  <label for="account-timezone" className="form-label">
                    Timezone
                  </label>
                  <select
                    name="account-timezone"
                    id="account-timezone"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="">Select time zone</option>
                    {timezone.map((zone, i) => (
                      <option key={i} value={zone.value}>
                        {zone.value}({zone.abbr})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3 col-6">
                  <label for="account-language" className="form-label">
                    Language
                  </label>
                  <select
                    name="account-language"
                    id="account-language"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="">Select language</option>
                    {languages.map((lang, i) => (
                      <option key={i} value={lang?.name}>
                        {lang?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label for="account-country" className="form-label">
                  Country
                </label>
                <select
                  name="account-country"
                  id="account-country"
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="">Select country</option>
                  {countries.map((country, i) => (
                    <option key={i} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="row">
                <div className="mb-3 col-6">
                  <label for="work-days" className="form-label">
                    Work Days
                  </label>
                  <select
                    name="work-days"
                    id="work-days"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected></option>
                    <option value="--">--</option>
                  </select>
                </div>

                <div className="mb-3 col-6">
                  <label for="working-hours-from" className="form-label">
                    Working Hours
                  </label>
                  <div className="d-flex align-items-center">
                    <select
                      name="work-hour-start"
                      id="working-hours-from"
                      //   className="form-select"
                      className="border border-1 time-form-control"
                      aria-label="Default select example"
                      style={{ width: 100, paddingRight: 20 }}
                    >
                      <option selected>09:00</option>
                    </select>
                    <div className="separator" />
                    <select
                      name="work-hour-start"
                      id="working-hours-from"
                      //   className="form-select"
                      className="border border-1 time-form-control"
                      aria-label="Default select example"
                      style={{ width: 100, paddingRight: 20 }}
                    >
                      <option selected>15:00</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="d-block" for="">
                  Security and Privacy (2FA Settings)
                </label>
                <div>
                  <div
                    className="
                      mt-2
                      border border-1
                      d-inline-block
                      px-4
                      py-2
                      rounded-3
                    "
                  >
                    <div
                      className="form-check form-switch d-flex align-items-center"
                      style={{ width: 70 }}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="security-switch"
                        checked={accountSettings.two_factor}
                        onChange={(e) =>
                          setAccountSettings({
                            ...accountSettings,
                            two_factor: e.target.checked,
                          })
                        }
                      />
                      <label
                        className="form-check-label ms-3"
                        for="security-switch"
                      >
                        {accountSettings.two_factor ? "Yes" : "No"}
                      </label>
                    </div>
                  </div>
                  <div className="d-inline-block">
                    &nbsp;&nbsp; Enable Two Factor Authentication
                  </div>
                </div>
              </div>

              <div>
                <label className="d-block mb-2">Export Data</label>
                <button
                  className="btn btn-sm bg-at-blue-light px-4 py-1"
                  style={{ width: 120 }}
                >
                  Export{" "}
                  {/*
                  <object
                    data="../assets/alphatickets/icons/white-upload.svg"
                    className="sm-align"
                    type="image/svg+xml"
                  ></object>
                  */}
                </button>
                &nbsp;&nbsp;
                <span>Export Data from your AlphaCX account</span>
              </div>
            </div>
          </div>
        ) : activeTab === "branding" ? (
          <div>
            <Branding />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AccountSettings;
