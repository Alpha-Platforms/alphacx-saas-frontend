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
import { httpGet, httpGetMain, httpPatch } from "../../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
import ScaleLoader from "react-spinners/ScaleLoader";

const AccountSettings = () => {

  const [accountLoading, setAccountLoading] = useState(false);
  const [personalInformation, setPersonalInformation] = useState({
    avatar: {},
    notifications: false,
    security: false,
  });

  const [organisation, setOrganisation] = useState({
    company_name: "",
    email: "",
    phone_number: "",
    address: "",
    domain: "",
    website: "",
    profile: "",
    region: "",
    language: "",
    two_factor: false
  });


  useEffect(() => {
    getUserInfo();
  }, []);


  useEffect(() => {
    //
  }, [organisation])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganisation(prev => ({...prev, [name]: value}));
  };


  // const handleAvatar = (e) => {
  //   e.preventDefault();
  //   const files = e.target.files;
  //   let avatarImage = URL.createObjectURL(files[0]);
  //   setPersonalInformation({
  //     ...personalInformation,
  //     avatar: { file: files[0], blob: avatarImage },
  //   });
  // };


  const getUserInfo = async () => {
    setAccountLoading(true);
    const res = await httpGet("auth/tenant-info/techpoint");
    setAccountLoading(false);

    if (res?.status === "success") {

      setOrganisation(prev => ({...prev, ...res?.data}))

    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  const updateUserInfo = async (e) => {
    e.preventDefault()
    setAccountLoading(true);

  

    const {company_name, email, phone_number, address, website, profile, region, language} = organisation
    const payload = {
      phoneNumber: phone_number,
      companyName: company_name,
      profile,
      email,
      address,
      website,
      language,
      region
    }

    const res = await httpPatch("auth/tenant-info/techpoint", organisation);

    setAccountLoading(false);

    if (res?.status == "success") {
      console.clear();
      console.log(res);
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };


  return (
    <div className="account-settings">

      {accountLoading && (
        <div
          className={`cust-table-loader ${accountLoading && "add-loader-opacity"}`}
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
            <span>Account Settings</span>
          </h6>
        </div>

        <div
          className="tab-pane"
          id="account-settings-view"
          role="tabpanel"
          aria-labelledby="pills-account-tab"
        >
          {/* <!--* Start of Account Settings View --> */}
          <div className="d-flex justify-content-between col-md-8">
            <h3 className="fs-6 text-black">Account Settings</h3>
          </div>

          
          <div className="mt-3 mb-3 col-md-8">
            <div className="mb-3">
              <label htmlFor="organisation-name" className="form-label">
                Organisation Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="organisation-name"
                value={organisation.company_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="domain-field" className="form-label">
                Domain
              </label>
              <input
                name="domain"
                type="text"
                className="form-control"
                id="domain-field"
                value={organisation.domain}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="organisation-profile" className="form-label">
                Organisation Profile
              </label>
              <textarea
                name="profile"
                className="form-control"
                id="organisation-profile"
                value={organisation.profile}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="row">
              <div className="mb-3 col-6">
                <label htmlFor="account-email" className="form-label">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="account-email"
                  value={organisation.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 col-6">
                <label htmlFor="account-website" className="form-label">
                  Website
                </label>
                <input
                  name="website"
                  type="text"
                  className="form-control"
                  id="account-website"
                  value={organisation.website}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 col-6">
                <label htmlFor="account-address" className="form-label">
                  Address
                </label>
                <input
                  name="address"
                  type="text"
                  className="form-control"
                  id="account-address"
                  value={organisation.address}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 col-6">
                <label htmlFor="account-phone" className="form-label">
                  Phone
                </label>
                <input
                  name="phone"
                  type="tel"
                  className="form-control"
                  id="account-phone"
                  value={organisation.phone_number}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 col-6">
                <label htmlFor="account-timezone" className="form-label">
                  Timezone
                </label>
                <select
                  name="account-timezone"
                  id="account-timezone"
                  className="form-select"
                  aria-label="Default select example"
                  value="W. Central Africa Standard Time"
                >
                  <option>Select time zone</option>
                  {timezone.map((zone, i) => (
                    <option key={i} value={zone.value}>
                      {zone.value}({zone.offset > 0 ? `GMT +${zone.offset}` : zone.offset < 0 ?  `GMT ${zone.offset}` : `GMT`})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3 col-6">
                <label htmlFor="account-language" className="form-label">
                  Language
                </label>
                <select
                  name="account-language"
                  id="account-language"
                  className="form-select"
                  aria-label="Default select example"
                  value="English"
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
              <label htmlFor="account-country" className="form-label">
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
            
          </div>
          <div className="text-end col-md-8 mt-4 mb-4 pt-2 pb-3">
            <button
                type="button"
                className="btn btn-sm bg-at-blue-light text-white px-4"
                onClick={updateUserInfo}
                disabled={true}
              >
                Save Changes
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;