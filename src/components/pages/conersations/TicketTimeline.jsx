import React, { useState, useEffect } from "react";
import { capitalize } from "@material-ui/core";
import { dateFormater } from "../../helpers/dateFormater";

export default function TicketTimeline({ ticket, UserInfo, isTicketDetails, timeLine = true }) {
  const [timeStampsMsg, setTimeStampsMsg] = useState([]);

  useEffect(() => {
    sortMsges(ticket[0].history);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortMsges = (msgs) => {
    let resultTimestamps = msgs.filter((observation) => {
      return (
        observation.response.includes("Ticket Stage has been marked")
      );
    });
    setTimeStampsMsg(resultTimestamps);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="user-profile-conversation-page tktimeline-wrapper">
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
                <div key={data.id} className="box">
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
                        <a href={`#${data?.id}`} className="acx-link-primary d-block">
                          Ticket {`${data.response.replace("Ticket Stage has been marked as ", "")}`}
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
