import React, { useState, useEffect } from "react";
import { CancelIconC } from "../../../assets/images/svgs";
import {
  UserProfileIcon1,
  UserProfileIcon2,
  UserProfileIcon3,
} from "../../../assets/images/svgs";
import userImg from "../../../assets/imgF/user.png";
import { capitalize } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as TicketAssignedSvg } from "../../../assets/icons/ticketassigned.svg";
import { ReactComponent as TicketIdSvg } from "../../../assets/icons/ticketid.svg";
import TicketIdIcon from "../../../assets/icons/ticketid.svg";
import TicketPriorityIcon from "../../../assets/icons/ticketpriority.svg";
import TicketStageIcon from "../../../assets/icons/ticketstage.svg";
import TicketCategoriesIcon from "../../../assets/icons/Ticketcategory.svg";
import TicketDueDateIcon from "../../../assets/icons/ticketduedate.svg";
import TicketSourceIcon from "../../../assets/icons/ticketsource.svg";
import { dateFormater } from "../../helpers/dateFormater";

export default function UserProfile({ ticket, UserInfo, isTicketDetails, timeLine = true }) {
  const [timeStampsMsg, setTimeStampsMsg] = useState([]);
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

  useEffect(() => {
    // getTickets();
    sortMsges(ticket[0].history);
  }, []);

  const CircleIcon = (props) => (
    <span style={{ backgroundColor: props.color }} className="cust-grey-circle">
      <img src={props.icon} alt="" className="pe-none" />
    </span>
  );

  const sortMsges = (msgs) => {
    let resultTimestamps = msgs.filter((observation) => {
      return (
        observation.response.includes("Ticket Stage has been marked")
      );
    });
    setTimeStampsMsg(resultTimestamps);
  };

  const sortTags = () => {};

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="user-profile-conversation-page">
        <div className="userProfileTwoColFormat">
          <div className="userProfilePicCon">
            {ticket[0]?.customer?.avatar ? (
              <img src={ticket[0]?.customer?.avatar} alt="" />
            ) : (
              // <img src={userImg} alt="" />
              <div className="userProfilePicConNoImgj">
                <p className="text-capitalize"
                  style={{ fontSize: "30px!important" }}
                >{`${capitalize(ticket[0]?.customer?.firstname?.slice(0,1))}${ticket[0]?.customer?.lastname == "default"? "" : capitalize(ticket[0]?.customer?.lastname?.slice(0, 1))}`}</p>
              </div>
            )}
            {/* 
            <p className="font-weight-bold"><b>{`${capitalize(ticket[0]?.customer?.firstname)} ${capitalize(
              ticket[0]?.customer?.lastname
            )}`}</b></p> */}
            <h6            
              className="mb-0 text-capitalize mt-2 pb-0"
            >
              <Link to={`/customers/${ticket[0]?.customer.id}`}>
                {`${capitalize(ticket[0]?.customer?.firstname  || '')} 
                  ${UserInfo?.lastname == "default"? "" : capitalize(ticket[0]?.customer?.lastname  || '')}`}
              </Link>
            </h6>
            {isTicketDetails && (
              <Fragment>
                <p className="mb-0 pb-0 pt-1 f-12">
                  {UserInfo?.email ? UserInfo?.email : "N/A"}
                </p>
                <p className="pt-1 f-12">
                  {UserInfo?.phoneNumber
                    ? UserInfo?.phoneNumber
                    : "N/A"}
                </p>
              </Fragment>
            )}
          </div>

          <div className="userProfileAboutCovers">
            {!isTicketDetails ? (
              <Fragment>
                <div className="aboutUserColConv">
                  <p>
                    {" "}
                    <span className="psvgIcon">
                      <UserProfileIcon1 />
                    </span>{" "}
                    Ticket ID
                  </p>

                  <p style={{ textTransform: "uppercase" }}>
                    <Link to={`tickets/${ticket[0]?.id}`}>
                      #{ticket[0]?.id.slice(ticket[0]?.id?.length - 8)}
                    </Link>
                  </p>
                </div>

                <div className="aboutUserColConv__"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 6
                  }}
                >
                  <div className="psvgIcon__" style={{marginRight: 17}}>
                    {ticket[0]?.assignee?.avatar ? (
                      <img
                        // src={ticket[0]?.assignee?.avatar || 'love'}
                        src={ticket[0]?.assignee?.avatar}
                        alt={`${ticket[0]?.assignee?.firstname} ${ticket[0]?.assignee?.lastname}`}
                        style={{
                          width: "30px", height: "30px",borderRadius: "50%", marginRight: "2px",
                        }}
                      />
                    ) : (       
                      <div className="avatar avatar-sm rounded-circle overflow-hidden acx-bg-secondary d-flex justify-content-center align-items-center">
                          <p className="fs-6 mb-0 text-white">{`${capitalize(ticket[0]?.assignee?.firstname?.slice(0,1))}${ticket[0]?.assignee?.lastname == "default" ? "" : capitalize(ticket[0]?.assignee?.lastname?.slice(0, 1))}`}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="acx-fs-8">Assigned to</p>
                    { ticket[0]?.assignee?
                      (<Link to={`/settings/profile/${ticket[0]?.assignee?.id}`}>
                        {`${capitalize(ticket[0]?.assignee?.firstname)} ${capitalize(ticket[0]?.assignee?.lastname)}`}
                      </Link>) 
                      :
                      (<span>Unassigned</span>)
                    }

                  </div>
                    
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
                    {UserInfo?.phoneNumber
                      ? UserInfo?.phoneNumber
                      : "unavailable"}
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
              </Fragment>
            ) : (
              <Fragment>
                <div className="aboutUserColConv__ d-flex align-items-center mb-3">
                  <div className="psvgIcon__" style={{marginRight: 17}}>
                    {ticket[0]?.assignee?.avatar ? (
                      <img
                        // src={ticket[0]?.assignee?.avatar || 'love'}
                        src={ticket[0]?.assignee?.avatar}
                        alt={`${ticket[0]?.assignee?.firstname} ${ticket[0]?.assignee?.lastname}`}
                        style={{
                          width: "30px", height: "30px",borderRadius: "50%", marginRight: "2px",
                        }}
                      />
                    ) : (       
                      <div className="avatar avatar-sm rounded-circle overflow-hidden acx-bg-secondary d-flex justify-content-center align-items-center">
                          <p className="small mb-0 text-white">{`${capitalize(ticket[0]?.assignee?.firstname?.slice(0,1))}${ticket[0]?.assignee?.lastname == "default" ? "" : capitalize(ticket[0]?.assignee?.lastname?.slice(0, 1))}`}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="acx-fs-8 mb-0">Assigned to</p>
                    { ticket[0]?.assignee?
                      (<Link to={`/settings/profile/${ticket[0]?.assignee?.id}`}>
                        {`${capitalize(ticket[0]?.assignee?.firstname)} ${capitalize(ticket[0]?.assignee?.lastname)}`}
                      </Link>) 
                      :
                      (<span>Unassigned</span>)
                    }
                  </div>
                </div>

                <ul className="ps-0 ticket-dleft">
                  <li className="ms-0">
                      <CircleIcon
                        color="rgba(108, 65, 129, 0.25)"
                        icon={TicketIdIcon}
                      />
                      <div>
                        <p className="pb-0 mb-0 f-12 text-muted op-9">Ticket ID</p>
                        <p className="text-muted f-13 text-uppercase" title={`${ticket[0]?.id}`}>
                          #{ticket[0]?.id.slice(0, 8)}...
                        </p>
                      </div>
                  </li>

                  <li className="ms-0">
                      <CircleIcon
                        color="rgba(244, 13, 13, 0.25)"
                        icon={TicketPriorityIcon}
                      />
                      <div>
                      <p className="pb-0 mb-0 f-12 text-muted op-9">Priority</p>
                      <p className="text-muted f-13 text-capitalize">
                        {ticket[0]?.priority?.name}
                      </p>
                      </div>
                  </li>

                  <li className="ms-0">
                      <CircleIcon
                        color="rgba(7, 150, 247, 0.25)"
                        icon={TicketStageIcon}
                      />
                      <div>
                          <p className="pb-0 mb-0 f-12 text-muted op-9">Stage</p>
                          <p className="text-muted f-13">
                            {ticket[0]?.status?.status}
                          </p>
                      </div>
                  </li>

                  <li className="ms-0">
                      <CircleIcon
                        color="rgba(255, 159, 67, 0.25)"
                        icon={TicketCategoriesIcon}
                      />
                      <div>
                      <p className="pb-0 mb-0 f-12 text-muted op-9">
                        Categories
                      </p>
                      <p className="text-muted f-13">
                        {ticket[0]?.category.name}
                      </p>
                      </div>
                  </li>

                  <li className="ms-0">
                      <CircleIcon
                        color="rgba(247, 37, 133, 0.25)"
                        icon={TicketDueDateIcon}
                      />
                      <div>
                        <p className="pb-0 mb-0 f-12 text-muted op-9">Due Date</p>
                        <p className="text-muted f-13">N/A</p>
                      </div>
                  </li>


                  <li className="ms-0">
                      <CircleIcon
                        color="rgba(17, 63, 100, 0.25)"
                        icon={TicketSourceIcon}
                      />
                      <div>
                      <p className="pb-0 mb-0 f-12 text-muted op-9">
                        Ticket Source
                      </p>
                      <p className="text-muted f-13">{ticket[0]?.channel}</p>
                      </div>
                  </li>
                </ul>

                {/*             <div className="aboutUserColConv">
              <p>
                {" "}
                <span className="psvgIcon">
                  <img src={TicketIdIcon} className="scale-9" alt="" />
                </span>{" "}
                ID
              </p>

              <p>#53467</p>
            </div>


            <div className="aboutUserColConv">
              <p>
                {" "}
                <span className="psvgIcon">
                  <img src={TicketPriorityIcon} className="scale-9" alt="" />
                </span>{" "}
                Priority
              </p>
              <p>
                Medium
              </p>
            </div>

            <div className="aboutUserColConv">
              <p>
                {" "}
                <span className="psvgIcon">
                  <img src={TicketStageIcon} className="scale-9" alt="" />
                </span>{" "}
                Stage
              </p>
              <p>Pending</p>
            </div>

            <div className="aboutUserColConv">
              <p>
                {" "}
                <span className="psvgIcon">
                  <CircleIcon icon={TicketCategoriesIcon} />
                </span>{" "}
                Categories
              </p>
              <p>Enquires</p>
            </div>
            <div className="aboutUserColConv">
              <p>
                {" "}
                <span className="psvgIcon">
                  <img src={TicketDueDateIcon} className="scale-9" alt="" />
                </span>{" "}
                Due Date
              </p>
              <p>31 August, 2021</p>
            </div>

            <div className="aboutUserColConv">
              <p>
                {" "}
                <span className="psvgIcon">
                  <img src={TicketSourceIcon} className="scale-9" alt="" />
                </span>{" "}
                <span>Ticket Source</span>
              </p>
              <p>Email</p>
            </div>
 */}
              </Fragment>
            )}
            <div className="ticktTagsgfs3">
              {ticket[0]?.tags == null ? (
                <p
                  style={{
                    fontSize: "11px",
                    textAlign: "center",
                    // margin: "auto",
                  }}
                >
                  No tag found
                </p>
              ) : (
                ticket[0]?.tags?.map((data) => {
                  return <div>{data}</div>;
                })
              )}
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
        {timeLine ? (
          <div className="container-timeline">
            <div className="box">
              <div className="borderContaner">
                <div className="circle"></div>
                <div className="img"></div>
              </div>
              <div className="textTimeLineSec">
                <span>
                  This message is assigned to{" "}
                  {`${capitalize(ticket[0]?.assignee?.firstname  || '')} ${capitalize(
                    ticket[0]?.assignee?.lastname  || ''
                  )}`}
                </span>
                <div className="timeLinehashtags">
                  <div style={{ textTransform: "uppercase" }}>
                    #{ticket[0]?.id.slice(ticket[0]?.id?.length - 8)}
                  </div>
                  <div>{dateFormater(ticket[0].created_at)}</div>
                </div>
              </div>
            </div>

            {ticket[0].history.length === 0 ? (
              ""
            ) : (
              <div className="box">
                <div className="borderContaner">
                  <div className="circle"></div>
                  <div className="img"></div>
                </div>
                <div className="textTimeLineSec">
                  <span>
                    {`${capitalize(ticket[0]?.assignee?.firstname  || '')} ${capitalize(
                      ticket[0]?.assignee?.lastname  || ''
                    )}`}{" "}
                    picked up this chat
                  </span>
                  <div className="timeLinehashtags">
                    <div style={{ textTransform: "uppercase" }}>
                      #{ticket[0]?.id.slice(ticket[0]?.id?.length - 8)}
                    </div>
                    <div>{dateFormater(ticket[0].created_at)}</div>
                    {/* {console.log(ticket[0])} */}
                  </div>
                </div>
              </div>
            )}
            {timeStampsMsg.map((data) => {
              return(
                <div className="box">
                  <div className="borderContaner">
                    <div className="circle"></div>
                    <div className="img"></div>
                  </div>
                  <div className="textTimeLineSec">
                    <span>
                      This {`${data.response}`} by <span className="fst-italic">{`${(data?.user?.firstname) ? capitalize(data?.user?.firstname) : ""} ${(data?.user?.lastname == "default") ? "" : data?.user?.lastname}`}</span>
                    </span>
                    <div className="timeLinehashtags flex-column align-items-start">
                      <div>
                        <a href={`#${data?.id}`} className="acx-link-primary d-block" style={{ textTransform: "uppercase" }}>
                          #{data?.id.slice(data?.id?.length - 8)}
                        </a>
                      </div>
                      <div>{dateFormater(data.created_at)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          ) : ""
        }
      </div>
    </div>
  );
}
