import {useEffect} from "react";
import "./AccountSettings.scss";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {NotificationManager} from "react-notifications";
import ScaleLoader from "react-spinners/ScaleLoader";
import {connect} from 'react-redux';
import {getCurrentAgent, getAgents} from '../../../../reduxstore/actions/agentActions';
import { updateUser, updateUserPassword } from './../../../../reduxstore/actions/userActions';
import ImageDefault from '../../../../assets/svgicons/image-default.svg';
import axios from 'axios';

const UserProfileTwo = ({getCurrentAgent, isAgentLoaded, isCurrentAgentLoaded, currentAgent, groups, authenticatedUser, agents, getAgents}) => {

    const {id} = useParams();

    const [accountLoading,
        setAccountLoading] = useState(false);
    const [personalInfoInputs,
        setPersonalInfoInputs] = useState({
        firstname: '',
        lastname: '',
        email: '',
        role: '',
        team: '',
        oldPassword: '',
        newPassword: ''
    });

    const [uploadInfo, setUploadInfo] = useState({
        blob: null,
        msg: 'Upload logo for customer profile.',
        error: false,
        image: null,
        ownAvatar: ''
    });


    const updateUserInfo = async () => {
        const {firstname, lastname, email, role, team, oldPassword, newPassword} = personalInfoInputs;
        const updatedInfo = {
            id,
            firstname,
            lastname,
            email,
            role,
            groupId: team
        };

        console.clear();

        setAccountLoading(true);

        if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
            NotificationManager.error('Enter both passwords field or leave blank.', 'Error');
            setAccountLoading(false);
        } else if (oldPassword && newPassword) {
            const pwdRes = await updateUserPassword(oldPassword, newPassword);

            if (pwdRes?.status === 'success') {

                if (uploadInfo.image) {
                    const data = new FormData();
                    data.append('file', uploadInfo.image);
                    data.append('upload_preset', 'i5bn3icr');
                    data.append('cloud_name', 'alphacx-co');
                    axios
                        .post(`https://api.cloudinary.com/v1_1/alphacx-co/image/upload`, data)
                        .then(async res => {

                            const userRes = await updateUser({...updatedInfo, avatar: res.data?.url});
                            if (userRes?.status === 'success') {
                                NotificationManager.success('Info has been updated', 'Success');
                                getAgents()
                                window.history.back();
                            } else {
                                NotificationManager.error('Something went wrong');
                            }
                            setAccountLoading(false);
                        })
                        .catch(err => {
                            console.log(err);
                            NotificationManager.error("Photo could not be uploaded", "Error");
                            setAccountLoading(false);
                        });
                } else {
                    const userRes = await updateUser(updatedInfo);
                    if (userRes?.status === 'success') {
                        NotificationManager.success('Info has been updated', 'Success');
                        getAgents();
                        window.history.back();
                    } else {
                        NotificationManager.error('Something went wrong');
                    }
                    setAccountLoading(false);
                    
                }


            } else if (pwdRes?.status === 'fail') {
                NotificationManager.error(pwdRes?.message || 'Password is incorrect.', 'Failed');
                setAccountLoading(false);
            } else {
                NotificationManager.error('Something went wrong');            
                setAccountLoading(false);
            }
        } else {
            if (uploadInfo.image) {
                const data = new FormData();
                data.append('file', uploadInfo.image);
                data.append('upload_preset', 'i5bn3icr');
                data.append('cloud_name', 'alphacx-co');
                axios
                    .post(`https://api.cloudinary.com/v1_1/alphacx-co/image/upload`, data)
                    .then(async res => {

                        const userRes = await updateUser({...updatedInfo, avatar: res.data?.url});
                        if (userRes?.status === 'success') {
                            NotificationManager.success('Info has been updated', 'Success');
                            getAgents();
                            window.history.back();
                        } else {
                            NotificationManager.error('Something went wrong');
                        }
                        setAccountLoading(false);
                    })
                    .catch(err => {
                        console.log(err);
                        NotificationManager.error("Photo could not be uploaded", "Error");
                        setAccountLoading(false);
                    });
            } else {
                const userRes = await updateUser(updatedInfo);
                if (userRes?.status === 'success') {
                    NotificationManager.success('Info has been updated', 'Success');
                    getAgents();
                    window.history.back();
                } else {
                    NotificationManager.error('Something went wrong');
                }
                setAccountLoading(false);
                
            }
        }
    }

    const handleInputChange = e => {
        const {name, value} = e.target;
        setPersonalInfoInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {

        getCurrentAgent(id);

        
        if (agents.length !== 0) {
            const gottenUser =  agents.filter(agent => agent
                ?.id === id)[0];

            if (gottenUser) {
                setPersonalInfoInputs(prev => ({
                    ...prev,
                    team: gottenUser?.group_id || ""
                }));
                
            }
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAgentLoaded, agents.length])

    useEffect(() => {
        if (currentAgent) {
            const {firstname, lastname, email, role, avatar, group_id} = currentAgent;

            const agentInfo = group_id ? {firstname, lastname, email, role, team: group_id} : {firstname, lastname, email, role};

            setPersonalInfoInputs(prev => ({
                ...prev,
                ...agentInfo
            }));

            setUploadInfo(prev => ({
                ...prev,
                ownAvatar: avatar
            }))
        }

    }, [currentAgent]);


    const handleImgSelect = function (e) {
        // store current input
        const fileInput = e.target
    
        // create a store for the current dimension and default info
        let maxReqDimensions = {
                width: 1500,
                height: 1500
            };
    
        if (!fileInput.files.length) {
            // No file is selected
            setUploadInfo(prev => ({...prev, msg: 'No file is slected', error: true, blob: null, image: null, ownAvatar: ''}));
            
        } else {
            // file selected
            
            // check if selected file is an image
            if (fileInput.files[0].type.indexOf("image/") === -1) {
                // Selected file is not an image
                setUploadInfo(prev => ({...prev, msg: 'Selected file is not an image', error: true, blob: null, image: null, ownAvatar: ''}));
            } else {
                // Selected file is an image
                /* 
                 * read the selected image to get the file width and height
                 */
                // create a new file reader object
                const reader = new FileReader();
                reader.readAsDataURL(fileInput.files[0]);
                reader.onload = function (e) {
                    // when reader has loaded
    
                    //create a new image object
                    const currentImage = new Image();
                    // set the source of the image to the base64 string from the file reader
                    currentImage.src = this.result;
    
                    currentImage.onload = function () {
                        const [currentImageHeight, currentImageWidth] = [this.height, this
                            .width
                        ];
    
                        if (currentImageWidth > maxReqDimensions.width ||
                            currentImageHeight > maxReqDimensions.height) {
                            // current selected image dimesions are not acceptable
                            setUploadInfo(prev => ({...prev, msg: `Selected image should have max dimension of ${maxReqDimensions.width}x${maxReqDimensions.height}`, error: true, blog: null, image: null}));
                        } else {
                            // current selected image dimensions are acceptable
                            const fileName = fileInput.files[0].name;
                            const fileBlob = URL.createObjectURL(fileInput.files[0]);
    
                            setUploadInfo(prev => ({...prev, blob: fileBlob, msg: fileName, error: false, image: fileInput.files[0], ownAvatar: ''}));
                            /* 
                            when the image with the blob loads call the below method
                            URL.revokeObjectURL(this.src);  where this.src is the blob created
                            */
                        }
                    }
                }
            }
        }
    }

    return (
        <div className="account-settings">
            {accountLoading && (
                <div className={`cust-table-loader ${accountLoading && "add-loader-opacity"}`}>
                    <ScaleLoader loading={accountLoading} color={"#006298"}/>
                </div>
            )}

            {!isCurrentAgentLoaded
                ? <div className="single-cust-loader"><ScaleLoader loading={true} color={"#006298"}/></div>
                : !currentAgent
                    ? <div>
                            <h3 className="text-center">User Not Found.</h3>
                        </div>
                    : <div className="card card-body bg-white border-0">
                        <div id="mainContentHeader" className="breadcrumb">
                            <h6 className="text-muted f-14">
                                <Link to="/settings">
                                    <span className="text-custom">Settings</span>
                                </Link>{" "}
                                <img src={RightArrow} alt="" className="img-fluid mx-2 me-2"/>
                                <Link to="/settings/users">
                                    <span className="text-custom">Users</span>
                                </Link>{" "}
                                <img src={RightArrow} alt="" className="img-fluid mx-2 me-2"/>
                                <span>User Profile</span>
                            </h6>

                        </div>

                        <div className="tab-content" id="pills-tabContent">

                            <div className="d-flex justify-content-between col-md-8">
                                <h3 className="fs-6 text-black">Personal Information Settings</h3>
                            </div>
                            <div
                                className="show fade col-md-8"
                                id="personal-information-view"
                                role="tabpanel"
                                aria-labelledby="pills-personal-tab">
                                <div className="mb-3 mt-4">
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
                                                value={personalInfoInputs.firstname}
                                                onChange={handleInputChange}/>
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
                                                value={personalInfoInputs.lastname}
                                                onChange={handleInputChange}/>
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
                                            value={personalInfoInputs.email}
                                            disabled/>
                                    </div>

                                    <div className="d-flex mb-3">
                                        <div className="me-2 w-100">
                                            <label for="first-name" className="form-label">
                                                Role
                                            </label>
                                            <input
                                                type="text"
                                                id="role"
                                                name="role"
                                                className="form-control"
                                                disabled={true}
                                                value={personalInfoInputs.role}
                                                onChange={handleInputChange}/>
                                        </div>
                                        <div className="w-100">
                                            <label className="form-label" for="last-name">
                                                Team
                                            </label>
                                            <select
                                                id="team"
                                                className="form-select"
                                                aria-label="parent category"
                                                name="team"
                                                value={personalInfoInputs.team}
                                                onChange={handleInputChange}>
                                                <option value="">Select Team</option>
                                                {groups.map(group => (
                                                    <option value={group.id}>{group.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                {authenticatedUser?.email === currentAgent?.email && <div className="d-flex">
                                    <div className="mb-4 me-2 w-100">
                                        <label className="form-label" for="change-password">
                                            Change Password
                                        </label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="oldPassword"
                                            id="oldPassword"
                                            value={personalInfoInputs.oldPassword || ""}
                                            onChange={handleInputChange}
                                            placeholder="Current Password"
                                            />
                                        {/* <button className="btn btn-sm bg-at-blue-light px-3 py-1 mt-3">
                                            Change Password
                                        </button> */}
                                    </div>
                                    <div className="mb-4 w-100">
                                        <label className="form-label" for="change-password" style={{ visibility: "hidden" }}>
                                            Change Password
                                        </label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="newPassword"
                                            id="newPassword"
                                            value={personalInfoInputs.newPassword || ""}
                                            onChange={handleInputChange}
                                            placeholder="New Password"
                                            />
                                        {/* <button className="btn btn-sm bg-at-blue-light px-3 py-1 mt-3">
                                            Change Password
                                        </button> */}
                                    </div>
                                </div>}

                                {/* <div className="d-flex mb-3">
                                    <div
                                        id="uploadPersonalPhotoInputImgPreview"
                                        style={{
                                        width: "6rem",
                                        height: "6rem"
                                    }}
                                        className="border border-1 rounded-3 me-5 d-flex justify-content-center align-items-center">
                                        <div
                                            style={{
                                            justifyContent: "center",
                                            height: "100%",
                                            width: "100%"
                                        }}
                                            className="ms-0 d-flex justify-content-between align-items-center">
                                            {(personalInfoInputs.avatar.currentAvatar || personalInfoInputs.avatar.blob) && (<img
                                                        className="avatarImage"
                                                        src={personalInfoInputs
                                                        ?.avatar
                                                            ?.blob || personalInfoInputs
                                                                ?.avatar.currentAvatar}
                                                        alt=""/>)}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label
                                            for="uploadPersonalPhotoInput"
                                            className="btn btn-sm bg-at-blue-light px-4 py-1 mb-2 mt-1">
                                            Upload Photo
                                        </label>
                                        <input
                                            type="file"
                                            name="uploadPersonalPhotoInput"
                                            id="uploadPersonalPhotoInput"
                                            onChange={handleAvatarChange}/>
                                        <p className="mb-0 text-at-red">
                                            <small id="uploadPersonalPhotoInputError"></small>
                                        </p>
                                        <p className="uploadInfoWrapper">
                                            <small id="uploadPersonalPhotoInputInfo">
                                                Upload personal photo, uploaded file must be an image.
                                            </small>
                                        </p>
                                    </div>
                                </div> */}

                                <div>
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
                            </div>

                                
                                <div className="mb-5 text-end">
                                    <button
                                        type="button"
                                        className="btn btn-sm bg-at-blue-light text-white px-4"
                                        onClick={updateUserInfo}>
                                        Save Changes
                                    </button>
                                </div>

                                <div className="d-flex"></div>
                            </div>

                        </div>

                    </div>}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({agents: state.agent.agents, isAgentLoaded: state.agent.isAgentLoaded, isCurrentAgentLoaded: state.agent.isCurrentAgentLoaded, currentAgent: state.agent.currentAgent, groups: state.group.groups, authenticatedUser: state.userAuth.user});

export default connect(mapStateToProps, {getCurrentAgent, getAgents})(UserProfileTwo);
