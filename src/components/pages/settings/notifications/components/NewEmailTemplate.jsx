import React from "react";
import "./newEmailTemplate.scss";
import "../NotificationSettings.scss";
import RightArrow from "../../../../../assets/imgF/arrow_right.png";
import DeleteIcon from "../../../../../assets/icons/Delete.svg";
import AddIcon from "../../../../../assets/icons/add.svg";
import EditorBox from "../../../../reusables/EditorBox";
import { useState } from "react";
import { Link } from "react-router-dom";

const NewEmailTemplate = () => {
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
    <div className="new-email-template notification-settings">
      <div id="mainContent" className="container">
        <div className="card card-body bg-white border-0 p-5 mt-4">
          <div className="w-75">
            <div id="mainContentHeader">
              <h6 className="text-muted f-12">
                Settings{" "}
                <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                <Link to="/settings/notifications/">
                  <span className="text-custom">Notifications Settings</span>{" "}
                </Link>
                <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                <span className="text-custom">Email Template</span>{" "}
              </h6>
            </div>
            <div id="setting-form">
              <h5 className="mt-3 mb-4 f-16 fw-bold">Create Email Template</h5>
              <form action="">
                <div className="form-group mt-3">
                  <label for="slaName" className="f-14 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="slaName"
                  />
                </div>

                <div className="form-group mt-3">
                  <label for="ticket" className="f-14 mb-1">
                    Notification Category
                  </label>
                  <select
                    className="form-select form-select-sm f-14"
                    id="ticket"
                  >
                    <option>SMS</option>
                    <option>WhatsApp</option>
                    <option>Email</option>
                    <option>In App</option>
                  </select>
                </div>
                <div className="form-group mt-3">
                  <label for="slaName" className="f-14 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="slaName"
                  />
                </div>
                <div className="form-group mt-3 mb-4">
                  <label className="f-14 mb-1">Available Placeholders</label>
                  <div className="available-placeholders">
                    {availablePlaceholders.map((item, i) => (
                      <p
                        key={i}
                        className={
                          newPolicy?.placeholder === item ? "selected" : ""
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
                <div className="form-group mt-3 mb-5">
                  <label className="f-14 mb-1">Description</label>

                  <EditorBox
                    text={newPolicy.message}
                    textParent={newPolicy}
                    updateText={setNewPolicy}
                  />
                </div>
              </form>

              <div className="float-end mb-5">
                <Link
                  to="/settings/notifications"
                  className="btn btn-sm f-12 bg-outline-custom cancel px-4"
                >
                  Cancel
                </Link>
                <a
                  className="btn btn-sm ms-2 f-12 bg-custom px-4"
                  data-bs-toggle="modal"
                  data-bs-target="#successModal"
                >
                  Submit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEmailTemplate;
