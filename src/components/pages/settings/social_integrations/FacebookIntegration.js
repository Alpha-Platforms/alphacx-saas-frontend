import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { NotificationManager } from "react-notifications";

import { httpPatchMain, httpPostMain } from "../../../../helpers/httpMethods";
// js assets
import { hideLoader, showLoader } from "../../../helpers/loader";
// css assets
import "../settings.css";
// img assets
import facebookImg from "../../../../assets/imgF/Facebook.png";
import RightArrow from "../../../../assets/imgF/arrow_right.png";

// console.log(window);
const FB = window.FB;

export default function FacebookIntegration() {
    const [FBData, setFBData] = useState({});

    const [pageConnected, setPageConnected] = useState(false);
  
    const authFb = () => {
        FB.login(function (response) {
            if (response.authResponse && response.authResponse !== "undefined." && response.authResponse !== undefined) {
                setFBData(response?.authResponse);
                handleConnectFBPage(response?.authResponse);
                setPageConnected(true);
                FB.api("/me", function (response) {
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
    }, []);
    const handleConnectFBPage = async (response) => {
        console.log(response, typeof response);
        if (response && response !== "undefined." && response !== undefined) return;
        showLoader();
        const data = {
            facebook_config: {
                page_token: `${response?.accessToken}`,
                access_token: `${response?.accessToken}`,
                connected: true,
            },
        };
        const res = await httpPatchMain("settings/facebook-config", data);
        if (res) {
            hideLoader();
            if (res.er) {
                hideLoader();
                return NotificationManager.error(res.er);
            }
            localStorage.setItem("pageConnected", "true");
            NotificationManager.success("Page successfully connected");
        }
      // hideLoader();
    };
    return (
        <div className="social-integrating-page">
            <header id="mainContentHeader" className="breadcrumb">
                <h6 className="text-muted f-14">
                    <Link to="/settings">
                        <span className="text-custom">Settings</span>
                    </Link>{" "}
                    <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                    <Link to="/settings/integrations">
                        <span className="text-custom">Integrations</span>
                    </Link>{" "}
                    <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                    <span>Facebook</span>
                </h6>
            </header>
            <div className="">
                <h5 className="">Facebook</h5>
                <section>
                    <div className="connectViaWhatsWrap">
                        <div className="connectViaWhatsappInstr">
                            <img src={facebookImg} alt="" />
                            <div className="connectViaInstText">
                                <p>Communicate with Facebook users via AlphaCX</p>
                                <p>
                                    Connect your company’s Facebook page to Conversational Inbox and
                                    start chatting with Facebook users.
                                    <br /> Incoming message allocation is based ticket distribution
                                    rules. Chats can be converted to tickets.
                                </p>
                            </div>
                        </div>

                        <p className="mt-3">
                            You need to create your company Facebook page or use an existing
                            one.
                            <br /> You need to be the Administration of that page.
                        </p>

                        <div className="">
                            <button className="btn acx-btn-primary px-3 py-2" onClick={authFb} disabled={pageConnected}>
                                {pageConnected ? "Page Connected" : "Connect Page"}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}