import React from "react";
import { useState } from "react";
import { ChromePicker } from "react-color";

const Branding = () => {
  const [brandingImages, setBrandingImages] = useState({
    accountLogo: {},
    accountLogoDark: {},
    accountIcon: {},
    loginBackgroundImage: {},
    themeColor: "#000000",
  });
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleImage = (e) => {
    e.preventDefault();
    const files = e.target.files;
    let image = URL.createObjectURL(files[0]);
    console.clear();

    setBrandingImages({
      ...brandingImages,
      [e.target.name]: { file: files[0], blob: image },
    });

    console.log(e.target.name);
  };

  const handleColorChange = (color) => {
    setBrandingImages({ ...brandingImages, themeColor: color.hex });
  };
  return (
    <div className="col-md-8">
      {/*
            <!-- * upload photo section -->
            */}
      <div>
        <label className="d-block mb-3" for="">
          Upload Account Logo
        </label>
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
              {brandingImages?.accountLogo?.blob && (
                <img
                  className="avatarImage"
                  src={brandingImages?.accountLogo?.blob}
                  alt=""
                />
              )}
            </div>
          </div>
          <div>
            <label
              for="uploadPersonalPhotoInput"
              className="btn btn-sm bg-at-blue-light px-4 py-1 mb-2 mt-1"
              onClick={() => document.getElementById("accountLogo").click()}
            >
              Upload Photo
            </label>
            <input
              type="file"
              name="accountLogo"
              id="accountLogo"
              onChange={handleImage}
            />
            <p className="mb-0 text-at-red">
              <small id="uploadPersonalPhotoInputError"></small>
            </p>
            <p className="uploadInfoWrapper">
              <small id="uploadPersonalPhotoInputInfo">
                Upload logo for the login screens, logo must be a PNG file with
                maximum dimensions of 300px x 100px
              </small>
            </p>
          </div>
        </div>
      </div>
      <div>
        <label className="d-block mb-3" for="">
          Upload Account Logo (Dark Mode)
        </label>
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
              {brandingImages?.accountLogoDark?.blob && (
                <img
                  className="avatarImage"
                  src={brandingImages?.accountLogoDark?.blob}
                  alt=""
                />
              )}
            </div>
          </div>
          <div>
            <label
              for="uploadPersonalPhotoInput"
              className="btn btn-sm bg-at-blue-light px-4 py-1 mb-2 mt-1"
              onClick={() => document.getElementById("accountLogoDark").click()}
            >
              Upload Photo
            </label>
            <input
              type="file"
              name="accountLogoDark"
              id="accountLogoDark"
              onChange={handleImage}
            />
            <p className="mb-0 text-at-red">
              <small id="uploadPersonalPhotoInputError"></small>
            </p>
            <p className="uploadInfoWrapper">
              <small id="uploadPersonalPhotoInputInfo">
                Upload logo for the Help Center, logo must be a PNG file with
                maximum dimensions of 300px x 100px
              </small>
            </p>
          </div>
        </div>
      </div>
      <div>
        <label className="d-block mb-3" for="">
          Upload Account Icon
        </label>
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
              {brandingImages?.accountIcon?.blob && (
                <img
                  className="avatarImage"
                  src={brandingImages?.accountIcon?.blob}
                  alt=""
                />
              )}
            </div>
          </div>
          <div>
            <label
              for="uploadPersonalPhotoInput"
              className="btn btn-sm bg-at-blue-light px-4 py-1 mb-2 mt-1"
              onClick={() => document.getElementById("accountIcon").click()}
            >
              Upload Photo
            </label>
            <input
              type="file"
              name="accountIcon"
              id="accountIcon"
              onChange={handleImage}
            />
            <p className="mb-0 text-at-red">
              <small id="uploadPersonalPhotoInputError"></small>
            </p>
            <p className="uploadInfoWrapper">
              <small id="uploadPersonalPhotoInputInfo">
                Upload Icon for the nav bar, Icon must be a PNG file with
                maximum dimensions of 32px x 32px
              </small>
            </p>
          </div>
        </div>
      </div>
      <div>
        <label className="d-block mb-3" htmlFor="">
          Upload Login Background Image
        </label>
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
              {brandingImages?.loginBackgroundImage?.blob && (
                <img
                  className="avatarImage"
                  src={brandingImages?.loginBackgroundImage?.blob}
                  alt=""
                />
              )}
            </div>
          </div>
          <div>
            <label
              for="uploadPersonalPhotoInput"
              className="btn btn-sm bg-at-blue-light px-4 py-1 mb-2 mt-1"
              onClick={() =>
                document.getElementById("loginBackgroundImage").click()
              }
            >
              Upload Photo
            </label>
            <input
              type="file"
              name="loginBackgroundImage"
              id="loginBackgroundImage"
              onChange={handleImage}
            />
            <p className="mb-0 text-at-red">
              <small id="uploadPersonalPhotoInputError"></small>
            </p>
            <p className="uploadInfoWrapper">
              <small id="uploadPersonalPhotoInputInfo">
                Upload Background image on the login screen for promotional,
                image must be a PNG file with maximum dimensions of 800px x
                900px
              </small>
            </p>
          </div>
        </div>
      </div>
      <div className="d-flex mb-5" style={{ position: "relative" }}>
        <label className="d-block mb-3 me-4" for="">
          Pick Color Theme
        </label>

        <div
          style={{
            height: 30,
            width: 30,
            backgroundColor: brandingImages.themeColor,
            borderRadius: 5,
            cursor: "pointer",
          }}
          className="me-2"
          onClick={() => setShowColorPicker(!showColorPicker)}
        />
        {showColorPicker && (
          <div
            style={{
              position: "absolute",
              left: "20%",
              zIndex: 100,
              top: -30,
            }}
          >
            <span
              style={{
                position: "absolute",
                right: 0,
                top: -25,
                fontSize: 20,
                cursor: "pointer",
              }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              x
            </span>
            <ChromePicker
              color={brandingImages.themeColor}
              onChangeComplete={handleColorChange}
            />
          </div>
        )}
      </div>
      <div className="float-end mb-5">
        <a
          href="automation.html"
          className="btn btn-sm f-12 bg-outline-custom cancel px-4"
        >
          Cancel
        </a>
        <a
          href="automation-table.html"
          className="btn btn-sm ms-2 f-12 bg-custom px-4"
          data-bs-toggle="modal"
          data-bs-target="#successModal"
        >
          Save Changes
        </a>
      </div>
    </div>
  );
};

export default Branding;
