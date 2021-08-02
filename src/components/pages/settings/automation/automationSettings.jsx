import React from 'react'
import './automationSettings.scss'
import RightArrow from "../../../../assets/imgF/arrow_right.png";

const AutomationSettings = () => {
    return (
        <div id="mainContent" className="container automation-settings">
            <div className="card card-body bg-white border-0 p-5 mt-4">
                <div id="mainContentHeader">
                    <h6 className="text-muted f-14">Settings 
                    <img src={RightArrow} alt="" classNameName="img-fluid mx-2 me-3" />
                    {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
                        <span className="text-custom">Automation Settings</span>
                    </h6>
                </div>
                <div id="settings">
                    <div className="d-flex justify-content-between align-baseline">
                        <h5 className="mt-3 mb-4 f-16 fw-bold">SLA Policies</h5>
                        <div>
                            <a className="btn btn-sm f-14 px-5 btn-custom bt" href="./automation-form.html">
                                Add policy
                            </a>
                        </div>
                    </div>
                    <p className="w-50 f-12">Service level Agreement(SLA) Policies help you setup and maintain targets for
                        the duration within which your teams respond and resolve rickets. Learn more</p>

                    <p className="mt-5 f-12">
                        {/* <object data="../assets/alphatickets/icons/info-icon.svg" className="me-1 img-fluid"></object>The */}
                        first matching SLA policy will be applied to tickets wuth matching conditions
                    </p>
                    <table className="table mt-4">
                        <thead className="bg-custom f-14">
                            <tr>
                                <th className="ps-5 border-top-right">SLA Policy</th>
                                <th className="border-top-left">Status</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="text-center m-5 p-5 empty-state">
                        {/* <object data="../assets/alphatickets//icons/carousel.svg" className="img-fluid"></object> */}
                        <p className="text-center">You currently have Policy record at <br/> the moment</p>
                        <a href="./automation-form.html" className="btn btn-sm bg-custom mt-2 add-policy">Add Automation</a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AutomationSettings
