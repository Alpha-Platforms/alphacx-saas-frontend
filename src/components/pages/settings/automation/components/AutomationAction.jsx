import React, { useState, useEffect } from "react";
import EditorBox from "../../../../reusables/EditorBox";
import DeleteIcon from "../../../../../assets/icons/Delete.svg";
import AddIcon from "../../../../../assets/icons/add.svg";
import { Modal } from "react-responsive-modal";

import {httpGetMain } from "../../../../../helpers/httpMethods";

const AutomationAction = ({
  newPolicy,
  setNewPolicy,
  availablePlaceholders,
  agreement,
  index,
}) => {
  
  const [openDeleteActionModal, SetOpenDeleteActionModal] = useState(false);
  const [message, setMessage] = useState(agreement.body || "");
  const [placeholder, setPlaceholder] = useState("");
  const [availableDays, setAvailableDays] = useState();

  const [agents, setAgents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [assignType, setAssignType] = useState("agent");


  // function to get the list of all users/agents
  const getAgents = async () => {
    const res = await httpGetMain("agents");
    if (res?.status === "success") {
      setAgents(res?.data);
    }
  };
  // function to get the list of all groups
  const getGroups = async () => {
    const res = await httpGetMain("groups");
    if (res?.status === "success" || res?.status === "Success") {
      setGroups(res?.data);
    }
  };

  const handleRecipient = (e) => {
    const { value } = e.target;

    setNewPolicy({
      ...newPolicy,
      reminder:{
        ...newPolicy.reminder,
        agreements:[
          {
            ...newPolicy.reminder.agreements,
            recipient: { type: assignType, id: value }
          }
        ],
      },
    });
  };

  const addAction = () => {
    setNewPolicy({
      ...newPolicy,
      reminder: {
        ...newPolicy.reminder,
        agreements: [
          {
            ...newPolicy.reminder.agreements,
            days: 0, hours: 0, action: "email"
          }
        ],
      },
    });
  };

  const deleteAction = () => {
    SetOpenDeleteActionModal(false);
    let agreements = newPolicy.reminder.agreements;

    if (agreements.length === 1) {
      return;
    }
    let newAgreements = agreements.splice(index - 1, 1);

    setNewPolicy({
      ...newPolicy,
      reminder: {
        ...newPolicy.reminder,
        agreements: newAgreements,
      },
    });
  };

  const insertPlaceholder = (i) => {
    const shortCode = `{{${availablePlaceholders[i]}}}`;

    setMessage(message + " " + shortCode.toUpperCase() + " ");
    setPlaceholder(" " + shortCode.toUpperCase() + " ");
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    let agreements = newPolicy.reminder.agreements;
    agreements[index] = { ...agreements[index], [name]: value };

    setNewPolicy({
      ...newPolicy,
      reminder: {...newPolicy.reminder, agreements},
    });
  };

  useEffect(() => {

    getAgents();
    getGroups();
    
    let agreements = newPolicy.reminder.agreements;
    agreements[index] = {...agreements[index], body: message};

    setNewPolicy({
      ...newPolicy,
      reminder: {
        ...newPolicy.reminder,
        agreements
      }
    });
  },
    [message]
  );

  return (
    <>
      <Modal
        open={openDeleteActionModal}
        onClose={() => SetOpenDeleteActionModal(false)}
        center
      >
        <div className="p-5 w-100">
          <h6 className="mb-5">Are you sure you want to delete this Action?</h6>
          <div className="float-end mb-5">
            <a
              className="btn btn-sm f-12 bg-outline-custom cancel px-4"
              onClick={() => SetOpenDeleteActionModal(false)}
            >
              Cancel
            </a>
            <a
              className="btn btn-sm ms-2 f-12 bg-custom px-4"
              onClick={deleteAction}
            >
              Confirm
            </a>
          </div>
        </div>
      </Modal>


      <div className="card mt-2 mb-4">
        <div className="card-body border-0 p-3 automation-action">
          <div className="d-flex  flex-column assign">
            <label for="assign" className="mb-n1 me-4">
              Send
            </label>
            <br />
            <select
              className="form-select form-select-sm"
              id="assign"
              name="action"
              value={agreement?.action}
              // onChange={handleChange}
              onChange={
                () => {
                  console.log(newPolicy.reminder);
                }
              }
            >
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="sms">SMS</option>
            </select>
          </div>
          <div className="customer-form-first mt-3 py-4 pr-5 d-flex align-items-center">
            <input
              type="number"
              max={30}
              min={0}
              className="number-input form-control form-control-sm"
              id="slaName"
              name="days"
              value={agreement?.days}
              onChange={handleChange}
            />

            <label for="day" className="ps-2 me-2">
              Days
            </label>

            <input
              type="number"
              max={23}
              min={0}
              className="number-input form-control form-control-sm"
              id="slaName"
              name="hours"
              value={agreement?.hours}
              onChange={handleChange}
            />
            <label for="hour" className="ps-2 me-2">
              Hours
            </label>

            <label
              className="mb-n1"
              style={{
                minWidth: 120,fontSize: 16,
              }}
            >
              before due date
            </label>
          </div>
          <div className="form-group mt-3">
            <label for="slaName" className="mb-1">
              Subject
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="slaName"
              name="subject"
              value={agreement?.subject}
              onChange={handleChange}
            />
          </div>

          {/* RECIPIENTS */}
          {/* 
          setAssignType
          handleRecipient
          groups
          agents
          newPolicy?.reminder?.recipient?.id
          */}
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
              value={newPolicy?.reminder?.recipient?.id}
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
          </div>


          <div className="form-group mt-3">
            <label className="mb-1">Available Placeholders</label>
            <div className="available-placeholders">
              {availablePlaceholders.map((item, i) => (
                <p key={i} onClick={() => insertPlaceholder(i)}>
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="form-group mt-3">
            <label className="mb-1">Message</label>

            <EditorBox
              text={message || ""}
              // textParent={newPolicy}
              textFormat={"plain"}
              updateText={setMessage}
              placeholder={placeholder}
              setPlaceholder={setPlaceholder}
            />
          </div>
        </div>
        <div className="card-footer bg-light" id="customer-choice">
          <a className="addNewResolution" onClick={addAction}>
            <img src={AddIcon} alt="" className="img-fluid me-1 mt-n5 " /> Add
            New Action
          </a>
          
          {/* {newPolicy.reminder.agreements.length > 1 && ( */}
          {true && (
            <a
              className="delete-resolution mx-4"
              onClick={() => SetOpenDeleteActionModal(true)}
            >
              <img src={DeleteIcon} alt="" className="img-fluid me-1 mt-n5 " />{" "}
              Delete Action
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default AutomationAction;
