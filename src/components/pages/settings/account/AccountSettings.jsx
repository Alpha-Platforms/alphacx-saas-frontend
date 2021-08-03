import React from "react";
import "./AccountSettings.scss";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import { useState } from "react";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("personal");
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
  return (
    <div className="account-settings">
      <div id="mainContent" class="container">
        <div class="card card-body bg-white border-0 p-0 mt-4">
          <div id="mainContentHeader">
            <h6 class="text-muted f-14 my-4">
              Settings <img src={RightArrow} class="img-fluid mx-2 me-3" />{" "}
              <span class="text-custom">Forms</span>
            </h6>
            <div id="pageTabs" class="mb-5">
              <ul class="nav nav-pills" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class={` ${
                      activeTab === "personal" && "active"
                    } nav-link text-muted px-0 me-5`}
                    id="pills-personal-tab"
                    onClick={() => setActiveTab("personal")}
                  >
                    Personal Information
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class={`${
                      activeTab === "account" && "active"
                    } nav-link text-muted px-0 me-5`}
                    id="pills-account-tab"
                    onClick={() => setActiveTab("account")}
                  >
                    Account Settings
                  </button>
                </li>
                {/* <li class="nav-item" role="presentation">
                  <button
                    class="nav-link text-muted px-0 me-5"
                    id="pills-branding-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#branding-view"
                    type="button"
                    role="tab"
                    aria-controls="branding-view"
                    aria-selected="false"
                  >
                    Branding
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link text-muted px-0"
                    id="pills-subcription-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#subscription-license-view"
                    type="button"
                    role="tab"
                    aria-controls="subscription-license-view"
                    aria-selected="false"
                  >
                    Subscription and License
                  </button>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        {activeTab === "personal" ? (
          <div class="tab-content" id="pills-tabContent">
            {/*
          <!--* Personal Information View -->
          */}
            <div
              class="tab-pane active show fade w-75"
              id="personal-information-view"
              role="tabpanel"
              aria-labelledby="pills-personal-tab"
            >
              <div>
                <h3 class="fs-6 text-black">Personal Information Settings</h3>
              </div>
              <div class="mb-5 mt-4">
                <div class="d-flex mb-3">
                  <div class="me-2 w-100">
                    <label for="first-name" class="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      name="first_name"
                      class="form-control"
                      value={personalInformation.first_name || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="w-100">
                    <label class="form-label" for="last-name">
                      Last Name
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      id="last-name"
                      name="last_name"
                      value={personalInformation.last_name || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label" for="first-name">
                    Email
                  </label>
                  <input
                    class="form-control"
                    type="text"
                    id="email"
                    name="email"
                    value={personalInformation.email || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/*
            <!-- * upload photo section -->
            */}
              <div class="d-flex mb-5">
                <div
                  id="uploadPersonalPhotoInputImgPreview"
                  style={{ width: "6rem", height: "6rem" }}
                  class="
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
                    class="ms-0 d-flex justify-content-between align-items-center"
                  >
                    {personalInformation?.avatar?.blob && (
                      <img
                        className="avatarImage"
                        src={personalInformation?.avatar?.blob}
                        alt=""
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label
                    for="uploadPersonalPhotoInput"
                    class="btn btn-sm bg-at-blue-light px-4 py-1 mb-2 mt-1"
                  >
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    name="uploadPersonalPhotoInput"
                    id="uploadPersonalPhotoInput"
                    onChange={handleAvatar}
                  />
                  <p class="mb-0 text-at-red">
                    <small id="uploadPersonalPhotoInputError"></small>
                  </p>
                  <p class="uploadInfoWrapper">
                    <small id="uploadPersonalPhotoInputInfo">
                      Upload personal photo, uploaded file must be an image.
                    </small>
                  </p>
                </div>
              </div>
              {/*
            <!-- * change password -->
            */}
              <div class="mb-5">
                <label class="form-label" for="change-password">
                  Change Password
                </label>
                <input
                  class="form-control"
                  type="password"
                  name="change_password"
                  id="change-password"
                  value={personalInformation.change_password || ""}
                  onChange={handleChange}
                />
                <button class="btn btn-sm bg-at-blue-light px-3 py-1 mt-3">
                  Change Password
                </button>
              </div>
              {/*
            <!-- * Notifications -->
            */}
              <div class="mb-3">
                <label class="d-block">Notifications</label>
                <label>
                  <small>Disable notifications</small>
                </label>
                <div class="mt-2 d-flex">
                  <div class="border border-1 d-inline-block px-4 py-2 rounded-3">
                    <div class="form-check form-switch d-flex align-items-center">
                      <input
                        class="form-check-input"
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
                        class="form-check-label ms-3"
                        for="flexSwitchCheckDefault"
                        style={{ width: 20 }}
                      >
                        {personalInformation.notifications ? "Yes" : "No"}
                      </label>
                    </div>
                  </div>
                  <div class="ms-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </div>
              </div>
              {/* <!-- * Security and Privacy --> */}
              <div class="mb-5">
                <label class="d-block" for="">
                  Security and Privacy (MFA)
                </label>
                <div class="mt-2 border border-1 d-inline-block px-4 py-2 rounded-3">
                  <div class="form-check form-switch d-flex align-items-center">
                    <input
                      class="form-check-input"
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
                      class="form-check-label ms-3"
                      for="security-switch"
                      style={{ width: 20 }}
                    >
                      {personalInformation.security ? "Yes" : "No"}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/*
          <!--* End of Personal Information View -->
          */}
          </div>
        ) : (
          <div
            class="tab-pane"
            id="account-settings-view"
            role="tabpanel"
            aria-labelledby="pills-account-tab"
          >
            {/* <!--* Start of Account Settings View --> */}
            <div class="d-flex justify-content-between">
              <h3 class="fs-6 text-black">Account Settings</h3>
              <button
                type="button"
                class="btn btn-sm bg-at-blue-light text-white px-4"
              >
                Save Changes
              </button>
            </div>

            <div class="mt-4 mb-5 w-75">
              <div class="mb-3">
                <label for="organisation-name" class="form-label">
                  Organisation Name
                </label>
                <input
                  type="text"
                  name="organisation_name"
                  class="form-control"
                  id="organisation-name"
                  value={accountSettings.organisation_name || ""}
                  onChange={handleChange}
                />
              </div>
              <div class="mb-3">
                <label for="domain-field" class="form-label">
                  Domain
                </label>
                <input
                  name="domain_field"
                  type="text"
                  class="form-control"
                  id="domain-field"
                  value={accountSettings.domain_field || ""}
                  onChange={handleChange}
                />
              </div>

              <div class="mb-3">
                <label for="organisation-profile" class="form-label">
                  Organisation Profile
                </label>
                <textarea
                  name="organisation_profile"
                  class="form-control"
                  id="organisation-profile"
                  value={accountSettings.organisation_profile || ""}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div class="row">
                <div class="mb-3 col-6">
                  <label for="account-email" class="form-label">
                    Email
                  </label>
                  <input
                    name="account_email"
                    type="email"
                    class="form-control"
                    id="account-email"
                    value={accountSettings.account_email || ""}
                    onChange={handleChange}
                  />
                </div>

                <div class="mb-3 col-6">
                  <label for="account-website" class="form-label">
                    Website
                  </label>
                  <input
                    name="account_website"
                    type="text"
                    class="form-control"
                    id="account-website"
                    value={accountSettings.account_website || ""}
                    onChange={handleChange}
                  />
                </div>

                <div class="mb-3 col-6">
                  <label for="account-address" class="form-label">
                    Address
                  </label>
                  <input
                    name="account_address"
                    type="text"
                    class="form-control"
                    id="account-address"
                    value={accountSettings.account_address || ""}
                    onChange={handleChange}
                  />
                </div>

                <div class="mb-3 col-6">
                  <label for="account-phone" class="form-label">
                    Phone
                  </label>
                  <input
                    name="account_phone"
                    type="tel"
                    class="form-control"
                    id="account-phone"
                    value={accountSettings.account_phone || ""}
                    onChange={handleChange}
                  />
                </div>

                <div class="mb-3 col-6">
                  <label for="account-timezone" class="form-label">
                    Timezone
                  </label>
                  <select
                    name="account-timezone"
                    id="account-timezone"
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected></option>
                    <option value="--">--</option>
                  </select>
                </div>

                <div class="mb-3 col-6">
                  <label for="account-language" class="form-label">
                    Language
                  </label>
                  <select
                    name="account-language"
                    id="account-language"
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected></option>
                    <option value="--">--</option>
                  </select>
                </div>
              </div>

              <div class="mb-3">
                <label for="account-country" class="form-label">
                  Country
                </label>
                <select
                  name="account-country"
                  id="account-country"
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option selected></option>
                  <option value="--">--</option>
                </select>
              </div>

              <div class="row">
                <div class="mb-3 col-6">
                  <label for="work-days" class="form-label">
                    Work Days
                  </label>
                  <select
                    name="work-days"
                    id="work-days"
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected></option>
                    <option value="--">--</option>
                  </select>
                </div>

                <div class="mb-3 col-6">
                  <label for="working-hours-from" class="form-label">
                    Working Hours
                  </label>
                  <div class="d-flex align-items-center">
                    <select
                      name="work-hour-start"
                      id="working-hours-from"
                      //   class="form-select"
                      class="border border-1 time-form-control"
                      aria-label="Default select example"
                      style={{ width: 100, paddingRight: 20 }}
                    >
                      <option selected>09:00</option>
                    </select>
                    <div className="separator" />
                    <select
                      name="work-hour-start"
                      id="working-hours-from"
                      //   class="form-select"
                      class="border border-1 time-form-control"
                      aria-label="Default select example"
                      style={{ width: 100, paddingRight: 20 }}
                    >
                      <option selected>15:00</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label class="d-block" for="">
                  Security and Privacy (2FA Settings)
                </label>
                <div>
                  <div
                    class="
                      mt-2
                      border border-1
                      d-inline-block
                      px-4
                      py-2
                      rounded-3
                    "
                  >
                    <div
                      class="form-check form-switch d-flex align-items-center"
                      style={{ width: 70 }}
                    >
                      <input
                        class="form-check-input"
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
                        class="form-check-label ms-3"
                        for="security-switch"
                      >
                        {accountSettings.two_factor ? "Yes" : "No"}
                      </label>
                    </div>
                  </div>
                  <div class="d-inline-block">
                    &nbsp;&nbsp; Enable Two Factor Authentication
                  </div>
                </div>
              </div>

              <div>
                <label class="d-block mb-2">Export Data</label>
                <button
                  class="btn btn-sm bg-at-blue-light px-4 py-1"
                  style={{ width: 120 }}
                >
                  Export{" "}
                  {/*
                  <object
                    data="../assets/alphatickets/icons/white-upload.svg"
                    class="sm-align"
                    type="image/svg+xml"
                  ></object>
                  */}
                </button>
                &nbsp;&nbsp;
                <span>Export Data from your AlphaCX account</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
