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
  itemIndex,
  getActionData,
  agents,
  teams,
  setActionList,
  removeActionItem

}) => {
  
  const [action, setAction] = useState({id: itemIndex});
  const [recipients, setRecipients] = useState([])
  const [daysHours, setDaysHours] = useState({days: 0, hours: 0})

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [actionBody, setActionBody] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  const [recipientType, setRecipientType] = useState("agent");

  const [RSAgents, setRSAgents] = useState([]);
  const [RSTeams, setRSTeams] = useState([]);

  const [actionChannels] = useState([
    {label: "Email", value: "Email"},
    {label: "SMS", value: "SMS"}
  ])


// F U N C T I O N S
  const addAction = (e) => {
    e.preventDefault();
    // setActionList(prev => [...prev, prev[prev.length-1]+1]);
    setActionList(prev => [...prev, prev[prev.length-1]+1]);
  };

  const deleteAction = (e, itemIndex) => {
    e.preventDefault();
    setActionList(prev => {
      const arr = prev.filter((item) => item !== itemIndex)
      return arr
    });

    removeActionItem(itemIndex)

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

  const handleDaysHoursChange = (e) => {
    let { name, value } = e.target;

    setDaysHours( prev => {
      return {...prev, [name]: value}
    })

    if(name === "days"){
      setAction(prev => {
        return {...prev, hours: value*24 + Number(daysHours.hours)}
      })
    } else {
      setAction(prev => {
        return {...prev, hours: Number(value) + daysHours.days*24}
      })
    }
  };

  const handleRSChange = (iValues, {name}) => {
    let data = iValues.value;

    if (Array.isArray(iValues)) {
      const ids = [];
      iValues.map(item => {
        ids.push(item.value)
      })

      setAction( prev => {
        return {...prev, [name]: {ids, type: recipientType}}
      })

    } else {
      setAction( prev => {
        return {...prev, [name]: data}
      })
    }

    
  }

  const loadRecipients = () => {

    const mappedItems = []; 

    if(recipientType === "agent"){   
      agents.map(item => {
        mappedItems.push({value: item.id, label: item.firstname +" "+ item.lastname})
      })
    } else {  
      teams.map(item => {
        mappedItems.push({value: item.id, label: item.name})
      })
    }

    setRecipients(mappedItems);

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
            <label htmlFor="channel">Send</label>
            
            <RSelect 
              className=""
              id="channel"
              name="action"
              openMenuOnFocus={true}
              onChange={handleRSChange}
              options={actionChannels}
            />

          </div>

          <div className="mt-4 d-flex align-items-center">
            
            <div className="input-group w-50 me-2">
              <input type="number" name="days" ariaLabel="Last name" className="form-control" onChange={handleDaysHoursChange} />
              <span className="input-group-text acx-fs-8">Days</span>
              <input type="number" name="hours" ariaLabel="First name" className="form-control" onChange={handleDaysHoursChange} />
              <span className="input-group-text acx-fs-8">Hours</span>
            </div>

            <label>before due date </label>

          </div>

          <div className="form-group mt-3">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              className="form-control mt-2"
              id="subject"
              name="subject"
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group mt-3">
            <label htmlFor="ticket" className="f-14 mb-1">
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
                  onClick={(e) => {
                    setRecipientType(e.target.value)
                  }}
                />
                <label className="form-check-label f-14" htmlFor="radio-2">Agents</label>
              </div>
              <div className="form-check" style={{ marginLeft: 10 }}>
                <input
                  className="form-check-input"
                  name="recipientType"
                  type="radio"
                  value="group"
                  checked={recipientType === "group"}
                  onClick={(e) => {
                    setRecipientType(e.target.value)
                  }}
                />
                <label className="form-check-label f-14" htmlFor="radio-2">Teams</label>
              </div>
            </div>

            <div className="form-group">
              <RSelect 
                className=""
                isClearable={false}
                name="recipient"
                isMulti
                onMenuOpen={() => loadRecipients()}
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
          <button className="addNewResolution" onClick={addAction}>
            <img src={AddIcon} alt="" className="img-fluid me-1 mt-n5 " />
            Add New Action
          </button>
          
          {true && (
            <button
              className="delete-resolution mx-4"
              onClick={(e) => {
                e.preventDefault()
                setDeleteConfirm(true)
              }}
            >
              <img src={DeleteIcon} alt="" className="img-fluid me-1 mt-n5 " />{" "}
              Delete Action
            </button>
          )}
        </div>
      </div>

      <Modal
        open={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        center
      >
        <div className="p-5 w-100">
          <h6 className="mb-5">Are you sure you want to delete this Action?</h6>
          <div className="float-end mb-5">
            <button
              className="btn btn-sm f-12 bg-outline-custom cancel px-4"
              onClick={() => setDeleteConfirm(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm ms-2 f-12 bg-custom px-4"
              onClick={(e) => {
                deleteAction(e, itemIndex)
                setDeleteConfirm(false)
              }}
            >
              Confirm
            </button>
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