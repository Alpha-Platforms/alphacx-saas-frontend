import {useState} from 'react';
import '../../../../styles/Setting.css';
import ImageDefault from '../../../../assets/svgicons/image-default.svg';
import {Link} from 'react-router-dom';

const UserPersonal = () => {

    const [brandingImages,
        setBrandingImages] = useState({accountLogo: {}, accountLogoDark: {}, accountIcon: {}, loginBackgroundImage: {}, themeColor: "#000000"});

    const handleImage = (e) => {
        e.preventDefault();
        const files = e.target.files;
        let image = URL.createObjectURL(files[0]);
        console.clear();

        setBrandingImages({
            ...brandingImages,
            [e.target.name]: {
                file: files[0],
                blob: image
            }
        });

        console.log(e.target.name);
    };

    return (
        <div className="pb-3">
            <div className="card card-body bg-white border-0 p-0 mb-4">
                <div id="mainContentHeader">
                    <span className="text-muted f-14">
                        <Link to="/settings">Settings</Link>&nbsp;&nbsp;&nbsp;
                        <i className="bi bi-chevron-right"></i>&nbsp;&nbsp;&nbsp;
                        <span>Users</span>
                    </span>
                </div>

                <h5 className="my-3 f-16 fw-500 text-dark">Personal Information Settings</h5>

                <div className="position-relative">
                    {/* <div
                        id="imgDefault"
                        className="rounded-3 d-flex justify-content-center align-items-center me-5 position-absolute">
                        <div className="d-inline-block">
                            <img src={ImageDefault} alt="" className="pe-none"/>
                        </div>
                    </div> */}
                    <form className="w-75">
                        <div className="form-group mt-3">
                            <label htmlFor="userFirstName" className="mb-1">First Name</label>
                            <input
                                type="email"
                                className="form-control"
                                id="userFirstName"
                                placeholder="Seun"/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="userLastName" className="mb-1">Last Name</label>
                            <input
                                type="password"
                                className="form-control"
                                id="userLastName"
                                placeholder="Orofin"/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="userEmail" className="mb-1">Email</label>
                            <input
                                type="password"
                                className="form-control"
                                id="userEmail"
                                placeholder="seunorofin@gmail.com"/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="userRole" className="mb-1">Role</label>
                            <input
                                type="password"
                                className="form-control"
                                id="userRole"
                                placeholder="Orofin"/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="userTeam" className="mb-1">Team(s)</label>
                            <input
                                type="password"
                                className="form-control"
                                id="userTeam"
                                placeholder="department"/>
                        </div>
                        <div>

                            {/* <label className="d-block mb-3" htmlFor="">
          Upload Account Logo
        </label> */}
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
                                        {brandingImages
                                            ?.accountLogo
                                                ?.blob
                                                    ? (<img
                                                        className="avatarImage"
                                                        src={brandingImages
                                                        ?.accountLogo
                                                            ?.blob}
                                                        alt=""
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
                                    <input type="file" name="accountLogo" id="accountLogo" onChange={handleImage}/>
                                    <p className="mb-0 text-at-red">
                                        <small id="uploadPersonalPhotoInputError"></small>
                                    </p>
                                    <p className="uploadInfoWrapper">
                                        <small id="uploadPersonalPhotoInputInfo">
                                            Upload logo for the login screens, logo must be a PNG file with maximum
                                            dimensions of 300px x 100px
                                        </small>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-1">
                            <button type="submit" className="btn btn-primary btn-sm bg-at-blue-light">Password Reset</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    );
}

export default UserPersonal;