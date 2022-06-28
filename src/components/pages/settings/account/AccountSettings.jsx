/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import MoonLoader from 'react-spinners/MoonLoader';
import RSelect from 'react-select';
import { timezone } from '../../../shared/timezone';
import { languages } from '../../../shared/languages';
import { countries } from '../../../shared/countries';
import { httpGet, httpPatch } from '../../../../helpers/httpMethods';
import ImageDefault from '../../../../assets/svgicons/image-default.svg';
import './AccountSettings.scss';

function AccountSettings() {
    const [accountLoading, setAccountLoading] = useState(false);
    const [RSCountries, setRSCountries] = useState([]);
    const [RSLanguages, setRSLanguages] = useState([]);
    const [defaultCountry, setDefaultCountry] = useState([]);
    const [defaultLanguage, setDefaultLanguage] = useState([]);
    const [organisation, setOrganisation] = useState({
        company_name: '',
        email: '',
        phone_number: '',
        address: '',
        domain: '',
        website: '',
        profile: '',
        region: '',
        language: '',
        two_factor: false,
    });

    const [domain, setDomain] = useState('');

    const getUserInfo = async () => {
        setAccountLoading(true);
        const gottenDomain = window.localStorage.getItem('domain');
        const res = await httpGet(`auth/tenant-info/${gottenDomain}`);
        setAccountLoading(false);

        if (res?.status === 'success') {
            setOrganisation((prev) => ({ ...prev, ...res?.data }));
        }
    };

    useEffect(() => {
        getUserInfo();
        setRSCountries(() => countries.map((item) => ({ value: item.name, label: item.name })));
        setRSLanguages(() => languages.map((item) => ({ value: item.name, label: item.name })));
        setDomain(window.localStorage.getItem('domain'));
    }, []);

    useEffect(() => {
        setDefaultCountry(() => RSCountries.filter((item) => item.value === organisation.region));
        setDefaultLanguage(() => RSLanguages.filter((item) => item.value === organisation.language));
    }, [RSCountries, RSLanguages, organisation]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrganisation((prev) => ({ ...prev, [name]: value }));
    };

    const handleRSChange = ({ value }, { name }) => {
        setOrganisation((prev) => ({ ...prev, [name]: value }));
    };

    const updateUserInfo = async (e) => {
        e.preventDefault();
        setAccountLoading(true);

        const { company_name, email, phone_number, address, website, profile, region, language } = organisation;
        const payload = {
            phoneNumber: phone_number,
            companyName: company_name,
            profile,
            email,
            address,
            website,
            language,
            region,
        };

        const gottenDomain = window.localStorage.getItem('domain');
        const res = await httpPatch(`auth/tenant-info/${gottenDomain}`, payload);

        setAccountLoading(false);

        if (res?.status === 'success') {
            setOrganisation((prev) => ({ ...prev, ...res?.data }));
            return NotificationManager.success(res?.success, 'Success', 4000);
        }
        return NotificationManager.error(res?.er?.message, 'Error', 4000);
    };

    return (
        <div className="account-settings">
            {accountLoading && (
                <div className={`cust-table-loader ${accountLoading && 'add-loader-opacity'}`}>
                    <MoonLoader loading={accountLoading} color="#006298" size={30} />
                </div>
            )}

            <div className="card card-body bg-white border-0">
                {/* <div id="mainContentHeader" className="breadcrumb">
          <h6 className="text-muted f-14">
            <Link to="/settings">
              <span className="text-custom">Settings</span>
            </Link>{" "}
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            <span>Account Settings</span>
          </h6>
        </div> */}

                <div
                    className="tab-pane"
                    id="account-settings-view"
                    role="tabpanel"
                    aria-labelledby="pills-account-tab"
                >
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
                                name="company_name"
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
                                disabled
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
                            />
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
                                    disabled
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
                                    name="phone_number"
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
                                            {zone.value}(
                                            {zone.offset > 0
                                                ? `GMT +${zone.offset}`
                                                : zone.offset < 0
                                                ? `GMT ${zone.offset}`
                                                : `GMT`}
                                            )
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3 col-6">
                                <label htmlFor="language" className="form-label">
                                    Language
                                </label>
                                <RSelect
                                    name="language"
                                    options={RSLanguages}
                                    onChange={handleRSChange}
                                    value={defaultLanguage}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="region" className="form-label">
                                Country/Region
                            </label>
                            <RSelect
                                name="region"
                                options={RSCountries}
                                onChange={handleRSChange}
                                value={defaultCountry}
                            />
                        </div>
                        {/* Live */}
                        <div className="row">
                            <div className="mb-3 col-6">
                                <label className="form-label">App Icon</label>
                                <div className="d-grid mb-4 align-items-center border rounded-3 p-2 act-set-img-upload-wrapper position-relative">
                                    <button type="button" className="clear-upl-img">
                                        ×
                                    </button>
                                    <div
                                        id=""
                                        style={{
                                            width: '6rem',
                                            height: '6rem',
                                            border: '1px dashed #dee2e6',
                                        }}
                                        className="
                                            rounded-3
                                            d-flex
                                            justify-content-center
                                            align-items-center
                                            "
                                    >
                                        <div
                                            style={{
                                                justifyContent: 'center',
                                                height: '100%',
                                                width: '100%',
                                            }}
                                            className="ms-0 d-flex justify-content-between align-items-center"
                                        >
                                            {false ? (
                                                <img
                                                    className="avatarImage"
                                                    src=""
                                                    alt=""
                                                    // onLoad={() => uploadInfo.blob && URL.revokeObjectURL(uploadInfo.blob)}
                                                    style={{
                                                        maxWidth: '100%',
                                                        maxHeight: '100%',
                                                    }}
                                                />
                                            ) : (
                                                <img
                                                    src={ImageDefault}
                                                    alt=""
                                                    style={{
                                                        paddingLeft: '2.1rem',
                                                    }}
                                                    className="pe-none"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="h-100 d-inline-flex justify-content-center align-items-center">
                                        <input
                                            type="file"
                                            name="accountLogo"
                                            id="accountLogo"
                                            onChange={() => console.log('love')}
                                        />
                                        <p className="mb-0">Add file or drag file here</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 col-6">
                                <label className="form-label">App Logo</label>
                                <div className="d-grid mb-4 align-items-center border rounded-3 p-2 act-set-img-upload-wrapper position-relative">
                                    <button type="button" className="clear-upl-img">
                                        ×
                                    </button>
                                    <div
                                        id=""
                                        style={{
                                            width: '6rem',
                                            height: '6rem',
                                            border: '1px dashed #dee2e6',
                                        }}
                                        className="
                                            rounded-3
                                            d-flex
                                            justify-content-center
                                            align-items-center
                                            "
                                    >
                                        <div
                                            style={{
                                                justifyContent: 'center',
                                                height: '100%',
                                                width: '100%',
                                            }}
                                            className="ms-0 d-flex justify-content-between align-items-center"
                                        >
                                            {false ? (
                                                <img
                                                    className="avatarImage"
                                                    src=""
                                                    alt=""
                                                    // onLoad={() => uploadInfo.blob && URL.revokeObjectURL(uploadInfo.blob)}
                                                    style={{
                                                        maxWidth: '100%',
                                                        maxHeight: '100%',
                                                    }}
                                                />
                                            ) : (
                                                <img
                                                    src={ImageDefault}
                                                    alt=""
                                                    style={{
                                                        paddingLeft: '2.1rem',
                                                    }}
                                                    className="pe-none"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="h-100 d-inline-flex justify-content-center align-items-center">
                                        <input
                                            type="file"
                                            name="accountLogo"
                                            id="accountLogo"
                                            onChange={() => console.log('love')}
                                        />
                                        <p className="mb-0">Add file or drag file here</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END */}
                    </div>
                    <div className="text-end col-md-8 mt-4 mb-4 pt-2 pb-3">
                        <button
                            type="button"
                            className="btn btn-sm bg-at-blue-light text-white px-4"
                            onClick={updateUserInfo}
                            // disabled={true}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountSettings;
