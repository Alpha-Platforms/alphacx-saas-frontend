import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import NewSupportEmail from "./components/NewSupportEmail";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import { Link } from "react-router-dom";

import "./settingsEmail.scss";

const EmailSettings = () => {
  let { action } = useParams();
  const [pageAction, setPageAction] = useState(action);

  useEffect(() => {
    setPageAction(action);
    console.clear();
    console.log(action);
  }, [action]);
  return pageAction === "email-form" ? (
    <NewSupportEmail />
  ) : (
    <div id="mainContent" class="container settings-email">
      <main class="mb-5">
        <div id="mainContent" class="container">
          <div class="card card-body bg-white border-0 p-5 mt-4">
            <div id="mainContentHeader">
              <h6 class="text-muted f-14">
                Settings{" "}
                <img src={RightArrow} alt="" class="img-fluid mx-2 me-3" />
                <span class="text-custom">Email</span>
              </h6>
            </div>
            <div class="d-flex justify-content-between flex-row">
              <h5 class="mt-3 mb-4 fs-6 fw-bold">Email Settings</h5>
              <div>
                <a class="btn btn-outline-gray btn-sm">
                  <span class="d-flex justify-content-center align-items-center">
                    <span>Advanced Settings</span>
                  </span>
                </a>
                <Link
                  class="btn btn-primary btn-sm ms-2"
                  to="/settings/email/email-form"
                >
                  <span>New support email</span>
                </Link>
              </div>
            </div>
            <div class="form-group">
              <input
                type="search"
                class="form-control form-control-sm f-12 search-bar mt-2 px-5 d-block w-50"
                placeholder="Search email addresses"
              />
            </div>
            <div class="text-center empty-state">
              <p class="text-center">
                You currently have no Email record at
                <br /> the moment
              </p>
              <Link
                class="btn btn-sm btn-primary"
                to="/settings/email/email-form"
              >
                New support email
              </Link>
            </div>
            <div id="result"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmailSettings;