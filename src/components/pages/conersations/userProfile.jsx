import React, { useState } from "react";
import { CancelIconC } from "../../../assets/images/svgs";
import pic from "../../../assets/imgF/codeuiandyimg.png";
import {
  UserProfileIcon1,
  UserProfileIcon2,
  UserProfileIcon3,
} from "../../../assets/images/svgs";
import userImg from "../../../assets/imgF/user.png";
export default function UserProfile({ setshowUserProfile, UserInfo }) {
  const [tags, setTags] = useState([
    <div style={{ color: "#662D91", background: "#F8EEFF" }}>High Value</div>,
    <div style={{ color: "#F40D0D", background: "#FFEAEA " }}>Billing</div>,
    <div style={{ color: "#662D91", background: "#F8EEFF" }}>High Value</div>,
    <div style={{ color: "#1E90FF", background: "#E3F1FF" }}>Billing</div>,
    <div style={{ color: "#662D91", background: "#F8EEFF" }}>High Value</div>,
    <div style={{ color: "#1E90FF", background: "#E3F1FF" }}>Billing</div>,
    <div style={{ color: "#F40D0D", background: "#FFEAEA " }}>Billing</div>,
    <div style={{ color: "#662D91", background: "#F8EEFF" }}>High Value</div>,
    <div style={{ color: "#1E90FF", background: "#E3F1FF" }}>Billing</div>,
  ]);
  return (
    <div style={{ position: "" }}>
      <div className="user-profile-conversation-page">
        <div className="userProfilePicCon">
          {UserInfo?.avatar ? (
            <img src={UserInfo?.avatar} alt="" />
          ) : (
            <img src={userImg} alt="" />
            // <div className="userProfilePicConNoImg">
            //   <p>{`${UserInfo?.firstname?.slice(
            //     0,
            //     1
            //   )} ${UserInfo?.lastname?.slice(0, 1)}`}</p>
            // </div>
          )}

          {/* <p>{`${UserInfo?.firstname} ${UserInfo?.lastname}`}</p> */}
          <p>{` Marvin McKinney`}</p>
        </div>
        <div className="userProfileAboutCovers">
          <div className="aboutUserColConv">
            <p>
              {" "}
              <span className="psvgIcon">
                <UserProfileIcon1 />
              </span>{" "}
              Ticket ID
            </p>

            {/* <p>{UserInfo?.email ? UserInfo?.email : "unavailable"}</p> */}
            <p>#53467</p>
          </div>

          <div className="aboutUserColConv">
            <p>
              {" "}
              <span className="psvgIcon">
                <img
                  src={pic}
                  alt=""
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
              </span>{" "}
              Assigned to
            </p>
            {/* <p>
              {UserInfo?.phoneNumber ? UserInfo?.phoneNumber : "unavailable"}
            </p> */}
            <p>Hammed Daudu</p>
          </div>

          <div className="aboutUserColConv">
            <p>
              {" "}
              <span className="psvgIcon">
                <UserProfileIcon2 />
              </span>{" "}
              Work Phone
            </p>
            {/* <p>
              {UserInfo?.phoneNumber ? UserInfo?.phoneNumber : "unavailable"}
            </p> */}
            <p>(217) 555-0113</p>
          </div>

          <div className="aboutUserColConv">
            <p>
              {" "}
              <span className="psvgIcon">
                <UserProfileIcon3 />
              </span>{" "}
              Address
            </p>
            <p>jeromebell@gmail.com</p>
          </div>
          <div className="ticktTagsgfs3">
            {tags.map((data) => {
              return data;
            })}
          </div>
        </div>

        {/* <div className="userTopActivities">
          {[..."123"].map((data) => {
            return (
              <div className="activityConPRcov">
                <div className="activityCountconvers">
                  {data}{" "}
                  <div
                    className="lineactivitivy"
                    style={data == 3 ? { display: "none" } : {}}
                  ></div>
                </div>
                <div className="activityCountconversText">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
}
