import React from "react";
import "./newAutomationPolicy.scss";
import "../automationSettings.scss";
import RightArrow from "../../../../../assets/imgF/arrow_right.png";
import DeleteIcon from "../../../../../assets/icons/Delete.svg";
import AddIcon from "../../../../../assets/icons/add.svg";
import EditorBox from "../../../../reusables/EditorBox";
import { useState } from "react";
import { Link } from "react-router-dom";

const NewAutomationPolicy = () => {
  const availablePlaceholders = [
    "name",
    "ticket",
    "category",
    "open",
    "closed",
  ];
  const [newPolicy, setNewPolicy] = useState({
    message: "",
    placeholder: "name",
  });
  return (
    <div className="new-automation-policy automation-settings">
      <div id="mainContent" className="container">
        <div className="card card-body bg-white border-0 p-5 mt-4">
          <div className="w-75">
            <div id="mainContentHeader">
              <h6 className="text-muted f-12">
                Settings{" "}
                <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                <Link to="/settings/automation">
                  <span className="text-custom">Automation Settings</span>{" "}
                </Link>
                <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                <span className="text-custom">New Policy</span>{" "}
              </h6>
            </div>
            <div id="setting-form">
              <h5 className="mt-3 mb-4 f-16 fw-bold">New SLA policy</h5>
              <form action="">
                <div className="form-group mt-3">
                  <label for="slaName" className="f-14 mb-1">
                    SLA Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="slaName"
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
                  ></textarea>
                </div>
                <div className="form-group mt-3">
                  <label for="ticket" className="f-14 mb-1">
                    Ticket Categories
                  </label>
                  <select
                    className="form-select form-select-sm f-14"
                    id="ticket"
                  >
                    <option>Complaints</option>
                    <option>Enquiry</option>
                    <option>Request</option>
                    <option>Delete Deduction</option>
                    <option>Service Pricing</option>
                    <option>Account Statement</option>
                  </select>
                </div>
                <div className="form-group mt-3">
                  <div className="d-flex">
                    <label for="slaName" className="f-14 mb-1 ">
                      Assignee:
                    </label>
                    <div className="form-check" style={{ marginLeft: 20 }}>
                      <input
                        className="form-check-input"
                        name="mail-radio"
                        type="radio"
                        id="radio-2"
                        value="own-server"
                        // checked={state.activeRadio === "own-server"}
                        // onChange={handleServerChange}
                      />
                      <label className="form-check-label f-14" for="radio-2">
                        Individual
                      </label>
                    </div>
                    <div className="form-check" style={{ marginLeft: 10 }}>
                      <input
                        className="form-check-input"
                        name="mail-radio"
                        type="radio"
                        id="radio-2"
                        value="own-server"
                        // checked={state.activeRadio === "own-server"}
                        // onChange={handleServerChange}
                      />
                      <label className="form-check-label f-14" for="radio-2">
                        Group
                      </label>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="slaName"
                  />
                </div>
                {/* <div id="ticket-result">
                  <div className="alert-custom px-2 mt-2 rounded">
                    <p className="mt-n1">
                      Complaints{" "}
                      <span className="ms-2 mb-n2 fs-2 close">&times;</span>
                    </p>
                  </div>
                </div> */}

                <div className="Resolution mt-3">
                  <p className="my-4">SLA Due Date</p>
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
                  <div className="card my-4 f-12">
                    <div className="card-body border-0">
                      <div className="d-flex  flex-column assign">
                        <label for="assign" className="mb-n1 me-4">
                          Send
                        </label>
                        <br />
                        <select
                          className="form-select form-select-sm"
                          id="assign"
                        >
                          <option>Email</option>
                          <option>Customer Care Group</option>
                          <option>Customer Care Group3</option>
                          <option>Customer Care Group4</option>
                        </select>
                      </div>
                      <div
                        className="
                    customer-form-first
                    mt-3
                    py-4
                    pr-5
                    d-flex
                    align-items-center
                  "
                      >
                        <select
                          className="form-select form-select-sm me-3"
                          id="day2"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </select>
                        <label for="day" className="mb-n1 me-4">
                          Days
                        </label>

                        <select
                          className="form-select form-select-sm me-3"
                          id="hour"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </select>
                        <label for="hour" className="mb-n1 me-4">
                          Hours
                        </label>

                        <select
                          className="form-select form-select-sm me-3"
                          id="mins"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </select>
                        <label for="minute" className="mb-n1 me-4">
                          Minutes
                        </label>
                        <label
                          className="mb-n1"
                          style={{
                            minWidth: 120,

                            fontSize: 16,
                          }}
                        >
                          before due date
                        </label>
                      </div>
                      <div className="form-group mt-3 mb-5">
                        <label for="slaName" className="f-14 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="slaName"
                        />
                      </div>
                      <div className="form-group mt-3 mb-5">
                        <label className="f-14 mb-1">
                          Available Placeholders
                        </label>
                        <div className="available-placeholders">
                          {availablePlaceholders.map((item, i) => (
                            <p
                              key={i}
                              className={
                                newPolicy?.placeholder === item
                                  ? "selected"
                                  : ""
                              }
                              onClick={() =>
                                setNewPolicy({
                                  ...newPolicy,
                                  placeholder: item,
                                })
                              }
                            >
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="form-group mt-3">
                        <label className="f-14 mb-1">Message</label>

                        <EditorBox
                          text={newPolicy.message}
                          textParent={newPolicy}
                          updateText={setNewPolicy}
                        />
                      </div>
                    </div>
                    <div className="card-footer bg-light" id="customer-choice">
                      <a className="addNewResolution">
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
                  </div>
                </div>
              </form>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAutomationPolicy;
