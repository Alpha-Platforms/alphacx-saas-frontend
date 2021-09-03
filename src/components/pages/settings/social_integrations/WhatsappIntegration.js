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
import whatsappImg from "../../../../assets/imgF/WhatsApp.png";
import RightArrow from "../../../../assets/imgF/arrow_right.png";


export default function WhatsappIntegration() {
    const [whatsappConfig, setWhatsappConfig] = useState({
        twillo_account_sid: "",
        twillo_auth_token: "",
        twillo_no: "",
    });
    const handleWhatsappChange = (e) => {
        setWhatsappConfig({ ...whatsappConfig, [e.target.name]: e.target.value });
    };
    const handleConnectWhatsApp = async () => {
        if (whatsappConfig.twillo_account_sid === "") {
            return NotificationManager.error("Account SID Is required!");
        }
    
        if (whatsappConfig.twillo_auth_token === "") {
            return NotificationManager.error("Auth Token Is required!");
        }
    
        if (whatsappConfig.twillo_no === "") {
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
            setWhatsappConfig({
                twillo_account_sid: "",
                twillo_auth_token: "",
                twillo_no: "",
            });
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
                    <span>WhatsApp</span>
                </h6>
            </header>
            <div className="">
                <h5 className="">WhatsApp</h5>
                <section>
                    <div className="connectViaWhatsWrap">
                        <div className="connectViaWhatsappInstr">
                            <img src={whatsappImg} alt="" />
                            <div className="connectViaInstText">
                                <p>Connect Whatsapp to your Open Channel</p>
                                <p>
                                    Use the following{" "}
                                    <span className="acx-text-primary">instruction</span> to connect
                                    a Whatsapp Account
                                </p>
                            </div>
                        </div>

                        <p className="connectViaTwilSoInbt">
                            Connect via <span style={{ color: "#006298" }}>Twillio</span>{" "}
                        </p>

                        <div className="mt-4 mb-5 col-md-8">
                            {/* <div className="inputContainInter">
                            <label htmlFor="">
                                Specify this address in the Webhook field in console:
                            </label>
                            <input type="text" name="" />
                            </div> */}

                            <div className="mb-3">
                            <div className="mb-3">
                                <label for="organisation-name" className="form-label">
                                Account SID:
                                </label>
                                <input
                                    type="text"
                                    name="twillo_account_sid"
                                    onChange={handleWhatsappChange}
                                    value={whatsappConfig.twillo_account_sid}
                                    className="form-control"
                                    id="organisation-name"
                                />
                            </div>
                            <div className="mb-3">
                                <label for="organisation-name" className="form-label">
                                    Auth Token:
                                </label>
                                <input
                                    type="text"
                                    name="twillo_auth_token"
                                    onChange={handleWhatsappChange}
                                    value={whatsappConfig.twillo_auth_token}
                                    className="form-control"
                                    id="organisation-name"
                                />
                            </div>

                            <div className="mb-3">
                                <label for="organisation-name" className="form-label">
                                Account phone number:
                                </label>
                                <input
                                type="text"
                                name="twillo_no"
                                onChange={handleWhatsappChange}
                                value={whatsappConfig.twillo_no}
                                className="form-control"
                                id="organisation-name"
                                />
                            </div>
                            </div>

                            <div className="mt-5">
                                <button className="btn acx-btn-primary px-3 py-2" onClick={handleConnectWhatsApp}>Connect</button>
                            </div>
                        </div>
                        </div>
                </section>
            </div>
        </div>
    );
}