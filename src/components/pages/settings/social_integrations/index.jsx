/* eslint-disable */
import React, { useEffect, useState } from "react";

// 
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Badge from "react-bootstrap/Badge";
import "./../settings.css";
import whatsappImg from "../../../../assets/imgF/WhatsApp.png";
import facebookImg from "../../../../assets/imgF/Facebook.png";
import instagramImg from "../../../../assets/imgF/instagram.png";
import twitterImg from "../../../../assets/imgF/twitter.png";
import termiiImg from "../../../../assets/imgF/termii.png";
import smsImg from "../../../../assets/imgF/TwilioSms.svg";
import { httpPatchMain, httpPostMain, httpGetMain, httpGet} from "../../../../helpers/httpMethods";
import { hideLoader, showLoader } from "../../../helpers/loader";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import AccountLightIcon from "../../../../assets/icons/Social-blurb.svg";
import MailLightIcon from "../../../../assets/icons/mail_light.svg";

import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";
import { hostname } from "os";

function SocialIntegrations({configs}) {

  const [configData, setConfigData] = useState([]);
  const [loadingConfig, setLoadingConfig] = useState(true);

  const [smsConnected, setSmsConnected] = useState(false)
  const [emailConnected, setEmailConnected] = useState(false)
  const [facebookConnected, setFacebookConnected] = useState(false)
  const [whatsappConnected, setWhatsappConnected] = useState(false)
  const [livechatConnected, setLivechatConnected] = useState(false)


  useEffect(() => {
    
    if(configs.sms_config){setSmsConnected(true)}    
    if(configs.email_config){setEmailConnected(true)}
    if(configs.facebook_config){setFacebookConnected(true)}
    if(configs.livechat_config){setLivechatConnected(true)}
    if(configs.whatsapp_config){setWhatsappConnected(true)}

  }, [configs])

  const getConfig = async () => {
    const res = await httpGetMain(`settings/config`);
    if (res.status === "success") {
      setLoadingConfig(true);
      setConfigData(res?.data);
      setLoadingConfig(false);
    } else {
      setLoadingConfig(false);
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  };

  const goToFB = (e) => {
    e.preventDefault()
    const subdomain = "app"
    const path = "integrations"
    const params = `domain=${window.localStorage.getItem('domain')}&id=${window.localStorage.getItem('token')}&uid=${window.localStorage.getItem('refreshToken')}`
    const protocol = window.location.protocol
    const hostname = window.location.hostname.split(".").slice(1).join(".")
    const port = window.location.port
    window.location.href = `${protocol}//${subdomain}.${hostname}:${port}/${path}?${params}`;

  }

  const goToConnector = (e, channel) => {
      e.preventDefault()
      const subdomain = "app"
      const path = "integrations"
      const params = `channel=${channel}&domain=${window.localStorage.getItem('domain')}&id=${window.localStorage.getItem('token')}&uid=${window.localStorage.getItem('refreshToken')}`
      const protocol = window.location.protocol
      const hostname = window.location.hostname.split(".").slice(1).join(".")
      const port = window.location.port
      window.location.href = `${protocol}//${subdomain}.${hostname}:${port}/${path}?${params}`;

  }

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
                  <h6 className="text-dark mb-0">WhatsApp by Twilio</h6>
                  <p className="acx-fs-8 lh-base mt-1 mb-2 text-muted">
                    Connect your users via WhatsApp
                  </p>
                </div>
                <div className="">
                <Badge className={`${!whatsappConnected? 'acx-bg-gray-100 text-muted' : 'acx-bg-primary  text-white'} px-3 py-2`}>{!whatsappConnected? "Connect" : "Connected"}</Badge>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="col-md-4 col-sm-6 col-12">
        <div className="setting-link-item border rounded bg-light h-100 app-hover-shadow">
          {/* <Link to="/settings/integrations/facebook" className="d-block cursor text-decoration-none"> */}
          
          <a href="#" className="d-block cursor text-decoration-none" role="button" onClick={(e) => goToConnector(e, "facebook")}>
            <div className="d-flex align-items-start p-md-4 p-3">
              <div className="w">
                <img src={facebookImg} alt="" width="38"/>
              </div>
              <div className="ms-3 d-flex justify-content-between align-items-start">
                <div className="me-2">
                  <h6 className="text-dark mb-0">Facebook</h6>
                  <p className="acx-fs-8 lh-base mt-1 mb-2  text-muted">
                    Connect your users via Facebook
                  </p>
                </div>
                <div className="">
                  <Badge className={`${!facebookConnected? 'acx-bg-gray-100 text-muted' : 'acx-bg-primary  text-white'} px-3 py-2`}>{!facebookConnected? "Connect" : "Connected"}</Badge>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
            
      <div className="col-md-4 col-sm-6 col-12">
        <div className="setting-link-item border rounded bg-light h-100 app-hover-shadow">
          {/* <Link to="/settings/integrations/facebook" className="d-block cursor text-decoration-none"> */}
          
          <a href="#" className="d-block cursor text-decoration-none" role="button" onClick={(e) => goToConnector(e, "instagram")}>
            <div className="d-flex align-items-start p-md-4 p-3">
              <div className="w">
                <img src={instagramImg} alt="" width="38"/>
              </div>
              <div className="ms-3 d-flex justify-content-between align-items-start">
                <div className="me-2">
                  <h6 className="text-dark mb-0">Instagram</h6>
                  <p className="acx-fs-8 lh-base mt-1 mb-2  text-muted">
                    Connect your business Instagram Page
                  </p>
                </div>
                <div className="">
                  <Badge className={`${!facebookConnected? 'acx-bg-gray-100 text-muted' : 'acx-bg-primary  text-white'} px-3 py-2`}>{!facebookConnected? "Connect" : "Connected"}</Badge>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className="col-md-4 col-sm-6 col-12">
        <div className="setting-link-item border rounded bg-light h-100 app-hover-shadow">
          <Link to="/settings/integrations/twitter" className="d-block cursor text-decoration-none">
            <div className="d-flex align-items-start p-md-4 p-3">
              <div className="w">
                <img src={twitterImg} alt="" width="38" />
              </div>
              <div className="ms-3 d-flex justify-content-between align-items-start">
                <div className="me-2">
                  <h6 className="text-dark mb-0">Twitter</h6>
                  <p className="acx-fs-8 lh-base mt-1 mb-2 text-muted">
                    Receive and respond to Twitter direct messages as tickets
                  </p>
                </div>
                <div className="">
                  <Badge className={`${!smsConnected? 'acx-bg-gray-100 text-muted' : 'acx-bg-primary  text-white'} px-3 py-2`}>{!smsConnected? "Connect" : "Connected"}</Badge>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      <div className="col-md-4 col-sm-6 col-12">
        <div className="setting-link-item border rounded bg-light h-100 app-hover-shadow">
          <Link to="/settings/integrations/sms" className="d-block cursor text-decoration-none">
            <div className="d-flex align-items-start p-md-4 p-3">
              <div className="w">
                <img src={termiiImg} alt="" width="38" />
              </div>
              <div className="ms-3 d-flex justify-content-between align-items-start">
                <div className="me-2">
                  <h6 className="text-dark mb-0">SMS by Termii</h6>
                  <p className="acx-fs-8 lh-base mt-1 mb-2 text-muted">
                    Connect your users via SMS
                  </p>
                </div>
                <div className="">
                  <Badge className={`${!smsConnected? 'acx-bg-gray-100 text-muted' : 'acx-bg-primary  text-white'} px-3 py-2`}>{!smsConnected? "Connect" : "Connected"}</Badge>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="col-md-4 col-sm-6 col-12">
        <div className="setting-link-item border rounded bg-light h-100 app-hover-shadow">
          <Link to="/settings/integrations/email" className="d-block cursor text-decoration-none">
            <div className="d-flex align-items-start p-md-4 p-3">
              <div className="w">
                <img src={MailLightIcon} alt="" width="38" />
              </div>
              <div className="ms-3 d-flex justify-content-between align-items-start">
                <div className="me-2">
                  <h6 className="text-dark mb-0">Email to Ticket</h6>
                  <p className="acx-fs-8 lh-base mt-1 mb-2 text-muted">
                    Set up email to receive mails as tickets
                  </p>
                </div>
                <div className="">
                <Badge className={`${!emailConnected? 'acx-bg-gray-100 text-muted' : 'acx-bg-primary  text-white'} px-3 py-2`}>{!emailConnected? "Connect" : "Connected"}</Badge>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="col-md-4 col-sm-6 col-12">
        <div className="setting-link-item border rounded bg-light h-100 app-hover-shadow">
          <Link to="/settings/integrations/livechat" className="d-block cursor text-decoration-none">
            <div className="d-flex align-items-start p-md-4 p-3">
              <div className="w">
                <img src={AccountLightIcon} alt="" width="34"/>
              </div>
              <div className="ms-3 d-flex justify-content-between align-items-start">
                <div className="me-2">
                  <h6 className="text-dark mb-0"> Live Chat</h6>
                  <p className="acx-fs-8 lh-base mt-1 mb-2 text-muted">Configure livechat widget for your website and app</p>
                </div>
                <div className="">
                <Badge className={`${!livechatConnected? 'acx-bg-gray-100 text-muted' : 'acx-bg-primary  text-white'} px-3 py-2`}>{!livechatConnected? "Connect" : "Connected"}</Badge>
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




const mapStateToProps = (state, ownProps) => ({
  configs: state.config.configs, // general config
});

export default connect(mapStateToProps)(SocialIntegrations);