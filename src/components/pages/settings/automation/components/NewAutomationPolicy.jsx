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
  const [automationAgents, setAutomationAgents] = useState([]);
  const [automationTeams, setAutomationTeams] = useState([]);
  const [newPolicy, setNewPolicy] = useState({
    reminder: {
      agreements: policyID
        ? []
        : [
            {
              name: "",
              dueDate: 100,
              reminder: {
                categories: [],
                assigned_to: {
                  agent: [],
                },
                agreement: [
                  {
                    days: 0,
                    action: "",
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
    const { name, value } = e.target;

    setNewPolicy({ ...newPolicy, [name]: value });
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

  const addAgent = (item) => {
    let agents = newPolicy?.reminder?.assigned_to?.agent
      ? newPolicy?.reminder?.assigned_to?.agent
      : [];

    agents.push(item.id);
    setNewPolicy({
      ...newPolicy,
      reminder: { ...newPolicy.reminder, assigned_to: { agent: agents } },
    });
  };
  const removeAgent = (id) => {
    let agents = newPolicy?.reminder?.assigned_to?.agent;
    agents = agents.filter((itm) => itm !== id);

    setNewPolicy({
      ...newPolicy,
      reminder: { ...newPolicy.reminder, assigned_to: { agent: agents } },
    });
  };

  const getAgents = async () => {
    const res = await httpGetMain("agents");
    if (res?.status === "success") {
      console.log(res.data);
      setAutomationAgents(res?.data);
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  //function to Get automation information if in edit mode
  const getAutomationInfo = async () => {
    const res = await httpGetMain(`sla/${policyID}`);
    setPolicyLoading(false);
    if (res?.status === "success") {
      setNewPolicy({ ...res?.data });
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  // function to get the list of all ticket categories
  const getTicketCategories = async () => {
    const res = await httpGetMain("categories");
    if (res?.status === "success") {
      console.clear();
      console.log("categories", res);
      setTicketCategories(res?.data?.categories);
      getAgents();
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  // function to update an Automation if in edit mode
  const updateAutomationPolicy = async () => {
    setPolicyLoading(true);
    console.clear();
    console.log(newPolicy);
    const body = {
      name: newPolicy.name,
      dueDate: 100,
      description: newPolicy.description || "",
      reminder: {
        categories: newPolicy.reminder.categories,
        agreements: newPolicy.reminder.agreements,
      },
    };
    const res = await httpPatchMain(`sla/${policyID}`, body);
    setPolicyLoading(false);
    if (res?.status === "success") {
      console.log(res);
      router.push("/settings/automation");
    } else {
      console.error(res.er);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  // function to create an Automation
  const submitAutomationPolicy = async () => {
    setPolicyLoading(true);
    console.clear();
    console.log(newPolicy);
    const res = await httpPostMain("sla", newPolicy);
    setPolicyLoading(false);
    if (res?.status === "success") {
      console.log(res);
    } else {
      console.error(res.er);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };
  useEffect(() => {
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
                  Automation Name
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
              <div className="form-group mt-3">
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
                {/* right here */}
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
              </div>

              <div className="Resolution mt-3">
                <p className="my-4">Automation Due Date</p>
                <div
                  className="
                resolution-form
                mt-3
                px-4
                py-3
                mb-4
                d-flex
                align-items-center
                f-12
              "
                >
                  <label for="day" className="mb-n1 me-2">
                    Days
                  </label>
                  <select className="form-select form-select-sm" id="day">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>

                  <label for="hour" className="mb-n1 ms-5 me-2">
                    Hours
                  </label>
                  <select className="form-select form-select-sm" id="hr">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>

                  <label for="minute" className="mb-n1 ms-5 me-2">
                    Minutes
                  </label>
                  <select className="form-select form-select-sm" id="minute">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
              </div>
              <div id="resolution-wrapper mt-4">
                <label for="ticket" className="f-14">
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
