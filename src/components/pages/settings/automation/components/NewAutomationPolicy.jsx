/* eslint-disable */
// @ts-nocheck
import React from 'react';
import './newAutomationPolicy.scss';
import '../automationSettings.scss';
import { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import MoonLoader from 'react-spinners/MoonLoader';
import RSelect from 'react-select';
import { connect } from 'react-redux';
import { css } from '@emotion/css';
import AutomationAction from './AutomationAction';
import { httpGetMain, httpPatchMain, httpPostMain } from '../../../../../helpers/httpMethods';
import EditorBox from '../../../../reusables/EditorBox';
import AddIcon from '../../../../../assets/icons/add.svg';
import DeleteIcon from '../../../../../assets/icons/Delete.svg';
import RightArrow from '../../../../../assets/imgF/arrow_right.png';
import { uuid, wordCapitalize, brandKit } from '../../../../../helper';
import { getAgents } from '../../../../../reduxstore/actions/agentActions';

function NewAutomationPolicy({
    categoriz,
    agents,
    groups,
    isAgentsLoaded,
    isGroupsLoaded,
    getAgents,
    isUserAuthenticated,
}) {
    const router = useHistory();
    const { automationId } = useParams();

    const availablePlaceholders = [
        { name: 'Agent', value: 'agentName' },
        { name: 'Ticket', value: 'ticketId' },
        { name: 'Customer', value: 'customerName' },
        { name: 'Status', value: 'status' },
        { name: 'Category', value: 'categoryName' },
    ];

    const [policyLoading, setPolicyLoading] = useState(false);

    // NEW STATE
    const [automationBody, setAutomationBody] = useState({
        title: '',
        categories: [],
        durationDays: '0',
        durationHours: '0',
        action: [],
    });

    const [RSCategoriesOptions, setRSCategoriesOptions] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);

    const generateActionTemplate = (id) => ({
        id,
        channel: '',
        days: '0',
        hours: '0',
        subject: '',
        body: '',
        recipientType: 'agent',
        recipientValue: [],
        recipientOptions: [],
        placeholder: '',
    });

    const [actions, setActions] = useState([generateActionTemplate(uuid())]);

    // console.log('ACTIONS => ', actions);

    const mapRSelectNonPersonOptions = (entity, cb) => {
        const mappedItems = [];
        entity.map((item) => {
            mappedItems.push({ value: item.id, label: item.name });
        });
        return cb(mappedItems);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAutomationBody((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleCategorySelect = (value) => {
        setAutomationBody((prev) => ({ ...prev, categories: value }));
    };

    // FUNCTION TO CREATE AN AUTOMATION
    const createAutomation = async () => {
        const dueDate =
            Math.floor(Number(automationBody.durationDays) || 0) * 24 + Number(automationBody.durationHours);

        const requestBody = {
            name: automationBody.title,
            dueDate: dueDate * 60,
            reminder: {
                categories: automationBody.categories.map((cat) => cat.value),
                agreements: actions.map((act) => ({
                    days: Math.floor(Number(act.days) || 0),
                    hours: Math.floor((Number(act.hours) || 0) * 60),
                    action: act.channel.value,
                    subject: act.subject,
                    body: act.body,
                    recipient: {
                        type: act.recipientType,
                        ids: act.recipientValue.map((val) => val.value),
                    },
                })),
            },
        };

        console.log('AUTOMATION REQUEST BODY => ', requestBody);

        setPolicyLoading(true);
        const res = await httpPostMain('sla', requestBody);

        if (res?.status === 'success') {
            setPolicyLoading(false);
            NotificationManager.success('New Automation created', 'Success');
            router.push('/settings/automations');
        } else {
            console.error(res.er);
            setPolicyLoading(false);
            return NotificationManager.error(res?.er?.message, 'Error', 4000);
        }
    };

    // FUNCTION TO GET AUTOMATION INFORMATION IF IN EDIT MODE
    const getAutomationInfo = async () => {
        setPolicyLoading(true);
        const res = await httpGetMain(`sla/${automationId}`);
        setPolicyLoading(false);
        if (res?.status === 'success') {
            const data = res?.data;

            // console.log('AUTOMATION DATA => ', data)

            if (data) {
                // console.log('AUTOMATION DATA => ', data);
                setIsLoaded(true);
                setAutomationBody((prev) => ({
                    ...prev,
                    title: data?.name,

                    // durationDays: Math.floor((Number(data?.due_date) || 0) / 1440) || 0,
                    // durationHours: Math.floor((Number(data?.due_date) % 1440) / 60) || 0,

                    durationDays: Math.floor((Number(data?.due_date) || 0) / 1440) || 0,
                    durationHours: (Number(data?.due_date) % 1440) / 60 || 0,

                    categories: data?.reminder?.categories?.map((catId) => ({
                        value: catId,
                        label: categoriz.find((x) => x.id === catId)?.name,
                    })),
                }));

                setActions(
                    data?.reminder?.agreements?.map((act) => ({
                        id: uuid(),
                        channel:
                            act?.action?.toLowerCase() === 'email'
                                ? {
                                      value: wordCapitalize(act?.action || '').trim(),
                                      label: wordCapitalize(act?.action || '').trim(),
                                  }
                                : { value: act?.action?.toUpperCase(), label: act?.action?.toUpperCase() },
                        days: act?.days || 0,
                        hours: Number(act?.hours) / 60 || 0,
                        subject: act?.subject || '',
                        body: act.body,
                        recipientType: act?.recipient?.type || 'agent',
                        recipientOptions:
                            act?.recipient?.type === 'agent'
                                ? agents
                                      .filter((agent) => agent?.isActivated)
                                      .map((agent) => ({
                                          value: agent.id,
                                          label: wordCapitalize(
                                              `${agent?.firstname || ''} ${agent?.lastname || ''}`.trim(),
                                          ),
                                      }))
                                : groups.map((group) => ({
                                      value: group?.id,
                                      label: wordCapitalize(group?.name || ''),
                                  })),
                        recipientValue: act?.recipient?.ids?.map((x) => ({
                            value: x,
                            label:
                                act?.recipient?.type === 'agent'
                                    ? wordCapitalize(
                                          `${agents.find((agent) => agent.id === x)?.firstname || ''} ${
                                              agents.find((agent) => agent.id === x)?.lastname || ''
                                          }`.trim(),
                                      )
                                    : act?.recipient?.type === 'group'
                                    ? wordCapitalize(`${groups.find((group) => group.id === x)?.name || ''}`.trim())
                                    : [],
                        })),
                        // placeholder: ''
                    })),
                );
            }
        } else {
            return NotificationManager.error(res?.er?.message, 'Error', 4000);
        }
    };

    useEffect(() => {
        if (isUserAuthenticated) {
            // agent is needed, so fetch agents
            getAgents();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserAuthenticated]);

    useEffect(() => {
        if (isAgentsLoaded && isGroupsLoaded && !isLoaded) {
            // check for edit mode and get automation with id
            if (automationId) {
                getAutomationInfo();
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAgentsLoaded, isGroupsLoaded]);

    // FUNCTION TO UPDATE AN AUTOMATION IF IN EDIT MODE
    const updateAutomationPolicy = async () => {
        setPolicyLoading(true);
        const dueDate =
            Math.floor(Number(automationBody.durationDays) || 0) * 24 + Number(automationBody.durationHours);

        const requestBody = {
            name: automationBody.title,
            dueDate: dueDate * 60,
            reminder: {
                categories: automationBody.categories.map((cat) => cat.value),
                agreements: actions.map((act) => ({
                    days: Math.floor(Number(act.days) || 0),
                    hours: Math.floor((Number(act.hours) || 0) * 60),
                    action: act.channel.value,
                    subject: act.subject,
                    body: act.body,
                    recipient: {
                        type: act.recipientType,
                        ids: act.recipientValue.map((val) => val.value),
                    },
                })),
            },
        };

        const res = await httpPatchMain(`sla/${automationId}`, requestBody);
        setPolicyLoading(false);
        if (res?.status === 'success') {
            NotificationManager.success('Automation updated successfully', 'Success');
            router.push('/settings/automations');
        } else {
            console.error(res.er);
            return NotificationManager.error(res?.er?.message, 'Error', 4000);
        }
    };

    useEffect(() => {
        mapRSelectNonPersonOptions(categoriz, (category) => {
            setRSCategoriesOptions(category);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleMinorKeydown = (e) => {
        const unwanted = ['-', '+', 'e'];

        if (unwanted.includes(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <div className="new-automation-policy">
            {policyLoading && (
                <div className={`cust-table-loader ${policyLoading && 'add-loader-opacity'}`}>
                    <MoonLoader loading={policyLoading} color={brandKit({ bgCol: 0 })?.backgroundColor} size={30} />
                </div>
            )}
            <div className="card card-body bg-white border-0 p-0 ">
                <div className="col-md-8">
                    <div id="mainContentHeader">
                        <h6 className="text-muted f-14">
                            <Link to="/settings">
                                <span className="text-custom">Settings</span>
                            </Link>{' '}
                            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                            <Link to="/settings/automations">
                                <span className="text-custom">Automations</span>
                            </Link>
                            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                            <span>{automationId ? 'Edit' : 'New'} Automation</span>
                        </h6>
                    </div>
                    <div id="setting-form">
                        <h5 className="mt-3 mb-4 f-16 fw-bold">{automationId ? 'Edit' : 'New'} SLA Policy</h5>
                        <form action="" className="sla-form">
                            <div className="form-group mt-3">
                                <label htmlFor="slaName" className="f-14 mb-1">
                                    SLA Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="slaName"
                                    name="title"
                                    value={automationBody.title}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* CATEGORIES SELECTOR */}
                            <div className="form-group mt-3">
                                <label htmlFor="ticket" className="f-14 mb-1">
                                    Ticket Categories
                                </label>
                                <RSelect
                                    className=""
                                    name="categories"
                                    isMulti
                                    isClearable={false}
                                    value={automationBody.categories}
                                    options={RSCategoriesOptions}
                                    onChange={handleCategorySelect}
                                />
                            </div>

                            {/* DURATION */}
                            <div className="Resolution mt-3">
                                <label htmlFor="ticket" className="f-14 mb-1">
                                    Duration
                                </label>

                                {/* <div className="mb-3 d-flex align-items-center">
                  <input
                    type="number"
                    max={59}
                    min={0}
                    className="number-input form-control form-control-sm"
                    id="slaName"
                    name="durationDays"
                    value={automationBody?.durationDays}
                    onChange={handleInputChange}
                  />
                  <span className="ps-2 me-2">Days</span>
                  <input
                    type="number"
                    max={30}
                    min={0}
                    className="number-input form-control form-control-sm"
                    id="slaName"
                    name="durationHours"
                    onkeydown="return false"
                    value={automationBody?.durationHours}
                    onChange={handleInputChange}
                  />
                  <span className="ps-2 me-2">Hours</span>
                </div> */}

                                <div className="input-group w-50 me-2 mb-3">
                                    <input
                                        type="number"
                                        min={0}
                                        className="form-control"
                                        name="durationDays"
                                        value={automationBody?.durationDays}
                                        onChange={handleInputChange}
                                        onKeyDown={handleMinorKeydown}
                                    />
                                    <span className="input-group-text acx-fs-8">Days</span>
                                    <input
                                        type="number"
                                        min={0}
                                        className="form-control"
                                        name="durationHours"
                                        onKeyDown="return false"
                                        value={automationBody?.durationHours}
                                        onChange={handleInputChange}
                                        onKeyDown={handleMinorKeydown}
                                    />
                                    <span className="input-group-text acx-fs-8">Hours</span>
                                </div>
                            </div>

                            <div id="resolution-wrapper mt-4">
                                <label htmlFor="ticket" className="d-flex p-2 ps-0">
                                    Actions
                                </label>

                                {actions.map((action, i) => (
                                    <AutomationAction
                                        key={i}
                                        availablePlaceholders={availablePlaceholders}
                                        action={action}
                                        setActions={setActions}
                                        generateActionTemplate={generateActionTemplate}
                                        actions={actions}
                                    />
                                ))}
                            </div>
                        </form>

                        <div className="float-end mb-5">
                            <Link to="/settings/automations" className="btn btn-sm f-12 border cancel px-4">
                                Cancel
                            </Link>
                            <button
                                className={`btn btn-sm ms-2 f-12 px-4 ${css({
                                    ...brandKit({ bgCol: 0 }),
                                    color: 'white',
                                    '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                                })}`}
                                onClick={automationId ? updateAutomationPolicy : createAutomation}
                            >
                                {automationId ? 'Save Changes' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        categoriz: state.category.categories,
        agents: state.agent.agents,
        isAgentsLoaded: state.agent.isAgentsLoaded,
        groups: state.group.groups,
        isGroupsLoaded: state.group.isGroupsLoaded,
        isUserAuthenticated: state.userAuth.isUserAuthenticated,
    };
};

export default connect(mapStateToProps, { getAgents })(NewAutomationPolicy);
