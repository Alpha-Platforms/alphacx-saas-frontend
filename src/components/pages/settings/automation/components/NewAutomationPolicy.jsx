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
import RSelect from "react-select";
import { connect } from "react-redux";

const NewAutomationPolicy = ({categoriz}) => {

  let router = useHistory();
  let {automationId} = useParams();

  const availablePlaceholders = [
    "name",
    "ticket",
    "category",
    "open",
    "closed",
  ];

  const [policyLoading, setPolicyLoading] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [ticketCategories, setTicketCategories] = useState([]);
  const [automationAgents, setAutomationAgents] = useState([]);
  const [automationTeams, setAutomationTeams] = useState([]);

  // NEW STATE
  const [automationBody, setAutomationBody] = useState({
    title: "",
    categories: [],
    durationDays: "0",
    durationHours: "0",
    action: []
  })

  const [RSCategoriesOptions, setRSCategoriesOptions] = useState([]);
  const [action, setAction] = useState([])
  const [sumbitting, setSumbitting] = useState(false)
  const [actionList, setActionList] = useState([0])
  //

  const [newPolicy, setNewPolicy] = useState({
    name: "",
    dueDays: 0,
    dueHours: 0,
    categories: null,
    agreements: [
      {
        days: 0,
        hours: 0,
        action: "",
        subject: "",
        body: "",
        recipients: null
      }
    ]
  });

  const mapRSelectNonPersonOptions = (entity, cb) => {
    const mappedItems = [];    
    entity.map(item => {
      mappedItems.push({value: item.id, label: item.name})
    })
    return cb(mappedItems)
  }

  const getActionData = action => {
    setAction(prev => {
      let temp = prev
      temp[action.id] = {...temp[action.id], ...action}
      console.log(temp, prev);
      return prev
    })
  }

  const removeActionItem = (item) => {
    setAction(prev => {
      const arr = prev.filter((_i) => _i.id !== item)
      return arr
    });
  }

  const handlechange = (e) => {
    let { name, value } = e.target;
    setAutomationBody(prev => {
      return {...prev, [name]: value}
    })
  };

  const handleRSChange = (iValues, {name}) => {
    const categoryIds = [];
    iValues.map(item => {
      categoryIds.push(item.value)
    })

    setAutomationBody( prev => {
      return {...prev, [name]: categoryIds}
    })
  }


  // FUNCTION TO CREATE AN AUTOMATION
  const startSubmitAutomation = () => {
    setSumbitting(true)
    setAutomationBody(prev => {
      return {...prev, action}
    })
  }

  const submitAutomation = async () => {

    const dueDate = Number(automationBody.durationDays) * 24 + Number(automationBody.durationHours);

    const requestBody = {
      "name": automationBody.title,
      "dueDate": dueDate,
      "reminder": {
        "categories": automationBody.categories,
        "agreements": automationBody.action
      }
    };
    
    setPolicyLoading(true);

    // USE REDUX 
    const res = await httpPostMain("sla", requestBody);

    if (res?.status === "success") {
      setPolicyLoading(false);
      NotificationManager.success("New Automation created", "Success");
      router.push("/settings/automations");
    } else {
      console.error(res.er);
      setPolicyLoading(false);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }

    // TEST CODE
    // setTimeout(() => {
    //   console.clear();
    //   console.log(requestBody);
    //   setPolicyLoading(false);
    //   NotificationManager.success("Fake submit successful", "Success");
    //   router.push("/settings/automations");
    // }, 1000);


  };

  // FUNCTION TO GET AUTOMATION INFORMATION IF IN EDIT MODE
  const getAutomationInfo = async () => {
    // const res = await httpGetMain(`sla/${automationId}`);
    // setPolicyLoading(false);
    // if (res?.status === "success") {
    //   // convertToDays(res?.data.due_date);
    //   setNewPolicy(res?.data);
    //   // setAssignType(res?.data?.reminder?.recipient?.type || "agent");
    // } else {
    //   return NotificationManager.error(res?.er?.message, "Error", 4000);
    // }

  };

  // FUNCTION TO UPDATE AN AUTOMATION IF IN EDIT MODE
  const updateAutomationPolicy = async () => {
    setPolicyLoading(true);

    const body = {
      name: newPolicy.name,
      description: newPolicy.description || "",
      reminder: {
        // categories: newPolicy.reminder.categories,
        recipient: newPolicy.reminder.recipient,
      },
    };

    const res = await httpPatchMain(`sla/${automationId}`, body);
    setPolicyLoading(false);
    if (res?.status === "success") {
      router.push("/settings/automation");
    } else {
      console.error(res.er);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  useEffect(() => {
    mapRSelectNonPersonOptions(categoriz, (category) => {
      setRSCategoriesOptions(category)
    })

    // check for edit mode and get automation with id
    if(automationId){
      getAutomationInfo()
    };

  },[])

  useEffect(() => {
    // Run submit when the flag is true
    if(sumbitting) submitAutomation()
  }, [sumbitting])


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

              <Link to="/settings/automations">
                <span className="text-custom">Automations</span>
              </Link>
              <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
              <span>{automationId ? "Edit" : "New"} Automation</span>
            </h6>
          </div>
          <div id="setting-form">
            <h5 className="mt-3 mb-4 f-16 fw-bold">
              {automationId ? "Edit" : "New"} Automation
            </h5>
            <form action="">
              <div className="form-group mt-3">
                <label for="slaName" className="f-14 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="slaName"
                  name="title"
                  value={automationBody.title}
                  onChange={handlechange}
                />
              </div>

              {/* CATEGORIES SELECTOR */}
              <div className="form-group mt-3">
                <label for="ticket" className="f-14 mb-1">
                  Ticket Categories
                </label>
                <RSelect 
                  className=""
                  name="categories"
                  isMulti
                  isClearable={false}
                  options={RSCategoriesOptions}
                  onChange={handleRSChange}
                />
              </div>

              {/* DURATION */}
              <div className="Resolution mt-3">
                <label for="ticket" className="f-14 mb-1">
                  Duration
                </label>

                {/* resolution-form mt-3 mb-4 d-flex align-items-center f-12  */}
                <div className="mb-3 d-flex align-items-center">
                  <input
                    type="number"
                    max={59}
                    min={0}
                    className="number-input form-control form-control-sm"
                    id="slaName"
                    name="durationDays"
                    value={automationBody?.dueDays}
                    onChange={handlechange}
                  />
                  <span className="ps-2 me-2">Days</span>
                  <input
                    type="number"
                    max={30}
                    min={0}
                    className="number-input form-control form-control-sm"
                    id="slaName"
                    name="durationHours"
                    onkeydown="return false"
                    value={automationBody?.dueHours}
                    onChange={handlechange}
                  />
                  <span className="ps-2 me-2">Hours</span>
                </div>
              </div>

              <div id="resolution-wrapper mt-4">
                <label for="ticket" className="d-flex p-2 acx-bg-blue-light-30">
                  Actions
                </label>
                
                {
                  actionList.map((action, i) => (
                    <AutomationAction
                      key={i}
                      // newPolicy={newPolicy}
                      // setNewPolicy={setNewPolicy}
                      availablePlaceholders={availablePlaceholders}
                      // agreement={agreement}
                      itemIndex={action}
                      getActionData={getActionData}
                      setActionList={setActionList}
                      removeActionItem={removeActionItem}
                    />
                  ))
                }

              </div>
            </form>

            <div className="float-end mb-5">
              <Link
                to="/settings/automations"
                className="btn btn-sm f-12 bg-outline-custom cancel px-4"
              >
                Cancel
              </Link>
              <a
                className="btn btn-sm ms-2 f-12 bg-custom px-4"
                onClick={
                  automationId ? updateAutomationPolicy : startSubmitAutomation
                }
              >
                {automationId ? "Save Changes" : "Create"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {categoriz: state.category.categories}
}

export default connect(mapStateToProps)(NewAutomationPolicy)
