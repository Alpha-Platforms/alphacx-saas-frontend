import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NotificationManager } from "react-notifications";
// 
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
// components
import ContactFieldList from "./ContactFieldList.jsx";
import TicketFieldList from "./TicketFieldList.jsx";
import UserFieldList from "./UserFieldList.jsx";
// 
import { httpPostMain, httpGetMain } from "../../../../helpers/httpMethods";
// styles & resources
import '../../../../styles/Setting.css';
import {ReactComponent as HamburgerSvg} from '../../../../assets/icons/hamburger.svg';
import {ReactComponent as FormMinusSvg} from '../../../../assets/icons/form-minus.svg';
import {ReactComponent as FormMinusNeutralSvg} from '../../../../assets/icons/form-minus-neutral.svg';

const Fields = () => {
    const [tabKey, setTabKey] = useState('user-field');
    const [addModalShow, setAddModalShow] = useState(false);
    const [processing, setProcessing] = useState(false);
    // custom fields
    const [ticketFields, setTicketFields] = useState([]);
    const [userFields, setUserFields] = useState([]);
    // 
    const [customFieldData, setCustomFieldData] = useState([]);
    const [customFields, setCustomFields] = useState({
        "fieldName": "",
        "fieldType": "",
        "required": false,
        "belongsTo": tabKey.split("-")[0]
    });
    // 
    useEffect(() => {
        getCustomField();
    }, []);
    // 
    useEffect(() => {
        sortCustomFields(customFieldData);
    }, [customFieldData]);

    // 
    const getCustomField = async () => {
        const res = await httpGetMain(`custom-field`);
        if (res.status === "success") {
            setCustomFieldData(res?.data);
            return;
        } else {
            return;
        }
    };

    //
    const sortCustomFields = (data) => {
        let ticketResult = data.filter((observation) => {
            return (observation.belongs_to == "ticket");
        });
        let userResult = data.filter((observation) => {
            return (observation.belongs_to == "user");
        });
        setTicketFields(ticketResult);
        setUserFields(userResult);
    }

    // 
    const handleChange = (e) => {
        const {name, value} = e.target;
        setCustomFields((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    // 
    const handleSwitch = (e) => {
        setCustomFields((prevState) => ({
            ...prevState,
            "required": !customFields.required
        }));
    }

    // 
    const handleTab = (tab) => {
        setTabKey(tab);
        setCustomFields((prevState) => ({
            ...prevState,
            "belongsTo": tab.split("-")[0]
        }));
    }

    // 
    const handleSubmit = async(e) => {
        if(customFields.fieldName == "") return NotificationManager.error("Field name cannot be empty", "Error", 4000);
        if(customFields.fieldType == "") return NotificationManager.error("Field type is requied", "Error", 4000);
        setProcessing(true);
        const res = await httpPostMain(`custom-field`, customFields);
        if (res.status === "success") {
            setProcessing(false);
            setAddModalShow(false);
            getCustomField();
            return NotificationManager.success( "Labels updated successfully", "Success", 4000);
        } else {
            setProcessing(false);
            return NotificationManager.error(res.er.message, "Error", 4000);
        }
        setProcessing(false);
    }    

    return (
        <div>
            <div className="card card-body bg-white border-0 p-4 w-100">
                <div id="mainContentHeader">
                    <h6 className="text-muted f-14">
                        <Link to="/settings">
                            <span className="text-custom">Settings</span>
                        </Link>{" "}
                        <i className="bi bi-chevron-right"></i>
                        <span className="">Fields</span>
                    </h6>
                </div>

                <div className="mt-4 mb-3">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${ (tabKey === 'user-field') && 'active'} text-muted ps-0`}
                                id="pills-user-tab"
                                onClick={() => handleTab('user-field')}
                                type="button"
                                role="tab"
                                aria-controls="user-field-view"
                                aria-selected="false">User Field</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${ (tabKey === 'ticket-field') && 'active'} text-muted`}
                                id="pills-ticket-tab"
                                onClick={() => handleTab('ticket-field')}
                                type="button"
                                role="tab"
                                aria-controls="ticket-field-view"
                                aria-selected="false">Ticket Field</button>
                        </li>
                    </ul>
                </div>
                <Row className="">
                    <Col lg={10}>
                        <Card className="field-tab-wrapper">
                            <Card.Body>
                                {/* Ticket History Tab */}
                                <Tabs
                                    id="fieldTabs"
                                    activeKey={tabKey}
                                    onSelect={(k) => setTabKey(k)}
                                    className="mb-3">
                                    {/* User Field Tab */}
                                    <Tab eventKey="user-field" className="px-2">
                                        <UserFieldList fieldData={userFields} />
                                    </Tab>
                                    {/* Ticket Field Tab */}
                                    <Tab eventKey="ticket-field" className="px-2">
                                        <TicketFieldList fieldData={ticketFields} />
                                    </Tab>
                                </Tabs>
                                <div className="">
                                    <div className="mb-2 mt-4">
                                        <button className="btn btn-sm acx-btn-outline-primary border px-3 me-3"
                                            onClick={() => setAddModalShow(true)}>+ Add New Field</button>
                                    </div>
                                    <div className="text-end">
                                        <button type="button" className="btn btn-sm acx-btn-outline-primary border px-3 me-3">Discard Changes</button>
                                        <button type="button" className="btn btn-sm acx-btn-primary px-3">Save Changes</button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            {/* Invite user modal */}
            <Modal
                show={addModalShow}
                onHide={() => setAddModalShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <div className="modal-content border-0">
                        <div className="modal-body ">
                            <h3 className="f-16 text-black">Add new {tabKey.split("-")[0]} field</h3>
                            <Form className="" onSubmit={e => e.preventDefault()}>
                                <Form.Group className="form-group acx-form-group mt-3">
                                    <Form.Label className="f-12" htmlFor="fieldName">Field Name</Form.Label>
                                    <Form.Control
                                        required
                                        onChange={handleChange}
                                        type="text"
                                        name="fieldName"
                                        id="fieldName"/>
                                </Form.Group>
                                <Form.Group className="form-group acx-form-group mt-3">
                                    <Form.Label className="f-12" htmlFor="fieldType">Field Type</Form.Label>
                                    <Form.Select onChange={handleChange} name="fieldType" className="form-control" id="fieldType" required>
                                        <option selected disabled>Select Type</option>
                                        <option value="text">Single line text</option>
                                        <option value="number">Number</option>
                                        <option value="select">Dropdown</option>
                                        <option value="textarea">Paragraph</option>
                                        <option value="date">Date</option>
                                        <option value="attach-file">Attach File</option>
                                        <option value="checkbox">Checkbox</option>
                                        <option value="email">Email</option>
                                        <option value="tel">Phone</option>
                                    </Form.Select>
                                </Form.Group>
                                <div id="allOptionsContainer" className="d-none">
                                    <div className="form-group mt-3" id="fieldOptionsWrapper">
                                        <label className="f-12 d-block">Options</label>
                                        <div className="optionsWrapper" id="optionsWrapper"></div>
                                        <button
                                            onClick="addOption(event)"
                                            type="button"
                                            className="no-focus btn btn-link f-12 text-decoration-none text-at-blue-light">+ Add option</button>
                                    </div>
                                </div>
                                <Form.Group className="acx-form-group form-group mt-3">
                                    <Form.Label className="f-12" htmlFor="makeOptional">Make field optional</Form.Label>
                                    <Form.Check
                                        onChange={handleSwitch}
                                        value={customFields.required}
                                        type="switch"
                                        id="required"
                                        name="required"
                                        label=" "
                                    />
                                </Form.Group>
                                <div className="text-end">
                                    <Button type="button" className="acx-btn-outline-primary border px-4 me-3">
                                        Cancel
                                    </Button>
                                    <Button type="button" className="acx-btn-primary px-4" disabled={processing} onClick={handleSubmit}>
                                        {processing? 
                                            <span className="text-light d-flex justify-content-center align-items-center">
                                                <Spinner as="span" size="sm"
                                                    animation="border" variant="light"
                                                    aria-hidden="true"  role="status" /> 
                                                <span className="ms-1"> Loading...</span>
                                            </span>
                                        :
                                            <span>Add Field</span>
                                        }
                                        
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
}

export default Fields;