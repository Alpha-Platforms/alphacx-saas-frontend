import React, { useState, useEffect } from "react";
import EditorBox from "../../../../reusables/EditorBox";
import DeleteIcon from "../../../../../assets/icons/Delete.svg";
import AddIcon from "../../../../../assets/icons/add.svg";
import { Modal } from "react-responsive-modal";

import RSelect from "react-select";
import {httpGetMain } from "../../../../../helpers/httpMethods";

const AutomationAction = ({
  newPolicy,
  setNewPolicy,
  availablePlaceholders,
  agreement,
  index,

  fnFromParent
}) => {
  
  const [action, setAction] = useState({});
  const [actionRecipients, setActionRecipients] = useState([])

  const [openDeleteActionModal, SetOpenDeleteActionModal] = useState(false);
  const [actionBody, setActionBody] = useState(agreement.body || "");
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

    console.log("zeelz", agents)

  };
  // function to get the list of all groups
  const getGroups = async () => {
    const res = await httpGetMain("groups");
    if (res?.status === "success" || res?.status === "Success") {
      setGroups(res?.data);
    }
  };

  const addAction = () => {
    
  };

  const deleteAction = () => {
  };

  const insertPlaceholder = (i) => {
    const shortCode = `{${availablePlaceholders[i]}}`;

    setActionBody(actionBody + " " + shortCode + " ");
    setPlaceholder(" " + shortCode + " ");
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    setAction( prev => {
      return {...prev, [name]: value}
    })

    console.log(action);
    fnFromParent(action);
    return;

    let agreements = newPolicy.reminder.agreements;
    agreements[index] = { ...agreements[index], [name]: value };

    setNewPolicy({
      ...newPolicy,
      reminder: {...newPolicy.reminder, agreements},
    });

  };

  const handleRSChange = (iValues, {name}) => {
    const recipientIds = [];
    iValues.map(item => {
      recipientIds.push(item.value)
    })

    setAction( prev => {
      return {...prev, [name]: recipientIds}
    })

    console.log(action);

  }

  const loadRecipients = (type) => {
      const mappedRecipients = [];
      if(type === 'agent'){
        agents.map(item => {
          mappedRecipients.push({value: item.id, label: item.firstname +" "+ item.lastname})
        })
      } else {
        groups.map(item => {
          mappedRecipients.push({value: item.id, label: item.name})
        })
      }

      setActionRecipients(mappedRecipients);
      setAssignType(type);

  }


  useEffect(() => 
  {
    getAgents();
    getGroups();
  },
    [actionBody]
  );

  useEffect(() =>
    {
      loadRecipients(assignType);
    }
    ,[]
  );

  return (
    <>

      <div className="card mt-2 mb-4">
        <div className="card-body border-0 p-3 automation-action">
          <div className="d-flex  flex-column assign">
            <label for="actionChannel">Send</label>
            
            <select
              className="form-select form-select-sm mt-2"
              id="actionChannel"
              name="actionChannel"
              onChange={handleChange}
            >
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="sms">SMS</option>
            </select>
          </div>

          <div className="mt-4 d-flex align-items-center">
            
            <div className="input-group w-50 me-2">
              <input type="number" name="actionDays" ariaLabel="Last name" className="form-control" onChange={handleChange} />
              <span className="input-group-text acx-fs-8">Days</span>
              <input type="number" name="actionHours" ariaLabel="First name" className="form-control" onChange={handleChange} />
              <span className="input-group-text acx-fs-8">Hours</span>
            </div>

            <label>before due date </label>

          </div>

          <div className="form-group mt-3">
            <label for="actionSubject">Subject</label>
            <input
              type="text"
              className="form-control mt-2"
              id="actionSubject"
              name="actionSubject"
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group mt-3">
            <label for="ticket" className="f-14 mb-1">
              Action Recipient(s)
            </label>
            <div className="d-flex">
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="recipientType"
                  type="radio"
                  value="agent"
                  checked={assignType === "agent"}
                  onChange={(e) => loadRecipients(e.target.value)}
                />
                <label className="form-check-label f-14" for="radio-2">Agents</label>
              </div>
              <div className="form-check" style={{ marginLeft: 10 }}>
                <input
                  className="form-check-input"
                  name="recipientType"
                  type="radio"
                  value="group"
                  checked={assignType === "group"}
                  onChange={(e) => loadRecipients(e.target.value)}
                />
                <label className="form-check-label f-14" for="radio-2">Teams</label>
              </div>
            </div>

            <div className="form-group">
              <RSelect 
                className=""
                isClearable={false}
                name="actionRecipients"
                isMulti
                options={actionRecipients}
                onChange={handleRSChange}
              />
            </div>

              {/* onChange={handleRecipient} */}
              {/* {assignType === "agent" &&
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
                ))} */}

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
              text={actionBody || ""}
              // textParent={newPolicy}
              textFormat={"plain"}
              updateText={setActionBody}
              placeholder={placeholder}
              setPlaceholder={setPlaceholder}
            />

          </div>
        </div>
        <div className="card-footer bg-light" id="customer-choice">
          <a className="addNewResolution" onClick={addAction}>
            <img src={AddIcon} alt="" className="img-fluid me-1 mt-n5 " />
            Add New Action
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


    </>
  );
};

export default AutomationAction;