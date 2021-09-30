// @ts-nocheck
import {useState} from "react";
import {Link} from "react-router-dom";
import RightArrow from "../../../../assets/imgF/arrow_right.png";

const LiveChatSettings = () => {

    const [settings, setSettings] = useState({

    });

    const handleInputChange = e => {
        const {name, value} = e.target;

        setSettings(prev => ({
            ...prev,
            [name]: value
        }));

    }

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
                <div className="d-flex justify-content-between flex-row">
                    <h5 className="mt-3 mb-4 fs-6 fw-bold">Widget Settings</h5>
                </div>
                <div className="mt-1">
                    <div>
                        <div className="w-75">
                            <form className="tl-form" onSubmit={e => e.preventDefault()}>
                                <div>
                                    <div className="form-group mt-3">
                                        <label className="f-14 mb-1">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control"
                                            name="title"
                                            value={settings.title}
                                            onChange={handleInputChange}/>
                                    </div>

                                    <div className="form-group mt-4">
                                        <label className="f-14 mb-1">
                                            Short Description:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control"
                                            name="description"
                                            value={settings.description}
                                            onChange={handleInputChange}/>
                                    </div>

                                    <div className="form-group mt-4">
                                        <label className="f-14 mb-1">
                                            Initial chat text
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control"
                                            name="initialText"
                                            value={settings.initialText}
                                            onChange={handleInputChange}/>
                                    </div>


                                    <div className="form-group mt-4">
                                        <label className="f-14 mb-1">
                                            Color
                                        </label>
                                        <div><small>Select your widget color.</small></div>
                                        <input
                                            type="text"
                                            className="form-control form-control"
                                            name="initialText"
                                            value={settings.initialText}
                                            onChange={handleInputChange}/>
                                        <div><small>This is the primary color of your widget.</small></div>
                                    </div>
                                </div>
                                <div className="my-3 mt-4">
                                    <button
                                        className="btn btn-sm bg-at-blue-light px-3"
                                        disabled={false}>Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div></div>

                </div>
            </div>
        </div>
    );
};

export default LiveChatSettings;
