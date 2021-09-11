// @ts-nocheck
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
import {uuid} from '../../../../../helper';

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

  // NEW STATE
  const [automationBody, setAutomationBody] = useState({
    title: "",
    categories: [],
    durationDays: "0",
    durationHours: "0",
    action: []
  });

  const [RSCategoriesOptions, setRSCategoriesOptions] = useState([]);

  const generateActionTemplate = id => ({
    id,
    channel: '',
    days: '0',
    hours: '0',
    subject: '',
    body: '',
    recipientType: 'agent',
    recipientValue: [],
    recipientOptions: [],
    placeholder: ''
  })

  const [actions, setActions] = useState([generateActionTemplate(uuid())]);

  const mapRSelectNonPersonOptions = (entity, cb) => {
    const mappedItems = [];    
    entity.map(item => {
      mappedItems.push({value: item.id, label: item.name})
    })
    return cb(mappedItems)
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setAutomationBody(prev => {
      return {...prev, [name]: value}
    })
  };

  const handleCategorySelect = (value) => {
    setAutomationBody(prev => ({...prev, categories: value}));
  }

  // FUNCTION TO CREATE AN AUTOMATION
  const createAutomation = async () => {
    const dueDate = Number(automationBody.durationDays) * 24 + Number(automationBody.durationHours);
    const requestBody = {
      name: automationBody.title,
      dueDate,
      reminder: {
        categories: automationBody.categories.map(cat => cat.value),
        agreements: actions.map(act => ({
          days: act.days,
          hours: act.hours,
          action: act.channel.value,
          subject: act.subject,
          body: act.body,
          recipient: {
            type: act.recipientType,
            ids: act.recipientValue.map(val => val.value)
          }
        }
        )
      )
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
  };

  console.log("AutomationID => ", automationId);


  // FUNCTION TO GET AUTOMATION INFORMATION IF IN EDIT MODE
  const getAutomationInfo = async () => {
    const res = await httpGetMain(`sla/${automationId}`);
    setPolicyLoading(false);
    if (res?.status === "success") {
      console.log('Data => ', res?.data);
    } else {
      console.log('Error => ', res)
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };



  // FUNCTION TO UPDATE AN AUTOMATION IF IN EDIT MODE
  const updateAutomationPolicy = async () => {
    /* setPolicyLoading(true);

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
      router.push("/settings/automations");
    } else {
      console.error(res.er);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    } */
  };

  

  useEffect(() => {
    mapRSelectNonPersonOptions(categoriz, (category) => {
      setRSCategoriesOptions(category)
    })

    // check for edit mode and get automation with id
    if(automationId){
      getAutomationInfo()
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])




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
                <label htmlFor="slaName" className="f-14 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="slaName"
                  name="title"
                  value={automationBody.title}
                  onChange={handleInputChange}
                />
              </div>

              {/* CATEGORIES SELECTOR */}
              <div className="form-group mt-3">
                <label htmlFor="ticket" className="f-14 mb-1">
                  Ticket Categories
                </label>
                <RSelect 
                  className=""
                  name="categories"
                  isMulti
                  isClearable={false}
                  value={automationBody.categories}
                  options={RSCategoriesOptions}
                  onChange={handleCategorySelect}
                />
              </div>

              {/* DURATION */}
              <div className="Resolution mt-3">
                <label htmlFor="ticket" className="f-14 mb-1">
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                  />
                  <span className="ps-2 me-2">Hours</span>
                </div>
              </div>

              <div id="resolution-wrapper mt-4">
                <label htmlFor="ticket" className="d-flex p-2 acx-bg-blue-light-30">
                  Actions
                </label>
                
                {
                  actions.map((action, i) => (
                    <AutomationAction
                      key={i}
                      availablePlaceholders={availablePlaceholders}
                      action={action}
                      setActions={setActions}
                      generateActionTemplate={generateActionTemplate}
                      actions={actions}
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
              <button
                className="btn btn-sm ms-2 f-12 bg-custom px-4"
                onClick={
                  automationId ? updateAutomationPolicy : createAutomation
                }
              >
                {automationId ? "Save Changes" : "Create"}
              </button>
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
