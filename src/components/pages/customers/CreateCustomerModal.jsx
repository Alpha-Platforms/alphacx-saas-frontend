/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-lonely-if */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
// @ts-nocheck
import { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-responsive-modal';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import RSelect from 'react-select/creatable';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import { css } from '@emotion/css';
import {
    addCustomer,
    getPaginatedCustomers,
    updateCustomer,
    getCurrentCustomer,
    addNewCustomer,
} from '../../../reduxstore/actions/customerActions';
// import PinIcon from '../../../assets/icons/pin.svg';
import { countrycodes } from '../../shared/countrycodes';
// import ImageDefault from '../../../assets/svgicons/image-default.svg';
import { createTags } from '../../../reduxstore/actions/tagActions';
import { config } from '../../../config/keys';
import { brandKit } from '../../../helper';

function CreateCustomerModal({
    createModalShow,
    setCreateModalShow,
    getPaginatedCustomers,
    tags,
    isEditing,
    customerId,
    customers,
    updateCustomer,
    createTags,
    fromCustDetails,
    custId,
    getCurrentCustomer,
    addNewCustomer,
    custMeta,
    customField,
}) {
    const [selectedTags, setSelectedTags] = useState([]);
    const [modalInputs, setModalInputs] = useState({
        firstname: '',
        lastname: '',
        workphone: '',
        emailaddress: '',
        organisation: '',
        ccode: '+234',
    });
    const [creatingCust, setCreatingCust] = useState(false);
    const [editingCust, setEditingCust] = useState(false);
    const [showAddOption, setShowAddOption] = useState(false);
    const [uploadInfo, setUploadInfo] = useState({
        blob: null,
        msg: 'Upload logo for customer profile.',
        error: false,
        image: null,
        ownAvatar: '',
    });
    const [tagSelectLoading, setTagSelectLoading] = useState(false);
    const [, forceUpdate] = useState();

    const simpleValidator = useRef(
        new SimpleReactValidator({
            element: (message) => <div className="formErrorMsg">{message.replace(/(The|field)/gi, '').trim()}</div>,
        }),
    );

    const emailCustomFields = customField.customFields?.filter((item) => item?.field_type === 'email');

    const handleTagSelection = (tags) => {
        setSelectedTags(tags);
    };

    // update state with inputs from user
    const handleModalInput = (e) => {
        // get name and curent value of component
        const { name, value } = e.target;
        // set state of inputs in the modal
        setModalInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (createModalShow && isEditing && customerId) {
            // eslint-disable-next-line camelcase
            const { firstname, lastname, phone_number, email, tags, avatar } = customers.find(
                (cust) => cust.id === customerId,
            );
            setModalInputs((prev) => ({
                ...prev,
                firstname,
                lastname,
                workphone: phone_number,
                emailaddress: email,
            }));
            setSelectedTags(
                Array.isArray(tags) ? tags.map((tag) => ({ value: tag.toLowerCase(), label: tag.toLowerCase() })) : [],
            );
            setUploadInfo((prev) => ({ ...prev, ownAvatar: avatar }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createModalShow]);

    const handleCustomerCreation = async () => {
        const { firstname, lastname, workphone, emailaddress, organisation } = modalInputs;
        // const isEmailRequired = !(emailCustomFields?.length > 0);
        if (simpleValidator.current.allValid()) {
            // all input is valid
            setCreatingCust(true);

            if (uploadInfo.image) {
                const data = new FormData();
                data.append('file', uploadInfo.image);
                data.append('upload_preset', config.cloudinaryUploadPreset);
                data.append('cloud_name', config.cloudinaryCloudName);
                axios
                    .post(`${config.cloudinaryBaseUrl}/image/upload`, data)
                    .then(async (res) => {
                        const addRes = await addCustomer({
                            firstName: firstname,
                            lastName: lastname,
                            email: emailaddress,
                            phoneNumber: workphone,
                            organisation,
                            tags: selectedTags.map((tag) => tag.value),
                            avatar: res.data?.url,
                        });
                        if (addRes.status === 'success') {
                            NotificationManager.success(res?.message, 'Success');
                            setCreateModalShow(false);
                            setModalInputs({
                                firstname: '',
                                lastname: '',
                                workphone: '',
                                emailaddress: '',
                                organisation: '',
                                ccode: '+234',
                            });
                            setUploadInfo({
                                blob: null,
                                msg: 'Upload logo for customer profile.',
                                error: false,
                                image: null,
                                ownAvatar: '',
                            });
                            const data = res?.data || [];
                            addNewCustomer(data, custMeta?.itemsPerPage);
                            // getPaginatedCustomers(50, 1);
                            setCreatingCust(false);
                        } else {
                            setCreatingCust(false);
                            NotificationManager.error('An error occured', 'Error');
                        }
                    })
                    .catch((err) => {
                        // eslint-disable-next-line no-console
                        console.log(err);
                        NotificationManager.error('Photo could not be uploaded', 'Error');
                        setCreatingCust(false);
                    });
            } else {
                const res = await addCustomer({
                    firstName: firstname,
                    lastName: lastname,
                    email: emailaddress,
                    phoneNumber: workphone,
                    organisation,
                    tags: selectedTags.map((tag) => tag.value),
                });
                if (res.status === 'success') {
                    NotificationManager.success(res?.message, 'Success');
                    setCreateModalShow(false);
                    setModalInputs({
                        firstname: '',
                        lastname: '',
                        workphone: '',
                        emailaddress: '',
                        organisation: '',
                        ccode: '+234',
                    });
                    const data = res?.data || [];
                    addNewCustomer(data, custMeta?.itemsPerPage);
                    // getPaginatedCustomers(50, 1);
                    setCreatingCust(false);
                } else {
                    setCreatingCust(false);
                    // NotificationManager.error('An error occured', 'Error');
                }
            }
        } else {
            // show all errors if exist
            simpleValidator.current.showMessages();
            // force update component to display error
            forceUpdate(1);
        }
    };

    const custEditSuccess = () => {
        NotificationManager.success('Customer updated successfully', 'Success');
        getPaginatedCustomers(50, 1);
        setEditingCust(false);
        setModalInputs((prev) => ({
            ...prev,
            firstname: '',
            lastname: '',
            workphone: '',
            emailaddress: '',
            organisation: '',
            ccode: '+234',
        }));
        setCreateModalShow(false);
        // (fromCustDetails && custId) && getCurrentCustomer(custId);
        if (fromCustDetails) {
            custId && getCurrentCustomer(custId, true);
        }
    };

    const custEditFail = () => {
        NotificationManager.error('Oops, an error occured', 'Error');
        setEditingCust(false);
    };

    const handleCustomerEdit = () => {
        const { firstname, lastname, workphone, emailaddress, organisation } = modalInputs;

        if (simpleValidator.current.allValid()) {
            setEditingCust(true);

            if (uploadInfo.image) {
                const data = new FormData();
                data.append('file', uploadInfo.image);
                data.append('upload_preset', config.cloudinaryUploadPreset);
                data.append('cloud_name', config.cloudinaryCloudName);
                axios
                    .post(`${config.cloudinaryBaseUrl}/image/upload`, data)
                    .then(async (res) => {
                        const newCustomer = {
                            firstName: firstname,
                            lastName: lastname,
                            email: emailaddress,
                            phoneNumber: `${workphone}`,
                            organisation,
                            tags: selectedTags.map((tag) => tag.value.toLowerCase()),
                            avatar: res.data?.url,
                        };

                        updateCustomer(customerId, newCustomer, custEditSuccess, custEditFail);
                    })
                    .catch((err) => {
                        // eslint-disable-next-line no-console
                        console.log(err);
                        NotificationManager.error('Photo could not be uploaded', 'Error');
                        setCreatingCust(false);
                    });
            } else {
                const newCustomer = {
                    firstName: firstname,
                    lastName: lastname,
                    email: emailaddress,
                    phoneNumber: `${workphone}`,
                    organisation,
                    tags: selectedTags.map((tag) => tag.value.toLowerCase()),
                };
                updateCustomer(customerId, newCustomer, custEditSuccess, custEditFail);
            }
        } else {
            // show all errors if exist
            simpleValidator.current.showMessages();
            // force update component to display error
            forceUpdate(1);
        }
    };

    const handleModalHide = () => {
        setCreateModalShow(false);
        setCreatingCust(false);
        setEditingCust(false);
        setUploadInfo({
            blob: null,
            msg: 'Upload logo for customer profile.',
            error: false,
            image: null,
            ownAvatar: '',
        });
    };

    const handleTagCreation = (newTag) => {
        const realTags = Array.isArray(tags) ? tags : [];
        // eslint-disable-next-line no-param-reassign
        newTag = newTag.toLowerCase();
        setTagSelectLoading(true);
        const newTags = [...realTags, newTag];
        createTags(
            newTags,
            (newTags, newTag) => {
                // new tag created successfully
                setSelectedTags(() => [...selectedTags, { value: newTag, label: newTag }]);
                setTagSelectLoading(false);
            },
            () => {
                // tag creation failed
                setTagSelectLoading(false);
            },
            newTag,
        );
    };
    function DownCaretIcon() {
        return (
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8.5 1.25L5 4.75L1.5 1.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }

    // const handleImgSelect = function (e) {
    //     // store current input
    //     const fileInput = e.target;

    //     // create a store for the current dimension and default info
    //     const maxReqDimensions = {
    //         width: 1500,
    //         height: 1500,
    //     };

    //     if (!fileInput.files.length) {
    //         // No file is selected
    //         setUploadInfo((prev) => ({
    //             ...prev,
    //             msg: 'No file is slected',
    //             error: true,
    //             blob: null,
    //             image: null,
    //             ownAvatar: '',
    //         }));
    //     } else {
    //         // file selected

    //         // check if selected file is an image
    //         if (fileInput.files[0].type.indexOf('image/') === -1) {
    //             // Selected file is not an image
    //             setUploadInfo((prev) => ({
    //                 ...prev,
    //                 msg: 'Selected file is not an image',
    //                 error: true,
    //                 blob: null,
    //                 image: null,
    //                 ownAvatar: '',
    //             }));
    //         } else {
    //             // Selected file is an image
    //             /*
    //              * read the selected image to get the file width and height
    //              */
    //             // create a new file reader object
    //             const reader = new FileReader();
    //             reader.readAsDataURL(fileInput.files[0]);
    //             reader.onload = function (e) {
    //                 // when reader has loaded

    //                 // create a new image object
    //                 const currentImage = new Image();
    //                 // set the source of the image to the base64 string from the file reader
    //                 currentImage.src = this.result;

    //                 currentImage.onload = function () {
    //                     const [currentImageHeight, currentImageWidth] = [this.height, this.width];

    //                     if (
    //                         currentImageWidth > maxReqDimensions.width ||
    //                         currentImageHeight > maxReqDimensions.height
    //                     ) {
    //                         // current selected image dimesions are not acceptable
    //                         setUploadInfo((prev) => ({
    //                             ...prev,
    //                             msg: `Selected image should have max dimension of ${maxReqDimensions.width}x${maxReqDimensions.height}`,
    //                             error: true,
    //                             blog: null,
    //                             image: null,
    //                         }));
    //                     } else {
    //                         // current selected image dimensions are acceptable
    //                         const fileName = fileInput.files[0].name;
    //                         const fileBlob = URL.createObjectURL(fileInput.files[0]);

    //                         setUploadInfo((prev) => ({
    //                             ...prev,
    //                             blob: fileBlob,
    //                             msg: fileName,
    //                             error: false,
    //                             image: fileInput.files[0],
    //                             ownAvatar: '',
    //                         }));
    //                         /*
    //                         when the image with the blob loads call the below method
    //                         URL.revokeObjectURL(this.src);  where this.src is the blob created
    //                         */
    //                     }
    //                 };
    //             };
    //         }
    //     }
    // };

    // const workphoneChange = (e) => {
    //     handleModalInput(e);
    // };

    return (
        <Modal
            // show={createModalShow}
            // onHide={() => setCreateModalShow(false)}
            open={createModalShow}
            onClose={handleModalHide}
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered
        >
            {/* <Modal.Body> */}
            <div className="saveTicketWrapModal p-4 pb-1 mb-0">
                <p className="fs-5 mb-3">{!isEditing ? 'Create New' : 'Edit'} Customer</p>
                <form className="needs-validation mb-4" noValidate onSubmit={(e) => e.preventDefault()}>
                    <div className="row">
                        <div className="col-6 mt-2">
                            <label htmlFor="firstname" className="form-label">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                className="form-control"
                                value={modalInputs.firstname}
                                onChange={handleModalInput}
                            />
                            {
                                /* simple validation */
                                simpleValidator.current.message(
                                    'First Name',
                                    modalInputs.firstname,
                                    'required|alpha_num_space|between:2,25',
                                )
                            }
                        </div>
                        <div className="col-6 mt-2">
                            <label htmlFor="lastname" className="form-label">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                className="form-control"
                                value={modalInputs.lastname}
                                onChange={handleModalInput}
                            />
                            {
                                /* simple validation */
                                simpleValidator.current.message(
                                    'Last Name',
                                    modalInputs.lastname,
                                    'required|alpha_num_space|between:2,25',
                                )
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mt-3">
                            <label htmlFor="workphone" className="form-label">
                                Work Phone
                            </label>
                            <div className="input-group mb-3 workphone-group">
                                <div className="input-group-prepend workphone-dd-wrapper">
                                    <span>
                                        <img
                                            src={`https://www.countryflags.io/${
                                                countrycodes.find((x) => x.dial_code === modalInputs.ccode)?.code || ''
                                            }/flat/64.png`}
                                            alt=""
                                        />
                                    </span>
                                    <select
                                        className="d-inline mt-0  pe-3"
                                        name="ccode"
                                        id="ccode"
                                        value={modalInputs.ccode}
                                        onChange={handleModalInput}
                                    >
                                        {countrycodes
                                            .sort((a, b) => Number(a.dial_code.slice(1)) - Number(b.dial_code.slice(1)))
                                            .map((cc, index) => (
                                                // eslint-disable-next-line react/no-array-index-key
                                                <option key={index} value={cc.dial_code}>
                                                    {cc.dial_code}
                                                </option>
                                            ))}
                                    </select>
                                    {/* <span className="workphone-dropdown">lite</span>
                                        <ul>
                                            {countrycodes.sort((a, b) => Number(a.dial_code.slice(1)) - Number(b.dial_code.slice(1))).map(cc => <li>
                                                <span><img src={`https://www.countryflags.io/be/flat/64.png`} alt="" /></span> {cc.dial_code}</li>)}
                                        </ul> */}
                                </div>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="workphone"
                                    id="workphone"
                                    value={modalInputs.workphone}
                                    ariaLabel="work phone"
                                    ariaDescribedby="workphone"
                                    onChange={handleModalInput}
                                />
                            </div>
                            {
                                /* simple validation */
                                simpleValidator.current.message('Work phone', modalInputs.workphone, 'phone')
                            }
                        </div>
                        <div className="col-6 mt-3">
                            <label htmlFor="emailaddress" className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="emailaddress"
                                id="emailaddress"
                                className="form-control"
                                value={modalInputs.emailaddress}
                                onChange={handleModalInput}
                            />
                            {
                                /* simple validation */
                                simpleValidator.current.message(
                                    'Email Address',
                                    modalInputs.emailaddress,
                                    `${!(emailCustomFields?.length > 0) ? 'required|' : ''}email`,
                                )
                            }
                        </div>
                    </div>
                    <p
                        className="btn mt-3 mb-2 p-0 text-start"
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                        role="button"
                        style={{
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            marginBottom: 0,
                            color: '#006298!important',
                        }}
                        onClick={() => setShowAddOption((x) => !x)}
                    >
                        Additional Options{' '}
                        <span>
                            <DownCaretIcon />
                        </span>
                    </p>
                    {showAddOption && (
                        <div className="row g-3 pt-3">
                            {/* <div className="col-12 mt-1">
                                <label htmlFor="organisation" className="form-label">Organisation (optional)</label>
                                <input
                                    type="text"
                                    name="organisation"
                                    id="organisation"
                                    className="form-control"
                                    value={modalInputs.organisation}
                                    onChange={handleModalInput}/>
                            </div> */}
                            <div className="col-12 mt-3 tags-select-wrapper">
                                <label htmlFor="title" className="form-label">
                                    Tags
                                </label>
                                <RSelect
                                    className="rselectfield"
                                    style={{ fontSize: '12px' }}
                                    onChange={(value) => {
                                        handleTagSelection(value);
                                    }}
                                    isClearable={false}
                                    isDisabled={tagSelectLoading}
                                    isLoading={tagSelectLoading}
                                    isMulti
                                    onCreateOption={handleTagCreation}
                                    value={selectedTags}
                                    options={
                                        // populate 'options' prop from $agents, with names remapped
                                        tags?.map((item) => {
                                            // eslint-disable-next-line no-param-reassign
                                            item = item?.toLowerCase();
                                            return { value: item, label: item };
                                        })
                                    }
                                />
                            </div>

                            {/* <div>
                                <div className="d-flex mb-4 mt-3">
                                    <div
                                        id="uploadPersonalPhotoInputImgPreview"
                                        style={{
                                        width: "6rem",
                                        height: "6rem"
                                    }}
                                        className="
                                            border border-1
                                            rounded-3
                                            me-5
                                            d-flex
                                            justify-content-center
                                            align-items-center
                                            ">
                                        <div
                                            style={{
                                            justifyContent: "center",
                                            height: "100%",
                                            width: "100%"
                                        }}
                                            className="ms-0 d-flex justify-content-between align-items-center">
                                            {(uploadInfo.blob || uploadInfo.ownAvatar) ? (<img
                                                        className="avatarImage"
                                                        src={uploadInfo.ownAvatar ? uploadInfo.ownAvatar : uploadInfo.blob}
                                                        alt=""
                                                        onLoad={() => uploadInfo.blob && URL.revokeObjectURL(uploadInfo.blob)}
                                                        style={{
                                                        maxWidth: '100%',
                                                        maxHeight: '100%'
                                                    }}/>)
                                                    : <img
                                                        src={ImageDefault}
                                                        alt=""
                                                        style={{
                                                        paddingLeft: '2.1rem'
                                                    }}
                                                        className="pe-none"/>}
                                                
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="uploadPersonalPhotoInput"
                                            className="btn btn-sm bg-at-blue-light px-4 py-1 mb-2 mt-1"
                                            onClick={() => document.getElementById("accountLogo").click()}>
                                            Upload Photo
                                        </label>
                                        <input type="file" name="accountLogo" id="accountLogo" onChange={handleImgSelect}/>
                                        <p className="mb-0 text-at-red">
                                            <small id="uploadPersonalPhotoInputError"></small>
                                        </p>
                                        <p className="uploadInfoWrapper">
                                            <small id="uploadPersonalPhotoInputInfo" className={`${uploadInfo.error && 'text-danger'}`}>
                                                {uploadInfo.msg}
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    )}

                    <div className="mt-3 mt-sm-3 pt-3 text-end">
                        {!isEditing ? (
                            <button
                                type="button"
                                className={`btn py-1 px-4 ${css({
                                    ...brandKit({ bgCol: 0 }),
                                    color: 'white',
                                    '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                                })}`}
                                disabled={creatingCust}
                                onClick={handleCustomerCreation}
                            >
                                {creatingCust ? 'Creating...' : 'Create'}
                            </button>
                        ) : (
                            <button
                                type="button"
                                className={`btn bg-at-blue-light  py-1 px-4 ${css({
                                    ...brandKit({ bgCol: 0 }),
                                    color: 'white',
                                    '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                                })}`}
                                disabled={editingCust}
                                onClick={handleCustomerEdit}
                            >
                                {editingCust ? 'Editing...' : 'Edit'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
            {/* </Modal.Body> */}
        </Modal>
    );
}

const mapStateToProps = (state) => ({
    tags: state.tag.tags?.tags_names?.tags,
    customers: state.customer.customers,
    custMeta: state.customer?.meta || {},
    customField: state.customField,
});

export default connect(mapStateToProps, {
    getPaginatedCustomers,
    updateCustomer,
    createTags,
    getCurrentCustomer,
    addNewCustomer,
})(CreateCustomerModal);
