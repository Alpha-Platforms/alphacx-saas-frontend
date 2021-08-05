import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./settings.css";
import whatsappImg from "../../../assets/imgF/WhatsApp.png";
import facebookImg from "../../../assets/imgF/Facebook.png";
export default function SocialIntegrations() {
  const [activeSocail, setActiveSocial] = useState("Whatsapp");
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
            <div className="inputContainInter">
              <label htmlFor="">
                Specify this address in the Webhook field in console:
              </label>
              <input type="text" />
            </div>

            <div className="inputContainInter">
              <label htmlFor="">Account SID:</label>
              <input type="text" />
            </div>

            <div className="inputContainInter">
              <label htmlFor="">Auth Token:</label>
              <input type="text" />
            </div>

            <div className="inputContainInter">
              <label htmlFor="">
                Account phone number (use international format: +99999999999):
              </label>
              <input type="text" />
            </div>
            <div className="buttonSubSocialInt">
              <button>Connect</button>
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
            <button style={{ width: "120px" }}>Connect Page</button>
          </div>

          <div
            className="rpageDmatsoci"
            style={{ marginBottom: "20px", marginTop: "30px" }}
          ></div>

          <div className="sIntergrationForm">
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
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
