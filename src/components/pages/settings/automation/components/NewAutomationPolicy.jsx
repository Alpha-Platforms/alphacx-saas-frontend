import React from "react";
import "./newAutomationPolicy.scss";
import "../automationSettings.scss";
import RightArrow from "../../../../../assets/imgF/arrow_right.png";

const NewAutomationPolicy = () => {
  return (
    <div className="new-automation-policy automation-settings">
      <div id="mainContent" class="container">
        <div class="card card-body bg-white border-0 p-5 mt-4">
          <div class="w-75">
            <div id="mainContentHeader">
              <h6 class="text-muted f-12">
                Settings{" "}
                <img src={RightArrow} alt="" class="img-fluid mx-2 me-3" />
                <a href="/settings/automation/">
                  <span class="text-custom">Automation Settings</span>{" "}
                </a>
                <img src={RightArrow} alt="" class="img-fluid mx-2 me-3" />
                <span class="text-custom">New Policy</span>{" "}
              </h6>
            </div>
            <div id="setting-form">
              <h5 class="mt-3 mb-4 f-16 fw-bold">New SLA policy</h5>
              <form action="">
                <div class="form-group mt-3">
                  <label for="slaName" class="f-14 mb-1">
                    SLA Name
                  </label>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="slaName"
                  />
                </div>
                <div class="form-group mt-3">
                  <label for="Desc" class="f-14 mb-1">
                    Description
                  </label>
                  <textarea class="form-control" rows="4" id="Desc"></textarea>
                </div>
                <div class="form-group mt-3">
                  <label for="ticket" class="f-14 mb-1">
                    Ticket Type
                  </label>
                  <select class="form-select form-select-sm f-14" id="ticket">
                    <option>Complaints</option>
                    <option>Enquiry</option>
                    <option>Request</option>
                    <option>Delete Deduction</option>
                    <option>Service Pricing</option>
                    <option>Account Statement</option>
                  </select>
                </div>
                <div class="form-group mt-3">
                  <div className="d-flex">
                    <label for="slaName" class="f-14 mb-1 ">
                      Assignee:
                    </label>
                    <div class="form-check" style={{ marginLeft: 20 }}>
                      <input
                        class="form-check-input"
                        name="mail-radio"
                        type="radio"
                        id="radio-2"
                        value="own-server"
                        // checked={state.activeRadio === "own-server"}
                        // onChange={handleServerChange}
                      />
                      <label class="form-check-label f-14" for="radio-2">
                        Individual
                      </label>
                    </div>
                    <div class="form-check" style={{ marginLeft: 10 }}>
                      <input
                        class="form-check-input"
                        name="mail-radio"
                        type="radio"
                        id="radio-2"
                        value="own-server"
                        // checked={state.activeRadio === "own-server"}
                        // onChange={handleServerChange}
                      />
                      <label class="form-check-label f-14" for="radio-2">
                        Group
                      </label>
                    </div>
                  </div>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="slaName"
                  />
                </div>
                {/* <div id="ticket-result">
                  <div class="alert-custom px-2 mt-2 rounded">
                    <p class="mt-n1">
                      Complaints{" "}
                      <span class="ms-2 mb-n2 fs-2 close">&times;</span>
                    </p>
                  </div>
                </div> */}

                <div class="Resolution mt-3">
                  <p class="my-4">Resolution Target</p>
                  <div
                    class="
                resolution-form
                mt-3
                px-4
                py-3
                bg-light
                d-flex
                align-items-center
                f-12
              "
                  >
                    <label for="day" class="mb-n1 me-2">
                      Days
                    </label>
                    <select class="form-select form-select-sm" id="day">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>

                    <label for="hour" class="mb-n1 ms-5 me-2">
                      Hours
                    </label>
                    <select class="form-select form-select-sm" id="hr">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>

                    <label for="minute" class="mb-n1 ms-5 me-2">
                      Minutes
                    </label>
                    <select class="form-select form-select-sm" id="minute">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                </div>
                <div id="resolution-wrapper">
                  <div class="card my-4 f-12">
                    <div class="card-body border-0">
                      <div class="d-flex align-items-center assign">
                        <label for="assign" class="mb-n1 me-4">
                          Assign
                        </label>
                        <select class="form-select form-select-sm" id="assign">
                          <option>Customer Care Group</option>
                          <option>Customer Care Group</option>
                          <option>Customer Care Group3</option>
                          <option>Customer Care Group4</option>
                        </select>
                      </div>
                      <div
                        class="
                    customer-form-first
                    mt-3
                    py-4
                    pr-5
                    d-flex
                    align-items-center
                  "
                      >
                        <label for="day" class="mb-n1 me-5">
                          Days
                        </label>
                        <select class="form-select form-select-sm" id="day2">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </select>
                        <label for="hour" class="mb-n1 ms-5 me-2">
                          Hours
                        </label>
                        <select class="form-select form-select-sm" id="hour">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </select>
                        <label for="minute" class="mb-n1 ms-5 me-2">
                          Minutes
                        </label>
                        <select class="form-select form-select-sm" id="mins">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </select>
                      </div>

                      <div
                        class="
                    customer-form-second
                    mt-3
                    py-4
                    d-flex
                    align-items-center
                  "
                      >
                        <select
                          class="form-select form-select-sm f-13"
                          id="select-email"
                        >
                          <option>Email</option>
                          <option>Email</option>
                          <option>Email</option>
                          <option>Email</option>
                        </select>
                        <select
                          class="form-select form-select-sm f-13 mx-3"
                          id="hour2"
                        >
                          <option>5</option>
                          <option>5</option>
                          <option>5</option>
                          <option>5</option>
                        </select>
                        <select
                          class="form-select form-select-sm f-13"
                          id="minute2"
                        >
                          <option>Whatsapp</option>
                          <option>Whatsapp</option>
                          <option>Whatsapp</option>
                          <option>Whatsapp</option>
                        </select>

                        <select
                          class="form-select form-select-sm f-13 mx-3"
                          id="assignment"
                        >
                          <option>Assignment</option>
                          <option>Assignment</option>
                          <option>Assignment</option>
                          <option>Assignment</option>
                        </select>
                        <select
                          class="form-select form-select-sm f-13"
                          id="24hours"
                        >
                          <option>24 hours</option>
                          <option>24 hours</option>
                          <option>24 hours</option>
                          <option>24 hours</option>
                        </select>
                        <select
                          class="form-select form-select-sm f-13 mx-3"
                          id="before"
                        >
                          <option>Before</option>
                          <option>Before</option>
                          <option>Before</option>
                          <option>Before</option>
                        </select>
                        <select
                          class="form-select form-select-sm f-13"
                          id="resolution"
                        >
                          <option>Resolution</option>
                          <option>Resolution</option>
                          <option>Resolution</option>
                          <option>Resolution</option>
                        </select>
                        <select
                          class="form-select form-select-sm f-13 ms-3"
                          id="notification"
                        >
                          <option>Select notification</option>
                          <option>Select notification</option>
                          <option>Select notification</option>
                          <option>Select notification</option>
                        </select>
                      </div>
                    </div>
                    <div class="card-footer bg-light" id="customer-choice">
                      <a class="addNewResolution">
                        {/*
                  <object
                    data="../assets/alphatickets/icons/add.svg"
                    class="img-fluid me-1 resolution-icon"
                  ></object>
                  */}{" "}
                        Add New Resolution
                      </a>
                      <a class="delete-resolution mx-4">
                        {/*
                  <object
                    data="../assets/alphatickets/icons/Delete.svg"
                    class="img-fluid me-1 mt-n5 resolution-icon"
                  ></object>
                  */}{" "}
                        Delete Resolution
                      </a>
                      <a href="#">
                        {/*
                  <object
                    data="../assets/alphatickets/icons/duplicate.svg"
                    class="img-fluid me-1 mt-n1 resolution-icon"
                    resolution-icon
                  ></object>
                  */}{" "}
                        Duplicate Resolution
                      </a>
                    </div>
                  </div>
                </div>
              </form>

              <div class="float-end mb-5">
                <a
                  href="automation.html"
                  class="btn btn-sm f-12 bg-outline-custom cancel px-4"
                >
                  Cancel
                </a>
                <a
                  href="automation-table.html"
                  class="btn btn-sm ms-2 f-12 bg-custom px-4"
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
