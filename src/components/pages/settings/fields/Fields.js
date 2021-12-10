// @ts-nocheck
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NotificationManager } from "react-notifications";
import CreatableSelect from 'react-select/creatable';
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
import { httpPostMain, httpGetMain, httpDelete, httpPatchMain } from "../../../../helpers/httpMethods";
// styles & resources
import '../../../../styles/Setting.css';
import '../settings.css';
import {ReactComponent as HamburgerSvg} from '../../../../assets/icons/hamburger.svg';
import {ReactComponent as FormMinusSvg} from '../../../../assets/icons/form-minus.svg';
import {ReactComponent as FormMinusNeutralSvg} from '../../../../assets/icons/form-minus-neutral.svg';

const Fields = () => {
    const [tabKey, setTabKey] = useState('user-field');
    const [modalShow, setModalShow] = useState(false);
    const [processing, setProcessing] = useState(false);
    // custom fields
    const [ticketFields, setTicketFields] = useState([]);
    const [userFields, setUserFields] = useState([]);
    // 
    const [fieldSections, setFieldSections] = useState([]);
    const [customFieldOptions, setCustomFieldOptions] = useState({
        selected: false,
        options: [
            ""
        ]
    });
    // 
    const [customFieldData, setCustomFieldData] = useState([]);
    const [customFields, setCustomFields] = useState({
        "fieldName": "",
        "fieldType": "",
        "fieldSection": "",
        "required": false,
        "multipleOptions": false,
        "belongsTo": tabKey.split("-")[0]
    });
    // 
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [actionId, setActionId] = useState("");
    // 
    useEffect(() => {
        getCustomField();
    }, []);
    // 
    useEffect(() => {
        sortCustomFields(customFieldData);
        getFieldSections(customFieldData);
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

    // sort custom fields
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

    // get field sections
    const getFieldSections = (data) => {
        const filterEmptyArray = (a,b) => {return a.filter((e)=>{return e!=b})}

        let fieldSectionsResult = data.reduce(function(result, object) {
            if (object.field_section != "") {
              result.push(object.field_section);
            }
            return result;
        }, []);
        setFieldSections(filterEmptyArray([...new Set(fieldSectionsResult)]));
    }

    // form field input change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setCustomFields((prevState) => ({
            ...prevState,
            [name]: value
        }));
        if(name == "fieldType" && value == "select"){
            setCustomFieldOptions((prevState) => ({
                ...prevState,
                selected: true
            }));
        }else{
             setCustomFieldOptions((prevState) => ({
                ...prevState,
                selected: false
            }));
        }
    }

    //
    const deleteCustomField = (id) => {
        setActionId(id);
        setDeleteConfirm(true);
    }
    //
    const editCustomField = (id) => {
        let customField = customFieldData.find((x) => {
            return (x.id == id);
        });
        // 
        setCustomFields((prevState) => ({
            ...prevState,
            "fieldName": customField.field_name,
            "fieldType": customField.field_type,
            "fieldSection": customField.field_section,
            "required": customField.required,
            "multipleOptions": customField.multiple_options,
            "belongsTo": customField.belongs_to
        }))
        if (customField.field_type == "select") {
            setCustomFieldOptions((prevState) => ({
                ...prevState,
                "selected": true,
                "options": customField.field_options? customField.field_options.replace(/{|"|}/g, "").split(",") : []
            }))
        } else{
            setCustomFieldOptions((prevState) => ({
                ...prevState,
                "selected": false,
                "options": [""]
            }))
        }

        // 
        setActionId(id);
        setIsEdit(true);
        setModalShow(true);
    }
    // 
    const clearCustomFields = () => {
        setCustomFields((prevState) => ({
            ...prevState,
            "fieldName": "",
            "fieldType": "",
            "fieldSection": "",
            "required": false,
            "multipleOptions": false,
            "belongsTo": tabKey.split("-")[0]
        }))
    };


    // 
    const handleSwitch = (e) => {
        setCustomFields((prevState) => ({
            ...prevState,
            "required": !customFields.required
        }));
    }
    // 
    const handleMultiOptionSwitch = (e) => {
        setCustomFields((prevState) => ({
            ...prevState,
            "multipleOptions": !customFields.multipleOptions
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
    const handleOptionChange = (e, i) => {
        let newFieldOptionsValue = [...customFieldOptions.options];
        let value = e.target.value;

        newFieldOptionsValue.splice(i, 1, value);

        setCustomFieldOptions((prevState) => ({
            ...prevState,
            options: [
                ...newFieldOptionsValue
            ]
        }));
    }

    const addCustomFieldsOptions = () => {
        setCustomFieldOptions((prevState) => ({
            ...prevState,
            options: [
                ...prevState.options, 
                ""
            ]
        }));
    }

    const removeCustomFieldsOptions = (i) => {
        let newCustomFieldOptions = [...customFieldOptions.options];
        newCustomFieldOptions.splice(i, 1);
        setCustomFieldOptions((prevState) => ({
            ...prevState,
            options: [
                ...newCustomFieldOptions
            ]
        }));
    }

    // submit/create field
    const handleSubmit = async(e) => {
        if(customFields.fieldName == "") return NotificationManager.error("Field name cannot be empty", "Error", 4000);
        if(customFields.fieldType == "") return NotificationManager.error("Field type is requied", "Error", 4000);
        let data = {};
        if(customFieldOptions.selected === true){
            data = {
                ...customFields,
                "fieldOptions": customFieldOptions.options
            }
        }else{
            data = {...customFields};
        }
        setProcessing(true);

        const res = await httpPostMain(`custom-field`, data);
        if (res.status === "success") {
            setProcessing(false);
            setModalShow(false);
            setCustomFieldData((prevState) => [...prevState, res?.data]);
            // console.log(res)
            return NotificationManager.success( "Custom field created successfully", "Success", 4000);
        } else {
            setProcessing(false);
            // console.log(res)
            return NotificationManager.error(res.er.message, "Error", 4000);
        }
    }    

    // edit field
    const handleEdit = async() => {
        if(customFields.fieldName == "") return NotificationManager.error("Field name cannot be empty", "Error", 4000);
        if(customFields.fieldType == "") return NotificationManager.error("Field type is requied", "Error", 4000);
        let data = {};
        if(customFieldOptions.selected === true){
            data = {
                ...customFields,
                "fieldOptions": customFieldOptions.options
            }
        }else{
            data = {...customFields};
        }
        setProcessing(true);
        const res = await httpPatchMain(`custom-field/${actionId}`, data);
        if (res.status === "success") {
            setProcessing(false);
            setModalShow(false);
            getCustomField();
            return NotificationManager.success( "Custom field updated successfully", "Success", 4000);
        } else {
            setProcessing(false);
            return NotificationManager.error(res.er.message, "Error", 4000);
        }
    }
    // delete field
    const handleDelete = async() => {
        setDeleteConfirm(false);
        const res = await httpDelete(`custom-field/${actionId}`);
        if (res?.status === "success") {
            getCustomField();
            return NotificationManager.success("Custom field deleted", "Success");
        } else {
            return NotificationManager.error(res.message, "Error", 4000);
        }
    }

    return (
        <div>
            <div className="card card-body bg-white border-0 p-4 w-100">
                <div id="mainContentHeader">
                    <h6 className="text-muted f-14">
                        <Link to="/settings">
                            <span className="text-custom me-2">Settings</span>
                        </Link>
                        <i className="bi bi-chevron-right mx-2"></i>
                        <span className="ms-2"> Fields</span>
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
                                aria-selected="false">Customer Fields</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${ (tabKey === 'ticket-field') && 'active'} text-muted`}
                                id="pills-ticket-tab"
                                onClick={() => handleTab('ticket-field')}
                                type="button"
                                role="tab"
                                aria-controls="ticket-field-view"
                                aria-selected="false">Ticket Fields</button>
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
                                        <UserFieldList deleteCustomField={deleteCustomField} editCustomField={editCustomField} fieldData={userFields} />
                                    </Tab>
                                    {/* Ticket Field Tab */}
                                    <Tab eventKey="ticket-field" className="px-2">
                                        <TicketFieldList deleteCustomField={deleteCustomField} editCustomField={editCustomField} fieldData={ticketFields} />
                                    </Tab>
                                </Tabs>
                                <div className="">
                                    <div className="mb-2 mt-4">
                                        <button className="btn btn-sm acx-btn-outline-primary border px-3 me-3"
                                            onClick={() => {
                                                setIsEdit(false);
                                                setModalShow(true);
                                            }}> + Add New Field </button>
                                    </div>
                                    {/* <div className="text-end">
                                        <button type="button" className="btn btn-sm acx-btn-outline-primary border px-3 me-3">Discard Changes</button>
                                        <button type="button" className="btn btn-sm acx-btn-primary px-3">Save Changes</button>
                                    </div> */}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            {/* Invite user modal */}
            <Modal
                show={modalShow}
                onHide={() => {
                    setModalShow(false);
                    clearCustomFields();
                }}
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
                                        value={customFields.fieldName}
                                        type="text"
                                        placeholder="Unique field name"
                                        name="fieldName"
                                        id="fieldName"/>
                                </Form.Group>
                                
                                <Form.Group className="form-group acx-form-group mt-3">
                                    <Form.Label className="f-12" htmlFor="fieldSection">Field Section</Form.Label>
                                    <CreatableSelect
                                        id="fieldSection"
                                        className="rselectfield bg-white"
                                        menuPlacement={"top"}
                                        onChange={(selectedSection) => {
                                            setCustomFields((prevState)=> ({
                                                ...prevState,
                                                "fieldSection": selectedSection.value
                                            }))
                                        }}
                                        defaultValue={{ 
                                            value: customFields.fieldSection, 
                                            label: customFields.fieldSection
                                         }}

                                        options={ fieldSections.map((data) => {
                                                return { "value": data, "label": data}
                                            })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="form-group acx-form-group mt-3">
                                    <Form.Label className="f-12" htmlFor="fieldType">Field Type</Form.Label>
                                    <Form.Select defaultValue={customFields.fieldType} onChange={handleChange} name="fieldType" className="form-control" id="fieldType" required>
                                        <option value="" disabled>Select Type</option>
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
                                <div id="allOptionsContainer" className={customFieldOptions.selected? "" : "d-none"}>
                                    <div className="mt-3" id="fieldOptionsWrapper">
                                        <label className="f-12 d-block">Options</label>
                                        <div className="optionsWrapper" id="optionsWrapper">
                                            {customFieldOptions.options.map((element, index) => (
                                                <Form.Group className="d-flex align-items-center my-2 form-group acx-form-group" key={index}>
                                                    <button type="button" className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                        <HamburgerSvg/>
                                                    </button>
                                                    <div className="flex-grow-1 mx-1">
                                                        <Form.Control defaultValue={element} onChange={(e) => handleOptionChange(e, index)} type="text" size="sm" name="field-option" className="" />
                                                    </div>
                                                    { index ? 
                                                        <Button onClick={() => removeCustomFieldsOptions(index)} className="acx-btn-icon rounded-circle" type="button">
                                                            <i className="bi-dash-circle text-danger" title="delete "></i> 
                                                        </Button>
                                                    : null }
                                                </Form.Group>
                                            ))}
                                        </div>
                                        <button type="button" onClick={addCustomFieldsOptions} className="no-focus btn btn-link f-12 ps-0 text-decoration-none text-at-blue-light">
                                            <span className=""> + Add option </span>
                                        </button>
                                    </div>
                                </div>
                                <Row className="my-3">
                                    <Col sm="auto">
                                        <Form.Group className="acx-form-group form-group">
                                            <Form.Check
                                                onChange={handleSwitch}
                                                checked={customFields.required}
                                                value={customFields.required}
                                                type="switch"
                                                id="required"
                                                name="required"
                                                label="Make field required"
                                            />
                                        </Form.Group>
                                        {customFields.required}
                                    </Col>
                                    {customFieldOptions.selected? 
                                        <Col sm="auto">
                                            <Form.Group className="acx-form-group form-group">
                                                <Form.Check
                                                    onChange={handleMultiOptionSwitch}
                                                    checked={customFields.multipleOptions}
                                                    value={customFields.multipleOptions}
                                                    type="switch"
                                                    id="multipleOptions"
                                                    name="multipleOptions"
                                                    label="Multiple Options"
                                                />
                                            </Form.Group>
                                        </Col>
                                    : ""}
                                </Row>
                                <div className="text-end">
                                    <Button onClick={() => {
                                            setIsEdit(false);
                                            setModalShow(false);
                                        }} type="button" className="acx-btn-outline-primary border px-4 me-3">
                                        Cancel
                                    </Button>
                                    {isEdit?
                                        <Button type="button" className="acx-btn-primary px-4" disabled={processing} onClick={handleEdit}>
                                            {processing? 
                                                <span className="text-light d-flex justify-content-center align-items-center">
                                                    <Spinner as="span" size="sm"
                                                        animation="border" variant="light"
                                                        aria-hidden="true"  role="status" /> 
                                                    <span className="ms-1"> Loading...</span>
                                                </span>
                                            :
                                                <span>Edit Field</span>
                                            }
                                        </Button>
                                    :
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
                                    }
                                </div>
                            </Form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={deleteConfirm}
                onHide={() => {
                    setDeleteConfirm(false)
                }}
                size="sm"
                centered>
                <Modal.Body>
                    <div className="p-3 text-center">
                        <h2 className="text-warning">
                            <i className="bi-info-circle"></i>
                        </h2>
                        <h5 className="">Are you sure?</h5>
                        <p className="mb-3">You won't be able to revert this!</p>
                        <div className="d-flex justify-content-center">
                            <button
                                className="btn btn-sm f-12 border cancel px-4"
                                onClick={() => setDeleteConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-sm ms-2 f-12 bg-custom px-4"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete();
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Fields;