import React, { useState } from "react";
import { CancelIconC } from "../../../assets/images/svgs";
import pic from "../../../assets/imgF/codeuiandyimg.png";
import {
  UserProfileIcon1,
  UserProfileIcon2,
  UserProfileIcon3,
} from "../../../assets/images/svgs";
import userImg from "../../../assets/imgF/user.png";
import { capitalize } from "@material-ui/core";
import {Link} from 'react-router-dom';

export default function UserProfile({ ticket, UserInfo }) {
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
    <div style={{ width: "100%", height: "100%" }}>
      <div className="user-profile-conversation-page">
        <div className="userProfileTwoColFormat">
          <div className="userProfilePicCon">
            {ticket[0]?.customer?.avatar ? (
              <img src={ticket[0]?.customer?.avatar} alt="" />
            ) : (
              <img src={userImg} alt="" />
              // <div className="userProfilePicConNoImg">
              //   <p>{`${UserInfo?.firstname?.slice(
              //     0,
              //     1
              //   )} ${UserInfo?.lastname?.slice(0, 1)}`}</p>
              // </div>
            )}
{/* 
            <p className="font-weight-bold"><b>{`${capitalize(ticket[0]?.customer?.firstname)} ${capitalize(
              ticket[0]?.customer?.lastname
            )}`}</b></p> */}
            <h6 className="mb-0 text-capitalize mt-2"><b>{`${capitalize(ticket[0]?.customer?.firstname)} ${capitalize(
              ticket[0]?.customer?.lastname
            )}`}</b></h6>
            {/* <p>{` Marvin McKinney`}</p> */}
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

              <p>#53467</p>
            </div>

            <div className="aboutUserColConv">
              <p>
                {" "}
                <span className="psvgIcon">
                  {ticket[0]?.assignee?.avatar ? (
                    <img
                      src={ticket[0]?.assignee?.avatar}
                      alt=""
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginRight: "2px",
                      }}
                    />
                  ) : (
                    <div
                      className="userProfilePicConNoImg"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginRight: "19px",
                      }}
                    >
                      <span>{`${ticket[0]?.assignee?.firstname?.slice(
                        0,
                        1
                      )} ${ticket[0]?.assignee?.lastname?.slice(0, 1)}`}</span>
                    </div>
                  )}
                </span>{" "}
                Assigned to
              </p>
              {/* <p>
              {UserInfo?.phoneNumber ? UserInfo?.phoneNumber : "unavailable"}
            </p> */}
              <p><Link to="/settings/users">{`${capitalize(ticket[0]?.assignee?.firstname)} ${capitalize(
                ticket[0]?.assignee?.lastname
              )}`}</Link></p>
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
              
            </p> */}
              <p>
                {UserInfo?.phoneNumber ? UserInfo?.phoneNumber : "unavailable"}
              </p>
            </div>

            <div className="aboutUserColConv">
              <p>
                {" "}
                <span className="psvgIcon">
                  <UserProfileIcon3 />
                </span>{" "}
                Email Address
              </p>
              <p>{UserInfo?.email ? UserInfo?.email : "unavailable"}</p>
            </div>
            <div className="ticktTagsgfs3">
              {tags.map((data) => {
                return data;
              })}
            </div>
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
        <div className="container-timeline">
          <div className="box">
            <div className="borderContaner">
              <div className="circle"></div>
              <div className="img"></div>
            </div>
            <div className="textTimeLineSec">
              <span>
                consectetur adipiscing elit. Quis pellentesque vitae nisi nulla.
                Diam elit, ipsum id rhoncus
              </span>
              <div className="timeLinehashtags">
                <div>#53467</div>
                <div>13 March - 31 July, 2021</div>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="borderContaner">
              <div className="circle"></div>
              <div className="img"></div>
            </div>
            <div className="textTimeLineSec">
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis
                pellentesque vitae nisi nulla. Diam elit, ipsum id rhoncus
              </span>
              <div className="timeLinehashtags">
                <div style={{ background: "#DAECF8" }}>#53467</div>
                <div>13 March - 31 July, 2021</div>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="borderContaner">
              <div className="circle"></div>
              <div style={{ height: "0px" }} className="img"></div>
            </div>
            <div className="textTimeLineSec">
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis
                pellentesque vitae nisi nulla. Diam elit, ipsum id rhoncus
              </span>
              <div className="timeLinehashtags">
                <div>#53467</div>
                <div>13 March - 31 July, 2021</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
