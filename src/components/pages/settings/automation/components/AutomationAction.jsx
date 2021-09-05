import React, { useState, useEffect } from "react";
import EditorBox from "../../../../reusables/EditorBox";
import DeleteIcon from "../../../../../assets/icons/Delete.svg";
import AddIcon from "../../../../../assets/icons/add.svg";
import { Modal } from "react-responsive-modal";

import { connect } from "react-redux";

import RSelect from "react-select";
import {httpGetMain } from "../../../../../helpers/httpMethods";

const AutomationAction = ({
  newPolicy,
  setNewPolicy,
  availablePlaceholders,
  agreement,
  index,
  getActionData,
  agents,
  teams

}) => {
  
  const [action, setAction] = useState({});
  const [recipients, setRecipients] = useState([])

  const [openDeleteActionModal, SetOpenDeleteActionModal] = useState(false);
  const [actionBody, setActionBody] = useState("editor body during edit" || "");
  const [placeholder, setPlaceholder] = useState("");

  const [recipientType, setRecipientType] = useState("agent");

  const [RSAgents, setRSAgents] = useState([]);
  const [RSTeams, setRSTeams] = useState([]);

  const [actionChannels] = useState([
    {label: "Email", value: "Email"},
    {label: "WhatsApp", value: "WhatsApp"},
    {label: "SMS", value: "SMS"}
  ])


// F U N C T I O N S
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
  };

  const handleRSChange = (iValues, {name}) => {
    let data = iValues.value;

    if (Array.isArray(iValues)) {
      const recipientIds = [];
      iValues.map(item => {
        recipientIds.push(item.value)
      })
      data = recipientIds;

    }

    setAction( prev => {
      return {...prev, [name]: data}
    })
  }

  const loadRecipients = () => {
      if(recipientType === 'agent'){
        setRecipients(RSAgents);
      } else {
        setRecipients(RSTeams);
      }
  }

  const mapRSelectPersonOptions = (persons, cb) => {
    const mappedItems = [];    
    persons.map(item => {
      mappedItems.push({value: item.id, label: item.firstname +" "+ item.lastname})
    })
    return cb(mappedItems)
  }

  const mapRSelectNonPersonOptions = (entity, cb) => {
    const mappedItems = [];    
    entity.map(item => {
      mappedItems.push({value: item.id, label: item.name})
    })
    return cb(mappedItems)
  }

  useEffect(() => {

    // loadRecipients(recipientType);

    mapRSelectNonPersonOptions(teams, (teams) => {
      setRSTeams(teams)
    })

    mapRSelectPersonOptions(agents, (agents) => {
      setRSAgents(agents)
    })
  },[]);

  useEffect(() => {
    getActionData(action);
  }, [action])

  useEffect(() => {
    setAction( prev => {
      return {...prev, body: actionBody}
    })
  }, [actionBody])

  return (
    <>

      <div className="card mt-2 mb-4">
        <div className="card-body border-0 p-3 automation-action">
          <div className="d-flex  flex-column assign">
            <label for="channel">Send</label>
            
            <RSelect 
              className=""
              id="channel"
              name="channel"
              onChange={handleRSChange}
              options={actionChannels}
            />

          </div>

          <div className="mt-4 d-flex align-items-center">
            
            <div className="input-group w-50 me-2">
              <input type="number" name="days" ariaLabel="Last name" className="form-control" onChange={handleChange} />
              <span className="input-group-text acx-fs-8">Days</span>
              <input type="number" name="hours" ariaLabel="First name" className="form-control" onChange={handleChange} />
              <span className="input-group-text acx-fs-8">Hours</span>
            </div>

            <label>before due date </label>

          </div>

          <div className="form-group mt-3">
            <label for="subject">Subject</label>
            <input
              type="text"
              className="form-control mt-2"
              id="subject"
              name="subject"
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
                  checked={recipientType === "agent"}
                  onChange={(e) => {
                    setRecipientType(e.target.value)
                    loadRecipients()
                  }}
                />
                <label className="form-check-label f-14" for="radio-2">Agents</label>
              </div>
              <div className="form-check" style={{ marginLeft: 10 }}>
                <input
                  className="form-check-input"
                  name="recipientType"
                  type="radio"
                  value="group"
                  checked={recipientType === "group"}
                  onChange={(e) => {
                    setRecipientType(e.target.value)
                    loadRecipients()
                  }}
                />
                <label className="form-check-label f-14" for="radio-2">Teams</label>
              </div>
            </div>

            <div className="form-group">
              <RSelect 
                className=""
                isClearable={false}
                name="recipients"
                isMulti
                options={recipients}
                onChange={handleRSChange}
              />
            </div>

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

const mapStateToProps = state => {
  return {
    agents: state.agent.agents,
    teams: state.group.groups
  }
}

export default connect(mapStateToProps)(AutomationAction);