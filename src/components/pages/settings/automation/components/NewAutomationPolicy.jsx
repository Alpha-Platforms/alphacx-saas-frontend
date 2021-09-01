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
// import { value } from "rumble-charts/lib/helpers";

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

  const [policyLoading, setPolicyLoading] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [ticketCategories, setTicketCategories] = useState([]);
  const [automationAgents, setAutomationAgents] = useState([]);
  const [automationTeams, setAutomationTeams] = useState([]);
  const [agreementList, setAgreementList] = useState([{id: 1}]);

  // NEW STATE
  const [slaBody, setSlaBody] = useState({
    title: "",
    categories: []
  })

  const [actionData, setActionData] = useState([])
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

  const fnFromParent = actionData => {
    setActionData(actionData)
  }


  const handlechange = (e) => {

    let { name, value } = e.target;

    setPolicyLoading(true);

    setSlaBody(prev => {
      return {...prev, [name]: value}
    })

    // setNewPolicy({ ...newPolicy, [name]: value });
    
  };

  useEffect(() => {
    setPolicyLoading(false);
    console.log(slaBody);
  },[slaBody])
  

  // const convertToMinutes = (days, hours) => {
  //   let daysToMins = days * 24;
  //   daysToMins *= 60;
  //   let hoursToMins = hours * 60;

  //   let totalMins = daysToMins + hoursToMins;
  //   return totalMins;
  // };
  // const convertToDays = (minutes) => {
  //   let minuteToDays = minutes / 60;
  //   let days = Math.floor(minuteToDays / 24);
  //   let hours = minuteToDays % 24;
  // };


  // FUNCTION TO GET THE LIST OF TICKET CATEGORIES
  const getTicketCategories = async () => {
    const res = await httpGetMain("categories");
    if (res?.status === "success") {
      setTicketCategories(res?.data?.categories);
      // getAgents();
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };


  // FUNCTION TO CREATE AN ANIMATION
  const submitAutomationPolicy = async () => {
    setPolicyLoading(true);


    const body = {
      // construct request body with swagger blueprint
    };

    // const res = await httpPostMain("sla", body);

    setTimeout(() => {
      setPolicyLoading(false);
      console.log(actionData);
    }, 2000);
    

    // if (res?.status === "success") {
    //   router.push("/settings/automation");
    // } else {
    //   console.error(res.er);
    //   return NotificationManager.error(res?.er?.message, "Error", 4000);
    // }

  };


  // FUNCTION TO GET AUTOMATION INFORMATION IF IN EDIT MODE
  const getAutomationInfo = async () => {
    const res = await httpGetMain(`sla/${policyID}`);
    setPolicyLoading(false);
    if (res?.status === "success") {
      // convertToDays(res?.data.due_date);
      setNewPolicy(res?.data);
      // setAssignType(res?.data?.reminder?.recipient?.type || "agent");
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  // FUNCTION TO UPDATE AN AUTOMATION IF IN EDIT MODE
  const updateAutomationPolicy = async () => {
    setPolicyLoading(true);
    let convertedAgreements = newPolicy.reminder.agreements;
    for (let index = 0; index < convertedAgreements.length; index++) {
      convertedAgreements[index] = {
        ...convertedAgreements[index],
        days: convertedAgreements[index].day + convertedAgreements[index].hours
      };
    }

    const body = {
      name: newPolicy.name,
      // dueDate: convertToMinutes(newPolicy.days, newPolicy.hours),
      // due_date: convertToMinutes(newPolicy.days, newPolicy.hours),
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

  useEffect(() => {

    // console.log(agreementList);

    getTicketCategories();

    if (policyID) {
      setPolicyLoading(true);
      getAutomationInfo();
    }
  }, [newPolicy]);

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
                  name="title"
                  value={slaBody.title}
                  onChange={handlechange}
                />
              </div>

              {/* 
              addCategory()
              removeCategory()
              setShowCategories()
              */}

              {/* CATEGORIES SELECTOR */}
              <div className="form-group mt-3">
                <label for="ticket" className="f-14 mb-1">
                  Ticket Categories
                </label>
                <RSelect 
                  className=""
                  isMulti
                  options={[
                    {value: "foo", label: "foobar"},
                    {value: "bar", label: "barbaz"}
                  ]}
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
                    name="dueDays"
                    value={newPolicy?.dueDays}
                    onChange={handlechange}
                  />
                  <span className="ps-2 me-2">Days</span>
                  <input
                    type="number"
                    max={30}
                    min={0}
                    className="number-input form-control form-control-sm"
                    id="slaName"
                    name="dueHours"
                    onkeydown="return false"
                    value={newPolicy?.dueHours}
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
                  newPolicy?.agreements?.map((agreement, i) => (
                    <AutomationAction
                      key={i}
                      newPolicy={newPolicy}
                      setNewPolicy={setNewPolicy}
                      availablePlaceholders={availablePlaceholders}
                      agreement={agreement}
                      index={i}
                      fnFromParent={fnFromParent}
                    />
                  ))
                }

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