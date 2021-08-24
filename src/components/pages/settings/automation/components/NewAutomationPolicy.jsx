import React from "react";
import "./newAutomationPolicy.scss";
import "../automationSettings.scss";
import RightArrow from "../../../../../assets/imgF/arrow_right.png";
import DeleteIcon from "../../../../../assets/icons/Delete.svg";
import AddIcon from "../../../../../assets/icons/add.svg";
import EditorBox from "../../../../reusables/EditorBox";
import { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import {
  httpGetMain,
  httpPatchMain,
  httpPostMain,
} from "../../../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
import ScaleLoader from "react-spinners/ScaleLoader";
import AutomationAction from "./AutomationAction";

import RSelect from "react-select/creatable";

const NewAutomationPolicy = () => {
  let router = useHistory();
  let { policyID } = useParams();
  const availablePlaceholders = [
    "name",
    "ticket",
    "category",
    "open",
    "closed",
  ];
  const [assignType, setAssignType] = useState("agent");

  const [policyLoading, setPolicyLoading] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [ticketCategories, setTicketCategories] = useState([]);
  const [agents, setAgents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [automationAgents, setAutomationAgents] = useState([]);
  const [automationTeams, setAutomationTeams] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [newPolicy, setNewPolicy] = useState({
    reminder: {
      agreements: policyID
        ? []
        : [
            {
              name: "",
              due_date: 0,
              reminder: {
                categories: [],

                agreement: [
                  {
                    days: 0,
                    action: "email",
                    subject: "",
                    body: "",
                  },
                ],
              },
            },
          ],
    },
  });

  const handlechange = (e) => {
    let { name, value } = e.target;
    if (name === "days" && value > 30) {
      value = 30;
    }
    if (name === "days" && value < 0) {
      value = 0;
    }
    if (name === "hours" && value > 23) {
      value = 23;
    }
    if (name === "hours" && value < 0) {
      value = 0;
    }
    setNewPolicy({ ...newPolicy, [name]: value });
  };

  const handleRecipient = (e) => {
    const { value } = e.target;

    setNewPolicy({
      ...newPolicy,
      reminder: {
        ...newPolicy.reminder,
        recipient: { type: assignType, id: value },
      },
    });
  };

  // function to add category id to automation categories array
  const addCategory = (item) => {
    let categories = newPolicy.reminder.categories
      ? newPolicy.reminder.categories
      : [];
    categories.push(item.id);
    setNewPolicy({
      ...newPolicy,
      reminder: { ...newPolicy.reminder, categories },
    });
  };
  const removeCategory = (id) => {
    let categories = newPolicy.reminder.categories;
    categories = categories.filter((cat) => cat !== id);

    setNewPolicy({
      ...newPolicy,
      reminder: { ...newPolicy.reminder, categories },
    });
  };

  const convertToMinutes = (days, hours) => {
    let daysToMins = days * 24;
    daysToMins *= 60;
    let hoursToMins = hours * 60;

    let totalMins = daysToMins + hoursToMins;
    return totalMins;
  };
  const convertToDays = (minutes) => {
    let minuteToDays = minutes / 60;
    let days = Math.floor(minuteToDays / 24);
    let hours = minuteToDays % 24;
  };

  // const addAgent = (item) => {
  //   let agents = newPolicy?.reminder?.assigned_to?.agent
  //     ? newPolicy?.reminder?.assigned_to?.agent
  //     : [];

  //   agents.push(item.id);
  //   setNewPolicy({
  //     ...newPolicy,
  //     reminder: { ...newPolicy.reminder, assigned_to: { agent: agents } },
  //   });
  // };
  // const removeAgent = (id) => {
  //   let agents = newPolicy?.reminder?.assigned_to?.agent;
  //   agents = agents.filter((itm) => itm !== id);

  //   setNewPolicy({
  //     ...newPolicy,
  //     reminder: { ...newPolicy.reminder, assigned_to: { agent: agents } },
  //   });
  // };

  // const getAgents = async () => {
  //   const res = await httpGetMain("agents");
  //   if (res?.status === "success") {
  //     console.log(res.data);
  //     setAutomationAgents(res?.data);
  //   } else {
  //     return NotificationManager.error(res?.er?.message, "Error", 4000);
  //   }
  // };

  //function to Get automation information if in edit mode
  const getAutomationInfo = async () => {
    const res = await httpGetMain(`sla/${policyID}`);
    setPolicyLoading(false);
    if (res?.status === "success") {
      convertToDays(res?.data.due_date);
      setNewPolicy(res?.data);
      setAssignType(res?.data?.reminder?.recipient?.type || "agent");
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  // function to get the list of all ticket categories
  const getTicketCategories = async () => {
    const res = await httpGetMain("categories");
    if (res?.status === "success") {
      setTicketCategories(res?.data?.categories);
      // getAgents();
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  // function to get the list of all users/agents
  const getAgents = async () => {
    const res = await httpGetMain("agents");
    if (res?.status === "success") {
      setAgents(res?.data);
    }
  };
  // function to get the list of all sgroups
  const getGroups = async () => {
    const res = await httpGetMain("groups");
    if (res?.status === "success" || res?.status === "Success") {
      setGroups(res?.data);
    }
  };

  // function to update an Automation if in edit mode
  const updateAutomationPolicy = async () => {
    setPolicyLoading(true);
    let convertedAgreements = newPolicy.reminder.agreements;
    for (let index = 0; index < convertedAgreements.length; index++) {
      convertedAgreements[index] = {
        ...convertedAgreements[index],
        days: convertToMinutes(
          convertedAgreements[index].day,
          convertedAgreements[index].hours
        ),
      };
    }

    const body = {
      name: newPolicy.name,
      dueDate: convertToMinutes(newPolicy.days, newPolicy.hours),
      due_date: convertToMinutes(newPolicy.days, newPolicy.hours),
      description: newPolicy.description || "",
      reminder: {
        categories: newPolicy.reminder.categories,
        agreements: convertedAgreements,
        recipient: newPolicy.reminder.recipient,
      },
    };

    const res = await httpPatchMain(`sla/${policyID}`, body);
    setPolicyLoading(false);
    if (res?.status === "success") {
      router.push("/settings/automation");
    } else {
      console.error(res.er);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  // function to create an Automation
  const submitAutomationPolicy = async () => {
    setPolicyLoading(true);

    let convertedAgreements = newPolicy.reminder.agreements;

    for (let index = 0; index < convertedAgreements.length; index++) {
      convertedAgreements[index] = {
        ...convertedAgreements[index],
        days: convertToMinutes(
          convertedAgreements[index].day,
          convertedAgreements[index].hours
        ),
      };
    }

    const body = {
      name: newPolicy.name,

      dueDate: convertToMinutes(newPolicy.days, newPolicy.hours),
      due_date: convertToMinutes(newPolicy.days, newPolicy.hours),
      description: newPolicy.description || "",
      reminder: {
        categories: newPolicy.reminder.categories,
        agreements: convertedAgreements,
        recipient: newPolicy.reminder.recipient,
      },
    };

    const slaData = {
      "name": "Quick Tickets SLA frontend",
      "dueDate": 72,
      "reminder": {
          "categories": ["23838da6-0566-11ea-9a9f-362b9e155667"],
          "agreements": [
              {
                  "hours": 3,
                  "action": "email",
                  "subject": "Hello, ticket expires soon",
                  "body": "you ticket will expire soon. attend to it",
                  "recipient": {
                      "type": "agent",
                      "ids": ["15b7c94e-0fc1-4619-9f7b-d985b41e84f9"]
                  }
              }
          ]
      }
    }

    const res = await httpPostMain("sla", slaData);

    setPolicyLoading(false);

    if (res?.status === "success") {
      router.push("/settings/automation");
    } else {
      console.error(res.er);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }

  };

  useEffect(() => {
    getAgents();
    getGroups();
    getTicketCategories();
    if (policyID) {
      setPolicyLoading(true);
      getAutomationInfo();
    }
  }, []);
  return (
    <div className="new-automation-policy">
      {policyLoading && (
        <div
          className={`cust-table-loader ${
            policyLoading && "add-loader-opacity"
          }`}
        >
          <ScaleLoader loading={policyLoading} color={"#006298"} />
        </div>
      )}
      <div className="card card-body bg-white border-0 p-0 ">
        <div className="col-md-8">
          <div id="mainContentHeader">
            <h6 className="text-muted f-14">
              <Link to="/settings">
                <span className="text-custom">Settings</span>
              </Link>{" "}
              <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
              {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
              <Link to="/settings/automation">
                <span className="text-custom">Automations</span>
              </Link>
              <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
              {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
              <span>{policyID ? "Edit" : "New"} Automation</span>
            </h6>
          </div>
          <div id="setting-form">
            <h5 className="mt-3 mb-4 f-16 fw-bold">
              {policyID ? "Edit" : "New"} Automation
            </h5>
            <form action="">
              <div className="form-group mt-3">
                <label for="slaName" className="f-14 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="slaName"
                  name="name"
                  value={newPolicy?.name || ""}
                  onChange={handlechange}
                />
              </div>
              <div className="form-group mt-3">
                <label for="Desc" className="f-14 mb-1">
                  Description
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  id="Desc"
                  name="description"
                  value={newPolicy?.description || ""}
                  onChange={handlechange}
                ></textarea>
              </div>
              <div className="form-group mt-3">
                <label for="ticket" className="f-14 mb-1">
                  Ticket Categories
                </label>

                <div
                  className="form-select form-control-sm f-14 ticket-category"
                  onClick={() => setShowCategories(!showCategories)}
                >
                  {newPolicy?.reminder?.categories &&
                    newPolicy?.reminder?.categories.map((cat, i) => (
                      <div key={i} className="cat-tag">
                        <p>
                          {ticketCategories.length > 0 &&
                            ticketCategories.filter(
                              (item) => item.id === cat
                            )[0].name}
                        </p>
                        <span onClick={() => removeCategory(cat)}>x</span>
                      </div>
                    ))}

                  {showCategories && (
                    <div className={"drop-list"}>
                      {ticketCategories.length > 0 &&
                        ticketCategories
                          .filter((item) =>
                            newPolicy?.reminder?.categories
                              ? !newPolicy?.reminder?.categories.includes(
                                  item.id
                                )
                              : ![].includes(item.id)
                          )
                          ?.map((item, i) => (
                            <p key={i} onClick={() => addCategory(item)}>
                              {item.name}
                            </p>
                          ))}
                    </div>
                  )}
                </div>
              </div>

              {/* RECIPIENTS */}
              <div className="form-group mt-3">
                <label for="ticket" className="f-14 mb-1">
                  Recipients
                </label>
                <div className="d-flex">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="mail-radio"
                      type="radio"
                      id="radio-2"
                      value="agent"
                      checked={assignType === "agent"}
                      onChange={(e) => setAssignType(e.target.value)}
                    />
                    <label className="form-check-label f-14" for="radio-2">
                      Agent
                    </label>
                  </div>
                  <div className="form-check" style={{ marginLeft: 10 }}>
                    <input
                      className="form-check-input"
                      name="mail-radio"
                      type="radio"
                      id="radio-2"
                      value="group"
                      checked={assignType === "group"}
                      onChange={(e) => setAssignType(e.target.value)}
                    />
                    <label className="form-check-label f-14" for="radio-2">
                      Group
                    </label>
                  </div>
                </div>
                <select
                  className="form-select form-select-sm f-14"
                  name="agent_id"
                  value={newPolicy?.reminder?.recipient?.id || ""}
                  onChange={handleRecipient}
                >
                  <option value="">Select recipient</option>

                  {assignType === "agent" &&
                    agents.map((agent) => (
                      <option key={agent.id} value={agent.id}>
                        {agent.firstname + " " + agent.lastname}
                      </option>
                    ))}
                  {assignType === "group" &&
                    groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name.toUpperCase()}
                      </option>
                    ))}
                </select>

                {/* <RSelect
                  className="rselectfield"
                  style={{ fontSize: "12px" }}
                  onChange={(value, actionMeta) => {
                    setRecipients(value);
                    // if $recipients is buggy use $value
                  }}
                  isClearable={false}
                  isMulti
                  options={
                    // populate 'options' prop from $agents, with names remapped
                    agents.map((item) => {
                      return {
                        value: item.firstname + " " + item.lastname,
                        label: item.firstname + " " + item.lastname,
                      };
                    })
                  }
                /> */}
              </div>

              {/* <div className="form-group mt-3">
                <div className="d-flex">
                  <label for="slaName" className="f-14 mb-1 ">
                    Assign To:
                  </label>
                  <div className="form-check" style={{ marginLeft: 20 }}>
                    <input
                      className="form-check-input"
                      name="mail-radio"
                      type="radio"
                      id="radio-2"
                      value="agent"
                      checked={assignType === "agent"}
                      onChange={(e) => setAssignType(e.target.value)}
                    />
                    <label className="form-check-label f-14" for="radio-2">
                      Agents
                    </label>
                  </div>
                  <div className="form-check" style={{ marginLeft: 10 }}>
                    <input
                      className="form-check-input"
                      name="mail-radio"
                      type="radio"
                      id="radio-2"
                      value="team"
                      checked={assignType === "team"}
                      onChange={(e) => setAssignType(e.target.value)}
                    />
                    <label className="form-check-label f-14" for="radio-2">
                      Team
                    </label>
                  </div>
                </div>

                <div
                  className="form-select form-control-sm f-14 ticket-category"
                  onClick={() => setShowAssign(!showAssign)}
                >
                  {newPolicy?.reminder?.assigned_to?.agent &&
                    newPolicy?.reminder?.assigned_to?.agent.map((agent, i) => (
                      <div key={i} className="cat-tag">
                        <p>
                          <a
                            style={{
                              backgroundColor: "#006298",
                              padding: "5px 6px",
                              color: "white",
                              borderRadius: 20,
                              marginRight: 10,
                            }}
                          >
                            {automationAgents.length > 0 &&
                              automationAgents
                                .filter((item) => item.id === agent)[0]
                                .firstname.charAt(0)
                                .toUpperCase()}
                            {automationAgents.length > 0 &&
                              automationAgents
                                .filter((item) => item.id === agent)[0]
                                .lastname.charAt(0)
                                .toUpperCase()}
                          </a>
                          {automationAgents.length > 0 &&
                            automationAgents.filter(
                              (item) => item.id === agent
                            )[0].email}
                        </p>
                        <span onClick={() => removeAgent(agent)}>x</span>
                      </div>
                    ))}
                  {showAssign && (
                    <div className={"drop-list"}>
                      {automationAgents
                        .filter(
                          (item) =>
                            !newPolicy?.reminder?.assigned_to?.agent.includes(
                              item.id
                            )
                        )
                        ?.map((item, i) => (
                          <p key={i} onClick={() => addAgent(item)}>
                            <a
                              style={{
                                backgroundColor: "#006298",
                                padding: "5px 6px",
                                color: "white",
                                borderRadius: 20,
                                marginRight: 10,
                              }}
                            >
                              {item.firstname.charAt(0).toUpperCase()}
                              {item.lastname.charAt(0).toUpperCase()}
                            </a>
                            {item.email}
                          </p>
                        ))}
                    </div>
                  )}
                </div>
              </div> */}

              <div className="Resolution mt-3">
                <label for="ticket" className="f-14 mb-1">
                  Duration
                </label>

                {/* resolution-form mt-3 mb-4 d-flex align-items-center f-12  */}
                <div className="mb-3 d-flex align-items-center">
                  <input
                    type="number"
                    max={30}
                    max={0}
                    className="number-input form-control form-control-sm"
                    id="slaName"
                    name="days"
                    value={newPolicy?.days || 0}
                    onChange={handlechange}
                  />
                  <span className="ps-2 me-2">Days</span>
                  <input
                    type="number"
                    max={23}
                    min={0}
                    className="number-input form-control form-control-sm"
                    id="slaName"
                    name="hours"
                    onkeydown="return false"
                    value={newPolicy?.hours || 0}
                    onChange={handlechange}
                  />
                  <span className="ps-2 me-2">Hours</span>
                </div>
              </div>
              <div id="resolution-wrapper mt-4">
                <label for="ticket" className="d-flex p-2 acx-bg-blue-light-30">
                  Actions
                </label>
                {/* <div className="card my-4 f-12"> */}
                {newPolicy?.reminder?.agreements.map((agreement, i) => (
                  <AutomationAction
                    key={i}
                    newPolicy={newPolicy}
                    setNewPolicy={setNewPolicy}
                    availablePlaceholders={availablePlaceholders}
                    agreement={agreement}
                    index={i}
                  />
                ))}

                {/* <div className="card-footer bg-light" id="customer-choice">
                    <a className="addNewResolution" onClick={addAction}>
                      <img
                        src={AddIcon}
                        alt=""
                        className="img-fluid me-1 mt-n5 "
                      />{" "}
                      Add New Action
                    </a>
                    <a className="delete-resolution mx-4">
                      <img
                        src={DeleteIcon}
                        alt=""
                        className="img-fluid me-1 mt-n5 "
                      />{" "}
                      Delete Action
                    </a>
                  </div>
                </div> */}
              </div>
            </form>

            <div className="float-end mb-5">
              <Link
                to="/settings/automation"
                className="btn btn-sm f-12 bg-outline-custom cancel px-4"
              >
                Cancel
              </Link>
              <a
                className="btn btn-sm ms-2 f-12 bg-custom px-4"
                onClick={
                  policyID ? updateAutomationPolicy : submitAutomationPolicy
                }
              >
                Save Changes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAutomationPolicy;
