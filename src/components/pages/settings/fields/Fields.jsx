/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
// @ts-nocheck
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
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
import { useDispatch, useSelector } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { css } from '@emotion/css';
// components
// import ContactFieldList from './ContactFieldList';
import TicketFieldList from './TicketFieldList';
import UserFieldList from './UserFieldList';
//
import { httpPostMain, httpDelete, httpPatchMain } from '../../../../helpers/httpMethods';
// styles & resources
import '../../../../styles/Setting.css';
import '../settings.css';
import { ReactComponent as HamburgerSvg } from '../../../../assets/icons/hamburger.svg';
// import { ReactComponent as FormMinusSvg } from '../../../../assets/icons/form-minus.svg';
// import { ReactComponent as FormMinusNeutralSvg } from '../../../../assets/icons/form-minus-neutral.svg';
import { getCustomFields, addCustomField } from '../../../../reduxstore/actions/customFieldActions';
import { brandKit } from '../../../../helper';

function Fields() {
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
        options: [''],
    });
    //
    // const [customFieldData, setCustomFieldData] = useState([]);
    const [customFields, setCustomFields] = useState({
        fieldName: '',
        fieldType: '',
        fieldSection: '',
        required: false,
        multipleOptions: false,
        belongsTo: tabKey.split('-')[0],
    });
    //
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [actionId, setActionId] = useState('');
    const [, forceUpdate] = useState();

    const dispatch = useDispatch();
    const customFieldFromStore = useSelector((state) => state.customField);
    const customFieldData = customFieldFromStore?.customFields;
    const isLoading = customFieldFromStore?.isCustomFieldsLoading;
    // const isLoaded = customFieldFromStore?.isCustomFieldsLoaded;

    // const getCustomField = async () => {
    //     const res = await httpGetMain(`custom-field`);
    //     if (res.status === 'success') {
    //         setCustomFieldData(res?.data);
    //     }
    // };

    const simpleValidator = useRef(
        new SimpleReactValidator({
            element: (message) => <div className="formErrorMsg">{message.replace(/(The|field)/gi, '').trim()}</div>,
        }),
    );

    // sort custom fields
    const sortCustomFields = (data) => {
        const ticketResult = data.filter((observation) => {
            return observation.belongs_to === 'ticket';
        });
        const userResult = data.filter((observation) => {
            return observation.belongs_to === 'user';
        });
        setTicketFields(ticketResult);
        setUserFields(userResult);
    };

    // get field sections
    const getFieldSections = (data) => {
        const filterEmptyArray = (a, b) => {
            return a.filter((e) => {
                return e !== b;
            });
        };

        // eslint-disable-next-line func-names
        const fieldSectionsResult = data.reduce(function (result, object) {
            if (object.field_section !== '') {
                result.push(object.field_section);
            }
            return result;
        }, []);
        setFieldSections(filterEmptyArray([...new Set(fieldSectionsResult)]));
    };

    // useEffect(() => {
    //     getCustomField();
    // }, []);

    //
    useEffect(() => {
        sortCustomFields(customFieldData);
        getFieldSections(customFieldData);
    }, [customFieldData]);

    // form field input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomFields((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (name === 'fieldType' && value === 'select') {
            setCustomFieldOptions((prevState) => ({
                ...prevState,
                selected: true,
            }));
        } else {
            setCustomFieldOptions((prevState) => ({
                ...prevState,
                selected: false,
            }));
        }
    };

    //
    const deleteCustomField = (id) => {
        setActionId(id);
        setDeleteConfirm(true);
    };
    //
    const editCustomField = (id) => {
        const customField = customFieldData.find((x) => {
            return x.id === id;
        });
        //
        setCustomFields((prevState) => ({
            ...prevState,
            fieldName: customField.field_name,
            fieldType: customField.field_type,
            fieldSection: customField.field_section,
            required: customField.required,
            multipleOptions: customField.multiple_options,
            belongsTo: customField.belongs_to,
        }));
        if (customField.field_type === 'select') {
            setCustomFieldOptions((prevState) => ({
                ...prevState,
                selected: true,
                options: customField.field_options ? customField.field_options.replace(/{|"|}/g, '').split(',') : [],
            }));
        } else {
            setCustomFieldOptions((prevState) => ({
                ...prevState,
                selected: false,
                options: [''],
            }));
        }

        //
        setActionId(id);
        setIsEdit(true);
        setModalShow(true);
    };

    const clearCustomFields = () => {
        setCustomFields((prevState) => ({
            ...prevState,
            fieldName: '',
            fieldType: '',
            fieldSection: '',
            required: false,
            multipleOptions: false,
            belongsTo: tabKey.split('-')[0],
        }));
    };

    //
    const handleSwitch = () => {
        setCustomFields((prevState) => ({
            ...prevState,
            required: !customFields.required,
        }));
    };
    //
    const handleMultiOptionSwitch = () => {
        setCustomFields((prevState) => ({
            ...prevState,
            multipleOptions: !customFields.multipleOptions,
        }));
    };

    //
    const handleTab = (tab) => {
        setTabKey(tab);
        setCustomFields((prevState) => ({
            ...prevState,
            belongsTo: tab.split('-')[0],
        }));
    };

    //
    const handleOptionChange = (e, i) => {
        const newFieldOptionsValue = [...customFieldOptions.options];
        const { value } = e.target;

        newFieldOptionsValue.splice(i, 1, value);

        setCustomFieldOptions((prevState) => ({
            ...prevState,
            options: [...newFieldOptionsValue],
        }));
    };

    const addCustomFieldsOptions = () => {
        setCustomFieldOptions((prevState) => ({
            ...prevState,
            options: [...prevState.options, ''],
        }));
    };

    const removeCustomFieldsOptions = (i) => {
        const newCustomFieldOptions = [...customFieldOptions.options];
        newCustomFieldOptions.splice(i, 1);
        setCustomFieldOptions((prevState) => ({
            ...prevState,
            options: [...newCustomFieldOptions],
        }));
    };

    // submit/create field
    const handleSubmit = async () => {
        if (simpleValidator.current.allValid()) {
            let data = {};
            if (customFieldOptions.selected === true) {
                data = {
                    ...customFields,
                    fieldOptions: customFieldOptions.options,
                };
            } else {
                data = { ...customFields };
            }
            setProcessing(true);

            const res = await httpPostMain(`custom-field`, data);
            if (res.status === 'success') {
                setProcessing(false);
                setModalShow(false);
                // setCustomFieldData((prevState) => [...prevState, res?.data]);
                dispatch(addCustomField(res?.data));
                setCustomFields((prev) => ({
                    ...prev,
                    fieldName: '',
                    fieldType: '',
                    fieldSection: '',
                    required: false,
                    multipleOptions: false,
                    belongsTo: tabKey.split('-')[0],
                }));
                setCustomFieldOptions((prevState) => ({
                    ...prevState,
                    selected: false,
                    options: [''],
                }));
                // console.log(res)
                return NotificationManager.success('Custom field created successfully', 'Success', 4000);
            }
            setProcessing(false);
            // console.log(res)
            return NotificationManager.error(res.er.message, 'Error', 4000);
        }
        // show all errors if exist
        simpleValidator.current.showMessages();
        // force update component to display error
        return forceUpdate(1);
    };

    // edit field
    const handleEdit = async () => {
        if (simpleValidator.current.allValid()) {
            let data = {};
            if (customFieldOptions.selected === true) {
                data = {
                    ...customFields,
                    fieldOptions: customFieldOptions.options,
                };
            } else {
                data = { ...customFields };
            }
            setProcessing(true);
            const res = await httpPatchMain(`custom-field/${actionId}`, data);
            if (res.status === 'success') {
                setProcessing(false);
                setModalShow(false);
                dispatch(getCustomFields());
                setCustomFields((prev) => ({
                    ...prev,
                    fieldName: '',
                    fieldType: '',
                    fieldSection: '',
                    required: false,
                    multipleOptions: false,
                    belongsTo: tabKey.split('-')[0],
                }));
                setCustomFieldOptions((prevState) => ({
                    ...prevState,
                    selected: false,
                    options: [''],
                }));
                return NotificationManager.success('Custom field updated successfully', 'Success', 4000);
            }
            setProcessing(false);
            return NotificationManager.error(res.er.message, 'Error', 4000);
        }
        // show all errors if exist
        simpleValidator.current.showMessages();
        // force update component to display error
        return forceUpdate(1);
    };
    // delete field
    const handleDelete = async () => {
        setDeleteConfirm(false);
        const res = await httpDelete(`custom-field/${actionId}`);
        if (res?.status === 'success') {
            dispatch(getCustomFields());
            return NotificationManager.success('Custom field deleted', 'Success');
        }
        return NotificationManager.error(res.message, 'Error', 4000);
    };

    const actionBtnStyle = css({
        '& > li > button.active': {
            color: `${brandKit({ col: 0 })?.color} !important`,
            fontWeight: 600,
            borderBottom: `2px solid ${brandKit({ bgCol: 0 })?.backgroundColor} !important`,
        },
        '& > li > button': {
            borderBottom: `2px solid transparent !important`,
        },
    });

    return (
        <div>
            <div className="card card-body bg-white border-0 p-4 w-100">
                <div id="mainContentHeader">
                    <h6 className="text-muted f-14">
                        <Link to="/settings">
                            <span className="text-custom me-2">Settings</span>
                        </Link>
                        <i className="bi bi-chevron-right mx-2" />
                        <span className="ms-2"> Fields</span>
                    </h6>
                </div>

                <div className="mt-4 mb-3">
                    <ul className={`nav nav-pills ${actionBtnStyle}`} id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${tabKey === 'user-field' && 'active'} text-muted ps-0`}
                                id="pills-user-tab"
                                onClick={() => handleTab('user-field')}
                                type="button"
                                role="tab"
                                aria-controls="user-field-view"
                                aria-selected="false"
                            >
                                Customer Fields
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${tabKey === 'ticket-field' && 'active'} text-muted`}
                                id="pills-ticket-tab"
                                onClick={() => handleTab('ticket-field')}
                                type="button"
                                role="tab"
                                aria-controls="ticket-field-view"
                                aria-selected="false"
                            >
                                Ticket Fields
                            </button>
                        </li>
                    </ul>
                </div>
                <Row className="">
                    <Col lg={10}>
                        <Card className="field-tab-wrapper">
                            <Card.Body>
                                {/* Ticket History Tab */}
                                <Tabs id="fieldTabs" activeKey={tabKey} onSelect={(k) => setTabKey(k)} className="mb-3">
                                    {/* User Field Tab */}
                                    <Tab eventKey="user-field" className="px-2">
                                        <UserFieldList
                                            deleteCustomField={deleteCustomField}
                                            editCustomField={editCustomField}
                                            fieldData={userFields}
                                            isLoading={isLoading}
                                        />
                                    </Tab>
                                    {/* Ticket Field Tab */}
                                    <Tab eventKey="ticket-field" className="px-2">
                                        <TicketFieldList
                                            deleteCustomField={deleteCustomField}
                                            editCustomField={editCustomField}
                                            fieldData={ticketFields}
                                        />
                                    </Tab>
                                </Tabs>
                                <div className="">
                                    <div className="mb-2 mt-4">
                                        <button
                                            type="button"
                                            className={`btn text-decoration-none btn-sm border ${css({
                                                ...brandKit({ col: 0 }),
                                            })}`}
                                            onClick={() => {
                                                setIsEdit(false);
                                                setModalShow(true);
                                            }}
                                        >
                                            {' '}
                                            + Add New Field{' '}
                                        </button>
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
                centered
            >
                <Modal.Body>
                    <div className="modal-content border-0">
                        <div className="modal-body ">
                            <h3 className="f-16 text-black">Add new {tabKey.split('-')[0]} field</h3>
                            <Form className="" onSubmit={(e) => e.preventDefault()}>
                                <Form.Group className="form-group acx-form-group mt-3">
                                    <Form.Label className="f-12" htmlFor="fieldName">
                                        Field Name
                                    </Form.Label>
                                    <Form.Control
                                        required
                                        onChange={handleChange}
                                        value={customFields.fieldName}
                                        type="text"
                                        placeholder="Unique field name"
                                        name="fieldName"
                                        id="fieldName"
                                    />
                                    {
                                        /* simple validation */
                                        simpleValidator.current.message(
                                            'Field Name',
                                            customFields?.fieldName,
                                            'required|alpha_num_space',
                                        )
                                    }
                                </Form.Group>

                                <Form.Group className="form-group acx-form-group mt-3">
                                    <Form.Label className="f-12" htmlFor="fieldSection">
                                        Field Section
                                    </Form.Label>
                                    <CreatableSelect
                                        id="fieldSection"
                                        className="rselectfield bg-white"
                                        menuPlacement="top"
                                        onChange={(selectedSection) => {
                                            setCustomFields((prevState) => ({
                                                ...prevState,
                                                fieldSection: selectedSection.value,
                                            }));
                                        }}
                                        defaultValue={{
                                            value: customFields.fieldSection,
                                            label: customFields.fieldSection,
                                        }}
                                        options={fieldSections.map((data) => {
                                            return { value: data, label: data };
                                        })}
                                    />
                                </Form.Group>

                                <Form.Group className="form-group acx-form-group mt-3">
                                    <Form.Label className="f-12" htmlFor="fieldType">
                                        Field Type
                                    </Form.Label>
                                    <Form.Select
                                        defaultValue={customFields.fieldType}
                                        onChange={handleChange}
                                        name="fieldType"
                                        className="form-control"
                                        id="fieldType"
                                        required
                                    >
                                        <option value="" disabled>
                                            Select Type
                                        </option>
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
                                    {
                                        /* simple validation */
                                        simpleValidator.current.message(
                                            'Field Type',
                                            customFields.fieldType,
                                            'required',
                                        )
                                    }
                                </Form.Group>
                                <div id="allOptionsContainer" className={customFieldOptions.selected ? '' : 'd-none'}>
                                    <div className="mt-3" id="fieldOptionsWrapper">
                                        <label className="f-12 d-block">Options</label>
                                        <div className="optionsWrapper" id="optionsWrapper">
                                            {customFieldOptions.options.map((element, index) => (
                                                <Form.Group
                                                    className="d-flex align-items-center my-2 form-group acx-form-group"
                                                    key={index}
                                                >
                                                    <button
                                                        type="button"
                                                        className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor"
                                                    >
                                                        <HamburgerSvg
                                                            stroke={brandKit({ bgCol: 0 })?.backgroundColor}
                                                        />
                                                    </button>
                                                    <div className="flex-grow-1 mx-1">
                                                        <Form.Control
                                                            defaultValue={element}
                                                            onChange={(e) => handleOptionChange(e, index)}
                                                            type="text"
                                                            size="sm"
                                                            name="field-option"
                                                            className=""
                                                        />
                                                    </div>
                                                    {index ? (
                                                        <Button
                                                            onClick={() => removeCustomFieldsOptions(index)}
                                                            className="acx-btn-icon rounded-circle"
                                                            type="button"
                                                        >
                                                            <i className="bi-dash-circle text-danger" title="delete " />
                                                        </Button>
                                                    ) : null}
                                                </Form.Group>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={addCustomFieldsOptions}
                                            className="no-focus btn btn-link f-12 ps-0 text-decoration-none text-at-blue-light"
                                        >
                                            <span className=""> + Add option </span>
                                        </button>
                                    </div>
                                </div>
                                <Row className="my-3">
                                    <Col sm="auto">
                                        <Form.Group className="acx-form-group form-group">
                                            {/* <Form.Check
                                                onChange={handleSwitch}
                                                checked={customFields.required}
                                                value={customFields.required}
                                                type="switch"
                                                id="required"
                                                name="required"
                                                label="Make field required"
                                                className={`thin ${css({
                                                    '&:checked': { ...brandKit({ bgCol: 0 }) },
                                                })}`}
                                            /> */}
                                            <div className="form-check form-switch d-flex justify-content-center">
                                                <input
                                                    className={`legendInput legend-input form-check-input form-check-input-lg mt-1 ${css(
                                                        { '&:checked': { ...brandKit({ bgCol: 0 }) } },
                                                    )}`}
                                                    type="checkbox"
                                                    onChange={handleSwitch}
                                                    id="required"
                                                    name="required"
                                                    label="Make field required"
                                                    checked={customFields.required}
                                                />
                                                <label className="form-check-label f-14 ms-2" htmlFor="required">
                                                    Make field required
                                                </label>
                                            </div>
                                        </Form.Group>
                                        {customFields.required}
                                    </Col>
                                    {customFieldOptions.selected ? (
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
                                    ) : (
                                        ''
                                    )}
                                </Row>
                                <div className="text-end">
                                    {/* <Button
                                        onClick={() => {
                                            setIsEdit(false);
                                            setModalShow(false);
                                        }}
                                        type="button"
                                        className="btn btn-sm px-3 me-2 border reset-btn-outline"
                                    >
                                        Cancel
                                    </Button> */}
                                    <button
                                        style={{ borderColor: 'var(--at-blue-light)' }}
                                        className="btn btn-sm px-3 me-2 border reset-btn-outline"
                                        type="button"
                                        onClick={() => {
                                            setIsEdit(false);
                                            setModalShow(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    {isEdit ? (
                                        <Button
                                            type="button"
                                            className={`btn btn-sm px-3 ${css({
                                                ...brandKit({ bgCol: 0 }),
                                                color: 'white',
                                                '&:hover, &:disabled, &:focus': {
                                                    ...brandKit({ bgCol: 30 }),
                                                    color: 'white',
                                                },
                                            })}`}
                                            disabled={processing}
                                            onClick={handleEdit}
                                        >
                                            {processing ? (
                                                <span className="text-light d-flex justify-content-center align-items-center">
                                                    <Spinner
                                                        as="span"
                                                        size="sm"
                                                        animation="border"
                                                        variant="light"
                                                        aria-hidden="true"
                                                        role="status"
                                                    />
                                                    <span className="ms-1"> Loading...</span>
                                                </span>
                                            ) : (
                                                <span>Edit Field</span>
                                            )}
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            className={`btn btn-sm px-3 ${css({
                                                ...brandKit({ bgCol: 0 }),
                                                color: 'white',
                                                '&:hover, &:disabled, &:focus': {
                                                    ...brandKit({ bgCol: 30 }),
                                                    color: 'white',
                                                },
                                            })}`}
                                            disabled={processing}
                                            onClick={handleSubmit}
                                        >
                                            {processing ? (
                                                <span className="text-light d-flex justify-content-center align-items-center">
                                                    <Spinner
                                                        as="span"
                                                        size="sm"
                                                        animation="border"
                                                        variant="light"
                                                        aria-hidden="true"
                                                        role="status"
                                                    />
                                                    <span className="ms-1"> Loading...</span>
                                                </span>
                                            ) : (
                                                <span>Add Field</span>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </Form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={deleteConfirm}
                onHide={() => {
                    setDeleteConfirm(false);
                }}
                size="sm"
                centered
            >
                <Modal.Body>
                    <div className="p-3 text-center">
                        <h2 className="text-warning">
                            <i className="bi-info-circle" />
                        </h2>
                        <h5 className="">Are you sure?</h5>
                        <p className="mb-3">You won&apos;t be able to revert this!</p>
                        <div className="d-flex justify-content-center">
                            <button
                                type="button"
                                className="btn btn-sm f-12 border cancel px-4"
                                onClick={() => setDeleteConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
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
