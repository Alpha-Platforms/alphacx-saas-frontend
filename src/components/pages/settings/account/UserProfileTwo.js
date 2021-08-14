import {useEffect} from "react";
import "./AccountSettings.scss";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {NotificationManager} from "react-notifications";
import ScaleLoader from "react-spinners/ScaleLoader";
import {connect} from 'react-redux';
import {getCurrentAgent} from '../../../../reduxstore/actions/agentActions';
import { updateUser } from './../../../../reduxstore/actions/userActions';

const UserProfileTwo = ({getCurrentAgent, isAgentLoaded, isCurrentAgentLoaded, currentAgent}) => {

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
        avatar: {
            currentAvatar: '',
            file: null,
            blob: null
        }
    });

    const updateUserInfo = async () => {
        const {firstname, lastname, email, role, team} = personalInfoInputs;
        const updatedInfo = {
            id,
            firstname,
            lastname,
            email,
            role,
            team
        };
        console.clear();

        setAccountLoading(true);

        const res = await updateUser(updatedInfo);

        if (res?.status === 'success') {
            NotificationManager.success('Info has been updated', 'Success');
            setAccountLoading(false);
        } else {
            NotificationManager.error('Something went wrong');
            setAccountLoading(false);
        }
    }

    const handleInputChange = e => {
        const {name, value} = e.target;
        setPersonalInfoInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleAvatarChange = () => {
        console.log('avatar change');
    }

    useEffect(() => {

        getCurrentAgent(id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAgentLoaded])

    useEffect(() => {
        if (currentAgent) {
            const {firstname, lastname, email, role, avatar} = currentAgent;

            setPersonalInfoInputs(prev => ({
                ...prev,
                firstname,
                lastname,
                email,
                role,
                avatar: {
                    ...prev.avatar,
                    currentAvatar: avatar
                }
            }));
        }

    }, [currentAgent]);

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
                                <img src={RightArrow} alt="" className="img-fluid mx-2 me-3"/>
                                <span>User Profile</span>
                            </h6>

                        </div>

                        <div className="tab-content" id="pills-tabContent">

                            <div className="d-flex justify-content-between col-md-8">

                                <h3 className="fs-6 text-black">Personal Information Settings</h3>

                                <button
                                    type="button"
                                    className="btn btn-sm bg-at-blue-light text-white px-4"
                                    onClick={updateUserInfo}>
                                    Save Changes
                                </button>
                            </div>
                            <div
                                className="show fade col-md-8"
                                id="personal-information-view"
                                role="tabpanel"
                                aria-labelledby="pills-personal-tab">
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
                                                id="userrole"
                                                name="userrole"
                                                className="form-control"
                                                value={personalInfoInputs.role}
                                                onChange={handleInputChange}/>
                                        </div>
                                        <div className="w-100">
                                            <label className="form-label" for="last-name">
                                                Team
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="userteam"
                                                name="userteam"
                                                value={personalInfoInputs.team}
                                                onChange={handleInputChange}/>
                                        </div>
                                    </div>

                                </div>

                                <div className="d-flex mb-5">
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
                                </div>

                                <div className="mb-5">
                                    <label className="form-label" for="change-password">
                                        Change Password
                                    </label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="change_password"
                                        id="change-password"
                                        value={personalInfoInputs.change_password || ""}
                                        onChange={handleInputChange}/>
                                    <button className="btn btn-sm bg-at-blue-light px-3 py-1 mt-3">
                                        Change Password
                                    </button>
                                </div>

                                <div className="d-flex"></div>
                            </div>

                        </div>

                    </div>}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({agents: state.agent.agents, isAgentLoaded: state.agent.isAgentLoaded, isCurrentAgentLoaded: state.agent.isCurrentAgentLoaded, currentAgent: state.agent.currentAgent});

export default connect(mapStateToProps, {getCurrentAgent})(UserProfileTwo);
