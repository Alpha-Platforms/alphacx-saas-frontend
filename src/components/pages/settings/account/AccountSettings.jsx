/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable camelcase */
/* eslint-disable func-names */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-lonely-if */
// @ts-nocheck
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
import { NotificationManager } from 'react-notifications';
import MoonLoader from 'react-spinners/MoonLoader';
import RSelect from 'react-select';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/css';
import { timezones } from '../../../shared/timezones';
import { languages } from '../../../shared/languages';
import { countries } from '../../../shared/countries';
import { httpGet, httpPatch } from '../../../../helpers/httpMethods';
import ImageDefault from '../../../../assets/svgicons/image-default.svg';
import './AccountSettings.scss';
import { config } from '../../../../config/keys';
import { setTenantInfo } from '../../../../reduxstore/actions/tenantInfoActions';
import { brandKit } from '../../../../helper';

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
        timezone: '',
        language: '',
        two_factor: false,
        branding: {
            appColor: '',
            kbHeroColor: '',
        },
    });
    const [, forceUpdate] = useState(false);
    const dispatch = useDispatch();

    const appIconWrapper = useRef(null);
    const appLogoWrapper = useRef(null);
    const appIconFile = useRef(null);
    const appLogoFile = useRef(null);

    const [, setDomain] = useState('');

    const [appIcon, setAppIcon] = useState({
        msg: 'Click or drag file here to add',
        errorMsg: '',
        blob: '',
        image: '',
        imageFile: null,
    });

    const [appLogo, setAppLogo] = useState({
        msg: 'Click or drag file here to add',
        errorMsg: '',
        blob: '',
        image: '',
        imageFile: null,
    });

    const simpleValidator = useRef(
        new SimpleReactValidator({
            element: (message) => <div className="formErrorMsg">{message}</div>,
            validators: {
                no_file_select_err: {
                    message: 'Error',
                    rule: (_, params) => {
                        return !params[0];
                    },
                    messageReplace: (_, params) => params[0],
                },
            },
            // autoForceUpdate: true,
        }),
    );

    const getUserInfo = async () => {
        setAccountLoading(true);
        const gottenDomain = window.localStorage.getItem('domain');
        const res = await httpGet(`auth/tenant-info/${gottenDomain}`);
        setAccountLoading(false);

        if (res?.status === 'success') {
            setOrganisation((prev) => ({
                ...prev,
                ...res?.data,
                branding: res?.data?.branding || {
                    appColor: res?.data?.branding?.appColor || '',
                    kbHeroColor: res?.data?.branding?.kbHeroColor || '',
                },
            }));
            setAppIcon((prev) => ({
                ...prev,
                image: res?.data?.branding?.appIcon || '',
            }));
            setAppLogo((prev) => ({
                ...prev,
                image: res?.data?.branding?.appLogo || '',
            }));
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
        if (['appColor', 'kbHeroColor'].includes(name)) {
            return setOrganisation((prev) => ({
                ...prev,
                branding: {
                    ...prev?.branding,
                    [name]: value,
                },
            }));
        }
        return setOrganisation((prev) => ({ ...prev, [name]: value }));
    };

    const handleRSChange = ({ value }, { name }) => {
        setOrganisation((prev) => ({ ...prev, [name]: value }));
    };

    const updateUserInfo = async (e) => {
        if (!simpleValidator.current.allValid()) {
            // show all errors if exist
            simpleValidator.current.showMessages();
            return forceUpdate((prev) => !prev);
        }
        e.preventDefault();
        setAccountLoading(true);

        const { company_name, email, phone_number, address, website, profile, region, language, timezone, branding } =
            organisation;

        const gottenDomain = window.localStorage.getItem('domain');

        if (appIcon.imageFile || appLogo.imageFile) {
            const uploaders = [appIcon.imageFile, appLogo.imageFile]
                .filter((x) => x)
                .map((file) => {
                    const data = new FormData();
                    data.append('file', file);
                    data.append('upload_preset', config.cloudinaryUploadPreset);
                    data.append('cloud_name', config.cloudinaryCloudName);
                    return axios.post(`${config.cloudinaryBaseUrl}/image/upload`, data);
                });
            return axios
                .all(uploaders)
                .then(
                    axios.spread(async (...responses) => {
                        const res1 = responses[0];
                        const res2 = responses[1];
                        const appIconImg = res1 && appIcon.imageFile ? res1?.data?.url : appIcon.image;
                        const appLogoImg =
                            res2 && appLogo.imageFile && uploaders.length === 2
                                ? res2?.data?.url
                                : res1 && appLogo.imageFile && uploaders.length === 1
                                ? res1?.data?.url
                                : appLogo.image;
                        const payload = {
                            phone_number,
                            company_name,
                            profile,
                            email,
                            address,
                            website,
                            language,
                            region,
                            timezone,
                            branding: {
                                appIcon: appIconImg,
                                appLogo: appLogoImg,
                                appColor: branding?.appColor,
                                kbHeroColor: branding?.kbHeroColor,
                            },
                        };
                        const res = await httpPatch(`auth/tenant-info/${gottenDomain}`, payload);

                        setAccountLoading(false);

                        if (res?.status === 'success') {
                            setOrganisation((prev) => ({ ...prev, ...res?.data }));
                            dispatch(setTenantInfo(res?.data));
                            setAppIcon((prev) => ({
                                ...prev,
                                msg: 'Click or drag file here to add',
                                errorMsg: '',
                                blob: '',
                                image: appIconImg,
                                imageFile: null,
                            }));
                            setAppLogo((prev) => ({
                                ...prev,
                                msg: 'Click or drag file here to add',
                                errorMsg: '',
                                blob: '',
                                image: appLogoImg,

                                imageFile: null,
                            }));
                            NotificationManager.success(res?.success, 'Success', 4000);
                        } else {
                            NotificationManager.error(res?.er?.message, 'Error', 4000);
                        }
                    }),
                )
                .catch((errors) => {
                    NotificationManager.error('', 'Failed', 4000);
                    // eslint-disable-next-line no-console
                    console.log('%cerror errors line:160 ', 'color: red; display: block; width: 100%;', errors);
                });
        }

        const payload = {
            phoneNumber: phone_number,
            companyName: company_name,
            profile,
            email,
            address,
            website,
            language,
            region,
            timezone,
            branding: {
                appIcon: appIcon.image,
                appLogo: appLogo.image,
                appColor: branding?.appColor,
                kbHeroColor: branding?.kbHeroColor,
            },
        };

        const res = await httpPatch(`auth/tenant-info/${gottenDomain}`, payload);

        setAccountLoading(false);

        if (res?.status === 'success') {
            setOrganisation((prev) => ({ ...prev, ...res?.data }));
            dispatch(setTenantInfo(res?.data));
            return NotificationManager.success(res?.success, 'Success', 4000);
        }
        return NotificationManager.error(res?.er?.message, 'Error', 4000);
    };

    const triggerFileSelect = (fileRef) => {
        fileRef?.current?.click();
    };

    // {zone.offset > 0 ? `GMT +${zone.offset}`  : zone.offset < 0  ? `GMT ${zone.offset}`  : `GMT`}

    const tzOffsetter = (tz) => {
        return tz > 0 ? `GMT +${tz}` : tz < 0 ? `GMT ${tz}` : `GMT`;
    };

    const clearSelectedImage = (type) => {
        type === 'app-icon'
            ? setAppIcon((prev) => ({
                  ...prev,
                  msg: 'Click or drag file here to add',
                  errorMsg: '',
                  blob: '',
                  image: '',
                  imageFile: null,
              }))
            : type === 'app-logo' &&
              setAppLogo((prev) => ({
                  ...prev,
                  msg: 'Click or drag file here to add',
                  errorMsg: '',
                  blob: '',
                  image: '',
                  imageFile: null,
              }));
    };

    const clearSelectedBrandColor = (type) => {
        type === 'kbHeroColor'
            ? setOrganisation((prev) => ({ ...prev, branding: { ...prev.branding, kbHeroColor: '' } }))
            : type === 'appColor' &&
              setOrganisation((prev) => ({ ...prev, branding: { ...prev.branding, appColor: '' } }));
    };

    const handleImgSelect = function (files, type) {
        // create a store for the current dimension and default info
        const maxReqDimensions = {
            width: 1500,
            height: 1500,
        };

        if (!files.length) {
            // No file is selected
            type === 'app-icon'
                ? setAppIcon((prev) => ({
                      ...prev,
                      msg: 'Click or drag file here to add',
                      errorMsg: '',
                      blob: '',
                      image: '',
                      imageFile: null,
                  }))
                : type === 'app-logo' &&
                  setAppLogo((prev) => ({
                      ...prev,
                      msg: 'Click or drag file here to add',
                      errorMsg: '',
                      blob: '',
                      image: '',
                      imageFile: null,
                  }));
        } else {
            // file selected

            // check if selected file is an image
            if (files[0].type.indexOf('image/') === -1) {
                // Selected file is not an image
                type === 'app-icon'
                    ? setAppIcon((prev) => ({
                          ...prev,
                          msg: 'Click or drag file here to add',
                          errorMsg: 'Selected file is not an image',
                          blob: '',
                          image: '',
                          imageFile: null,
                      }))
                    : type === 'app-logo' &&
                      setAppLogo((prev) => ({
                          ...prev,
                          msg: 'Click or drag file here to add',
                          errorMsg: 'Selected file is not an image',
                          blob: '',
                          image: '',
                          imageFile: null,
                      }));
                simpleValidator.current.showMessageFor(type);
                forceUpdate((prev) => !prev);
            } else {
                // Selected file is an image
                /*
                 * read the selected image to get the file width and height
                 */
                // create a new file reader object
                const reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.onload = function () {
                    // when reader has loaded

                    // create a new image object
                    const currentImage = new Image();
                    // set the source of the image to the base64 string from the file reader
                    currentImage.src = this.result;

                    currentImage.onload = function () {
                        const [currentImageHeight, currentImageWidth] = [this.height, this.width];

                        if (
                            currentImageWidth > maxReqDimensions.width ||
                            currentImageHeight > maxReqDimensions.height
                        ) {
                            // current selected image dimesions are not acceptable
                            type === 'app-icon'
                                ? setAppIcon((prev) => ({
                                      ...prev,
                                      msg: 'Click or drag file here to add',
                                      errorMsg: `Selected image should have max dimension of ${maxReqDimensions.width}x${maxReqDimensions.height}`,
                                      blob: '',
                                      image: '',
                                      imageFile: null,
                                  }))
                                : type === 'app-logo' &&
                                  setAppLogo((prev) => ({
                                      ...prev,
                                      msg: 'Click or drag file here to add',
                                      errorMsg: `Selected image should have max dimension of ${maxReqDimensions.width}x${maxReqDimensions.height}`,
                                      blob: '',
                                      image: '',
                                      imageFile: null,
                                  }));
                            simpleValidator.current.showMessageFor(type);
                            forceUpdate((prev) => !prev);
                        } else {
                            // current selected image dimensions are acceptable
                            const fileName = files[0].name;
                            const fileBlob = URL.createObjectURL(files[0]);
                            type === 'app-icon'
                                ? setAppIcon((prev) => ({
                                      ...prev,
                                      msg: fileName,
                                      errorMsg: '',
                                      blob: fileBlob,
                                      image: '',
                                      imageFile: files[0],
                                  }))
                                : type === 'app-logo' &&
                                  setAppLogo((prev) => ({
                                      ...prev,
                                      msg: fileName,
                                      errorMsg: '',
                                      blob: fileBlob,
                                      image: '',
                                      imageFile: files[0],
                                  }));
                            /* 
                            when the image with the blob loads call the below method
                            URL.revokeObjectURL(this.src);  where this.src is the blob created
                            */
                        }
                    };
                };
            }
        }
    };

    const addDropSignal = (elemRef) => {
        elemRef?.current?.classList.add('drop-signal');
    };

    const removeDropSignal = (elemRef) => {
        elemRef?.current?.classList.remove('drop-signal');
    };

    const handleImageDrop = (e, fileRef, type, elemRef) => {
        e.preventDefault();
        removeDropSignal(elemRef);
        if (e?.dataTransfer?.files && fileRef) {
            // eslint-disable-next-line no-param-reassign
            fileRef.current.files = e.dataTransfer.files;
            handleImgSelect(e.dataTransfer.files, type);
        }
    };

    return (
        <div className="account-settings">
            {accountLoading && (
                <div className={`cust-table-loader ${accountLoading && 'add-loader-opacity'}`}>
                    <MoonLoader loading={accountLoading} color={brandKit({ bgCol: 0 })?.backgroundColor} size={30} />
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
                                    name="timezone"
                                    id="account-timezone"
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={organisation.timezone}
                                    onChange={handleChange}
                                >
                                    <option>Select Time Zone</option>
                                    {timezones.map((zone, i) => (
                                        <option key={i} value={`${zone.value} ${tzOffsetter(zone.offset)}`}>
                                            {`${zone.value} ${tzOffsetter(zone.offset)}`}
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
                        {/* BRANDING FIELDS TURNED ON */}
                        {true && (
                            <>
                                <div className="row">
                                    <div className="mb-3 col-6">
                                        <label className="form-label">App Icon</label>
                                        <div
                                            ref={appIconWrapper}
                                            onDragOver={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                addDropSignal(appIconWrapper);
                                            }}
                                            onDragLeave={() => removeDropSignal(appIconWrapper)}
                                            onDragEnd={() => removeDropSignal(appIconWrapper)}
                                            onDrop={(e) => handleImageDrop(e, appIconFile, 'app-icon', appIconWrapper)}
                                            className="d-grid align-items-center border rounded-3 p-2 act-set-img-upload-wrapper position-relative"
                                        >
                                            {(appIcon.errorMsg ||
                                                appIcon.blob ||
                                                appIcon.image ||
                                                appIcon.imageFile) && (
                                                <button
                                                    type="button"
                                                    className="clear-upl-img"
                                                    onClick={() => clearSelectedImage('app-icon')}
                                                >
                                                    ×
                                                </button>
                                            )}
                                            <div
                                                onClick={() => triggerFileSelect(appIconFile)}
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
                                                    {appIcon.blob || appIcon.image ? (
                                                        <img
                                                            className="avatarImage"
                                                            src={appIcon.blob || appIcon.image}
                                                            alt=""
                                                            onLoad={() =>
                                                                appIcon.blob && URL.revokeObjectURL(appIcon.blob)
                                                            }
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
                                            <div
                                                className="h-100 d-inline-flex justify-content-center align-items-center"
                                                onClick={() => triggerFileSelect(appIconFile)}
                                            >
                                                <input
                                                    type="file"
                                                    name="app-icon"
                                                    id="app-icon"
                                                    ref={appIconFile}
                                                    onChange={(e) => handleImgSelect(e.target.files, 'app-icon')}
                                                />
                                                <p className="mb-0 user-select-none">{appIcon.msg}</p>
                                            </div>
                                        </div>
                                        <span>
                                            <small>Max dimension: 1500 x 1500</small>
                                        </span>
                                        {
                                            /* simple validation */
                                            simpleValidator.current.message(
                                                'app-icon',
                                                appIcon,
                                                `no_file_select_err:${appIcon?.errorMsg}`,
                                            )
                                        }
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label className="form-label">App Logo</label>
                                        <div
                                            ref={appLogoWrapper}
                                            onDragOver={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                addDropSignal(appLogoWrapper);
                                            }}
                                            onDragLeave={() => removeDropSignal(appLogoWrapper)}
                                            onDragEnd={() => removeDropSignal(appLogoWrapper)}
                                            onDrop={(e) => handleImageDrop(e, appLogoFile, 'app-logo', appLogoWrapper)}
                                            className="d-grid align-items-center border rounded-3 p-2 act-set-img-upload-wrapper position-relative drag-zone"
                                        >
                                            {(appLogo.errorMsg ||
                                                appLogo.blob ||
                                                appLogo.image ||
                                                appLogo.imageFile) && (
                                                <button
                                                    type="button"
                                                    className="clear-upl-img"
                                                    onClick={() => clearSelectedImage('app-logo')}
                                                >
                                                    ×
                                                </button>
                                            )}
                                            <div
                                                onClick={() => triggerFileSelect(appLogoFile)}
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
                                                    {appLogo.blob || appLogo.image ? (
                                                        <img
                                                            className="avatarImage"
                                                            src={appLogo.blob || appLogo.image}
                                                            alt=""
                                                            onLoad={() =>
                                                                appLogo.blob && URL.revokeObjectURL(appLogo.blob)
                                                            }
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
                                            <div
                                                className="h-100 d-inline-flex justify-content-center align-items-center"
                                                onClick={() => triggerFileSelect(appLogoFile)}
                                            >
                                                <input
                                                    type="file"
                                                    name="app-logo"
                                                    id="app-logo"
                                                    ref={appLogoFile}
                                                    onChange={(e) => handleImgSelect(e.target.files, 'app-logo')}
                                                />
                                                <p className="mb-0 user-select-none">{appLogo.msg}</p>
                                            </div>
                                        </div>
                                        <span>
                                            <small>Max dimension: 1500 x 1500</small>
                                        </span>
                                        {
                                            /* simple validation */
                                            simpleValidator.current.message(
                                                'app-logo',
                                                appLogo,
                                                `no_file_select_err:${appLogo?.errorMsg}`,
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-6 mb-3">
                                        <label className="f-14 mb-1">App Color</label>
                                        <div className="d-flex border justify-content-between align-items-center p-2 position-relative">
                                            {organisation?.branding?.appColor && (
                                                <button
                                                    type="button"
                                                    className="clear-branding-color-btn"
                                                    onClick={() => clearSelectedBrandColor('appColor')}
                                                >
                                                    ×
                                                </button>
                                            )}
                                            <input
                                                value={
                                                    organisation?.branding?.appColor ||
                                                    brandKit({ col: 0, default: true })?.color
                                                }
                                                name="appColor"
                                                onChange={handleChange}
                                                className="border form-control-plaintext form-control me-1 px-1 rounded"
                                            />
                                            <input
                                                type="color"
                                                value={
                                                    organisation?.branding?.appColor ||
                                                    brandKit({ col: 0, default: true })?.color
                                                }
                                                name="appColor"
                                                onChange={handleChange}
                                                className="colorThemeInput ms-1"
                                                id="colorThemeInput"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-6 mb-3">
                                        <label className="f-14 mb-1">Knowledge Base Hero Color</label>
                                        <div className="d-flex border justify-content-between align-items-center p-2 position-relative">
                                            {organisation?.branding?.kbHeroColor && (
                                                <button
                                                    type="button"
                                                    className="clear-branding-color-btn"
                                                    onClick={() => clearSelectedBrandColor('kbHeroColor')}
                                                >
                                                    ×
                                                </button>
                                            )}
                                            <input
                                                value={
                                                    organisation?.branding?.kbHeroColor ||
                                                    brandKit({ col: 0, default: true })?.color
                                                }
                                                name="kbHeroColor"
                                                onChange={handleChange}
                                                className="border form-control-plaintext form-control me-1 px-1 rounded"
                                            />
                                            <input
                                                type="color"
                                                value={
                                                    organisation?.branding?.kbHeroColor ||
                                                    brandKit({ col: 0, default: true })?.color
                                                }
                                                name="kbHeroColor"
                                                onChange={handleChange}
                                                className="colorThemeInput ms-1"
                                                id="colorThemeInput"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="text-end col-md-8 mt-4 mb-4 pt-2 pb-3">
                        <button
                            type="button"
                            className={`btn btn-sm text-white px-3 ${css({
                                ...brandKit({ bgCol: 0 }),
                                color: 'white',
                                '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                            })}`}
                            onClick={updateUserInfo}
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
