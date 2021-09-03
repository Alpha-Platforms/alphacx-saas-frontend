import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Badge from "react-bootstrap/Badge";
import "./../settings.css";
import whatsappImg from "../../../../assets/imgF/WhatsApp.png";
import facebookImg from "../../../../assets/imgF/Facebook.png";
import smsImg from "../../../../assets/imgF/TwilioSms.svg";
import { httpGet } from "../../../helpers/httpMethods";
import { httpPatchMain, httpPostMain } from "../../../../helpers/httpMethods";
import { hideLoader, showLoader } from "../../../helpers/loader";
import RightArrow from "../../../../assets/imgF/arrow_right.png";

import { NotificationManager } from "react-notifications";

export default function SocialIntegrations() {
    return (
       <div className="social-integration-page">
         <div id="mainContentHeader" className="breadcrumb">
           <h6 className="text-muted f-14">
             <Link to="/settings">
               <span className="text-custom">Settings</span>
             </Link>{" "}
             <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
             <span>Integrations </span>
           </h6>
         </div>
         <div className="row g-3 mt-4 mb-5">
         {/* integration columns starts */}
          <div className="col-md-4 col-sm-6 col-12">
            <div className="setting-link-item border rounded bg-light h-100 app-hover-shadow">
              <Link to="/settings/integrations/whatsapp" className="d-block cursor text-decoration-none">
                <div className="d-flex align-items-start p-md-4 p-3">
                  <div className="w">
                    <img src={whatsappImg} alt="" width="38"/>
                  </div>
                  <div className="ms-3 d-flex justify-content-between align-items-start">
                    <div className="me-2">
                      <h6 className="text-dark mb-0">WhatsApp</h6>
                      <p className="acx-fs-8 lh-base mt-1 mb-2 text-muted">
                        Connect your to users, via Whatsapp permissions
                      </p>
                    </div>
                    <div className="">
                      <Badge className="acx-bg-primary px-3 py-2">Connected</Badge>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-12">
            <div className="setting-link-item border rounded bg-light h-100 app-hover-shadow">
              <Link to="/settings/integrations/facebook" className="d-block cursor text-decoration-none">
                <div className="d-flex align-items-start p-md-4 p-3">
                  <div className="w">
                    <img src={facebookImg} alt="" width="38"/>
                  </div>
                  <div className="ms-3 d-flex justify-content-between align-items-start">
                    <div className="me-2">
                      <h6 className="text-dark mb-0">Facebook</h6>
                      <p className="acx-fs-8 lh-base mt-1 mb-2  text-muted">
                        Connect your to users, via Facebook permissions
                      </p>
                    </div>
                    <div className="">
                      <Badge className="acx-bg-primary text-white px-3 py-2">Connected</Badge>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-12">
            <div className="setting-link-item border rounded bg-light h-100 app-hover-shadow">
              <Link to="/settings/integrations" className="d-block cursor text-decoration-none">
                <div className="d-flex align-items-start p-md-4 p-3">
                  <div className="w">
                    <img src={smsImg} alt="" width="38"/>
                  </div>
                  <div className="ms-3 d-flex justify-content-between align-items-start">
                    <div className="me-2">
                      <h6 className="text-dark mb-0"> SMS by Twilio</h6>
                      <p className="acx-fs-8 lh-base mt-1 mb-2 text-muted">
                        Connect your to users, via SMS permissions
                      </p>
                    </div>
                    <div className="">
                      <Badge className="acx-bg-gray-100 text-muted px-3 py-2">Connect</Badge>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/* integrations column ends */}
         </div>
       </div>
     );
   }