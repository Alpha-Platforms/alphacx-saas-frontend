// @ts-nocheck
import {useState} from "react";
import {Link} from "react-router-dom";
import RightArrow from "../../../../assets/imgF/arrow_right.png";

const LiveChatSettings = () => {


    return (
        <div>
            <div className="card card-body bg-white border-0 p-0 mb-4">
                <div id="mainContentHeader">
                    <h6 className="text-muted f-14">
                        <Link to="/settings">
                            <span className="text-custom">Settings</span>
                        </Link>{" "}
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3"/> {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
                        <span>Live Chat</span>
                    </h6>
                </div>
                <div className="mt-4">
                    Live Chat Settings
                    
                </div>
            </div>
        </div>
    );
};

export default LiveChatSettings;
