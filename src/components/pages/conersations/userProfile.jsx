import React from "react";
import { CancelIconC } from "../../../assets/images/svgs";
import pic from "../../../assets/imgF/codeuiandyimg.png";
export default function UserProfile({ setshowUserProfile, UserInfo }) {
  return (
    <div style={{ position: "" }}>
      <div className="user-profile-conversation-page">
        <div
          className="cancelIconCovP"
          onClick={() => setshowUserProfile(false)}
        >
          <CancelIconC />
        </div>

        <div className="userProfilePicCon">
          <img src={UserInfo?.avatar} alt="" />
          <p>{`${UserInfo?.firstname} ${UserInfo?.lastname}`}</p>
        </div>
        <div className="userProfileAboutCovers">
          <div className="aboutUserColConv">
            <p>Email Address</p>
            <p>{UserInfo?.email}</p>
          </div>

          <div className="aboutUserColConv">
            <p>Work Phone</p>
            <p>{UserInfo?.phoneNumber}</p>
          </div>

          <div className="aboutUserColConv">
            <p>Address</p>
            <p>Plot 92, Obafemi Awolowo Way, Jabi</p>
          </div>
        </div>

        <div className="userTopActivities">
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
        </div>

        <div className="viewAllUserActivity">
          <p>View all activity</p>
        </div>
      </div>
    </div>
  );
}
