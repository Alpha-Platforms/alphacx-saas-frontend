/* eslint-disable consistent-return */
import React from 'react';
import { Link } from 'react-router-dom';
import '../settings.css';
import whatsappImg from '../../../../assets/imgF/WhatsApp.png';
import RightArrow from '../../../../assets/imgF/arrow_right.png';
// import WhatsappTwilio from './whatsapp/WhatsappTwilio';
import WhatsappCx from './whatsapp/WhatsappCx';

export default function WhatsappIntegration() {
    return (
        <div className="social-integrating-page">
            <header id="mainContentHeader" className="breadcrumb">
                <h6 className="text-muted f-14">
                    <Link to="/settings">
                        <span className="text-custom">Settings</span>
                    </Link>{' '}
                    <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                    <Link to="/settings/integrations">
                        <span className="text-custom">Integrations</span>
                    </Link>{' '}
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
                                    Use the following <span className="">instruction</span> to connect a Whatsapp
                                    Account
                                </p>
                            </div>
                        </div>
                        {/* <WhatsappTwilio /> */}
                        <WhatsappCx />
                    </div>
                </section>
            </div>
        </div>
    );
}
