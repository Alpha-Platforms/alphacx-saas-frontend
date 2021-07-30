import {useState} from 'react';
import {ReactComponent as HamburgerSvg} from '../../../../assets/icons/hamburger.svg';
import {ReactComponent as FormMinusSvg} from '../../../../assets/icons/form-minus.svg';
import AddFieldModal from './components/AddFieldModal';
import {Link} from 'react-router-dom';

const Form = () => {
    const [addFieldModalShow, setAddFieldModalShow] = useState(false);
    const [isFieldEmpty] = useState(false);
    return (
        <div>
            <div className="card card-body bg-white border-0 p-5 mb-4">
                <div id="mainContentHeader">
                    <h6 className="text-muted f-14">Settings
                        <i className="bi bi-chevron-right"></i>
                        <span className="text-custom">Forms</span>
                    </h6>
                </div>
                <div id="settings">
                    <div
                        style={{
                        maxWidth: "600px"
                    }}
                        className="mx-auto mt-5">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 text-black">Customer Enquiry</h5>
                            <span><Link to="#"
                                    class="btn bg-at-blue-light btn-sm rounded-2 px-5">Preview</Link></span>
                        </div>
                        <div className="bg-sky-blue border-sky-blue p-4 mt-5 rounded-3">
                            <label for="welcome-message" className="text-black fs-6 fw-bold d-block">Form Description</label>
                            <input
                                type="text"
                                id="welcome-message"
                                className="d-block p-2 w-100 mt-3 border-sky-blue rounded-3"
                                placeholder="Providing these details will help us resolve your question faster."/>
                        </div>
                        {isFieldEmpty ? <div className="text-center pt-5 pb-5 mt-5 mb-5">
                            <p>Start creating your form by clicking on add new button</p>
                            <div>
                                <button
                                    className="btn btn-link text-decoration-none text-at-blue-light"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addFieldModal">+ Add New Field</button>
                            </div>
                        </div> : <div className="text-center pt-5 pb-5 mt-5 mb-5">
                            <div className="fieldsWrapper" id="fieldsWrapper">


                                <div className="fieldParent d-flex my-2">
                                    <button type="button" className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                        <HamburgerSvg/>
                                    </button>
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <span>Email</span> <span>Required</span>

                                    </div>
                                    <button type="button"
                                        className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                        <FormMinusSvg/>
                                    </button>
                                </div>

                                <div className="fieldParent d-flex my-2">
                                    <button type="button" className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                        <HamburgerSvg/>
                                    </button>
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <span>Credit Card Number</span> <span>Required</span>

                                    </div>
                                    <button type="button"
                                        className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                        <FormMinusSvg/>
                                    </button>
                                </div>
                            </div>

                            <div className="text-start mt-2"><button
                                    className="btn btn-link text-decoration-none text-at-blue-light" onClick={() => setAddFieldModalShow(true)}>+ Add New
                                    Field</button></div>
                        </div>}

                        <div className="bg-sky-blue border-sky-blue p-4 mt-5 rounded-3 mb-5">
                            <label for="thankyou-msg" className="text-black fs-6 fw-bold d-block">Success Message</label>
                            <input
                                type="text"
                                id="thankyou-msg"
                                className="d-block p-2 w-100 mt-3 border-sky-blue rounded-3"
                                placeholder="Thank you for the feedback!"/>
                        </div>
                    </div>
                </div>
            </div>

            <AddFieldModal addFieldModalShow={addFieldModalShow} setAddFieldModalShow={setAddFieldModalShow} />
        </div>
    )
}

export default Form
