import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./settings.css";
import whatsappImg from "../../../assets/imgF/WhatsApp.png";
import facebookImg from "../../../assets/imgF/Facebook.png";
import { httpGet } from "../../helpers/httpMethods";
import { httpPatchMain, httpPostMain } from "../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
import { hideLoader, showLoader } from "../../helpers/loader";

// console.log(window);
const FB = window.FB;

export default function SocialIntegrations() {
  const [activeSocail, setActiveSocial] = useState("Whatsapp");
  const [FBData, setFBData] = useState({});
  const [pageConnected, setpageConnected] = useState(false);
  const [whatsappConfig, setwhatsappConfig] = useState({
    twillo_account_sid: "",
    twillo_auth_token: "",
    twillo_no: "",
  });
  const authFb = () => {
    FB.login(
      function (response) {
        if (
          response.authResponse &&
          response.authResponse !== "undefined." &&
          response.authResponse !== undefined
        ) {
          console.log("Welcome!  Fetching your information.... ", response);

          setFBData(response?.authResponse);

          handleConnectFBPage(response?.authResponse);

          setpageConnected(true);
          FB.api("/me", function (response) {
            console.log("Good to see you, " + response.name + ".");
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      {
        scope:
          "pages_messaging,pages_manage_metadata,pages_read_engagement,pages_show_list",
      }
    );
  };

  useEffect(() => {
    FB.init({
      appId: "244578957291734",
      // appId: "265267201741571",
      autoLogAppEvents: true,
      xfbml: true,
      version: "v11.0",
    });

    let CheckpageConnected = localStorage.getItem("pageConnected");
    if (
      CheckpageConnected == undefined ||
      CheckpageConnected == null ||
      CheckpageConnected == ""
    ) {
      return setpageConnected(false);
    } else {
      setpageConnected(true);
    }
  }, []);
  const handleWhatsappChange = (e) => {
    setwhatsappConfig({ ...whatsappConfig, [e.target.name]: e.target.value });
  };
  const handleConnectFBPage = async (response) => {
    console.log(response, typeof response);
    if (response && response !== "undefined." && response !== undefined) return;
    showLoader();
    const data = {
      facebook_config: {
        page_token: `${response?.accessToken}`,
        access_token: `${response?.accessToken}`,
      },
    };
    let sstringFyData = JSON.stringify(data);
    const res = await httpPatchMain("settings/facebook-config", data);
    if (res) {
      hideLoader();
      if (res.er) {
        hideLoader();
        return NotificationManager.error(res.er);
      }
      console.log(res);
      localStorage.setItem("pageConnected", "true");
      NotificationManager.success("Page successfully connected");
    }
    // hideLoader();
  };

  const handleConnectWhatsApp = async () => {
    if (whatsappConfig.twillo_account_sid == "") {
      return NotificationManager.error("Account SID Is required!");
    }

    if (whatsappConfig.twillo_auth_token == "") {
      return NotificationManager.error("Auth Token Is required!");
    }

    if (whatsappConfig.twillo_no == "") {
      return NotificationManager.error("Account number Is required!");
    }
    showLoader();
    const data = {
      whatsapp_config: {
        ...whatsappConfig,
      },
    };
    const res = await httpPatchMain("settings/whatsapp-config", data);
    if (res) {
      hideLoader();
      if (res.er) {
        hideLoader();
        return NotificationManager.error(res.er);
      }
      // NotificationManager.success("Page successfully connected");
      NotificationManager.success("WhatsApp account successfully connected");
      setwhatsappConfig({
        twillo_account_sid: "",
        twillo_auth_token: "",
        twillo_no: "",
      });
    }
    // hideLoader();
  };
  return (
    <div className="socialIntergratingPage">
      {" "}
      <div className="">
        <Breadcrumb>
          <Breadcrumb.Item>Settings</Breadcrumb.Item>
          <Breadcrumb.Item active>Integration Settings</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="pageHeaderInter">
        <p>Integrate Social Accounts</p>
      </div>
      <div className="interSocialAccountsTab">
        <p
          className={activeSocail == "Whatsapp" ? "activeSocial" : ""}
          onClick={() => setActiveSocial("Whatsapp")}
        >
          {" "}
          Whatsapp
        </p>
        <p
          className={activeSocail == "Facebook" ? "activeSocial" : ""}
          onClick={() => setActiveSocial("Facebook")}
        >
          Facebook
        </p>

        <p
          className={activeSocail == "sms" ? "activeSocial" : ""}
          onClick={() => setActiveSocial("sms")}
        >
          SMS
        </p>
      </div>
      {activeSocail == "Whatsapp" ? (
        <div className="connectViaWhatsWrap">
          <div className="connectViaWhatsappInstr">
            <img src={whatsappImg} alt="" />
            <div className="connectViaInstText">
              <p>Connect Whatsapp to your Open Channel</p>
              <p>
                Use the following{" "}
                <span style={{ color: "#006298" }}>instruction</span> to connect
                a Whatsapp Account
              </p>
            </div>
          </div>

          <p className="connectViaTwilSoInbt">
            Connect via <span style={{ color: "#006298" }}>Twillio</span>{" "}
          </p>

          <div className="sIntergrationForm">
            {/* <div className="inputContainInter">
              <label htmlFor="">
                Specify this address in the Webhook field in console:
              </label>
              <input type="text" name="" />
            </div> */}

            <div className="inputContainInter">
              <label htmlFor="">Account SID:</label>
              <input
                type="text"
                name="twillo_account_sid"
                onChange={handleWhatsappChange}
                value={whatsappConfig.twillo_account_sid}
              />
            </div>

            <div className="inputContainInter">
              <label htmlFor="">Auth Token:</label>
              <input
                type="text"
                name="twillo_auth_token"
                onChange={handleWhatsappChange}
                value={whatsappConfig.twillo_auth_token}
              />
            </div>

            <div className="inputContainInter">
              <label htmlFor="">Account phone number:</label>
              <input
                type="text"
                name="twillo_no"
                onChange={handleWhatsappChange}
                value={whatsappConfig.twillo_no}
              />
            </div>
            <div className="buttonSubSocialInt">
              <button onClick={handleConnectWhatsApp}>Connect</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {activeSocail == "Facebook" ? (
        <div className="connectViaWhatsWrap">
          <div className="connectViaWhatsappInstr">
            <img src={facebookImg} alt="" />
            <div className="connectViaInstText">
              <p>Communicate with Facebook users via AlphaCX</p>
              <p>
                Connect your company’s Facebook page to Conversational Inbox and
                start chatting with Facebook users.
                <br /> Incoming message allocation is based ticket disribution
                rules. Chats can be converted to tickets.
              </p>
            </div>
          </div>

          <p className="connectViaTwilSoInbt">
            You need to create your company Facebook page or use an existing
            one.
            <br /> You need to be the Administration of that page.
          </p>

          <div
            className="buttonSubSocialInt"
            style={{ marginBottom: "20px", marginTop: "-11px" }}
          >
            <button
              style={{ width: "120px" }}
              onClick={authFb}
              disabled={pageConnected}
            >
              {pageConnected ? "Page Connected" : "Connect Page"}
            </button>
          </div>

          {/* <div
            className="rpageDmatsoci"
            style={{ marginBottom: "20px", marginTop: "30px" }}
          ></div> */}

          {/* <div className="sIntergrationForm">
            <div className="inputContainInter">
              <label htmlFor="">Auth ID:</label>
              <input type="text" />
            </div>

            <div className="inputContainInter">
              <label htmlFor="">Auth Token</label>
              <input type="text" />
            </div>

            <div className="inputContainInter">
              <label htmlFor="">Sender ID</label>
              <input type="text" />
            </div>

            <div className="buttonSubSocialInt">
              <button>Connect</button>
            </div>
          </div> */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
