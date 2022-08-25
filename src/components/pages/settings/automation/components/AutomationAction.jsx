/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import { connect } from 'react-redux';
import RSelect from 'react-select';
import { css } from '@emotion/css';
import EditorBox from '../../../../reusables/EditorBox';
import {ReactComponent as DeleteIcon} from '../../../../../assets/icons/Delete.svg';
import {ReactComponent as AddIcon} from '../../../../../assets/icons/add.svg';

import { httpGetMain } from '../../../../../helpers/httpMethods';
import { uuid, brandKit } from '../../../../../helper';

function AutomationAction({
    availablePlaceholders,
    agents,
    teams,
    setActions,
    action,
    actions,
    generateActionTemplate,
}) {
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [textToInsert, setTextToInsert] = useState('');
    const [forceEditorUpdate, setForceEditorUpdate] = useState(false);

    const setActionState = (valObj) => {
        setActions((prev) =>
            prev.map((x) => {
                if (x.id === action.id) {
                    return {
                        ...x,
                        ...valObj,
                    };
                }
                return x;
            }),
        );
    };

    const [actionChannels] = useState([
        { label: 'Email', value: 'email' },
    ]);

    // F U N C T I O N S
    const addAction = (e) => {
        e.preventDefault();
        setActions((prev) => [...prev, generateActionTemplate(uuid())]);
    };

    const deleteAction = (e) => {
        e.preventDefault();
        setActionState({
            body: '',
            placeholder: '',
        });
        setActions((prev) => prev.filter((x) => x.id !== action.id));
    };

    // const insertPlaceholder = (i) => {
    //     const shortCode = `{${availablePlaceholders[i]?.value}}`;

    //     setActionState({
    //         body: `${action.body} ${shortCode} `,
    //         placeholder: ` ${shortCode} `,
    //     });
    // };

    const loadRecipients = () => {
        const mappedItems = [];

        if (action.recipientType === 'agent') {
            agents
                .filter((agent) => agent?.isActivated)
                .forEach((item) => {
                    mappedItems.push({ value: item.id, label: `${item.firstname} ${item.lastname}` });
                });
        } else {
            teams.forEach((item) => {
                mappedItems.push({ value: item.id, label: item.name });
            });
        }

        setActionState({
            recipientOptions: mappedItems,
        });
    };

    const handleChannelSelect = (value) => {
        setActionState({
            channel: value,
        });
    };

    const handleRecipientSelect = (value) => {
        setActionState({
            recipientValue: value,
        });
    };

    const handleMinorInput = (e) => {
        const { name, value } = e.target;

        if (name === 'days' || name === 'hours') {
            // console.log(value);
        }

        setActionState({
            [name]: value,
        });
    };

    const handleMinorKeydown = (e) => {
        const unwanted = ['-', '+', 'e'];

        if (unwanted.includes(e.key)) {
            e.preventDefault();
        }
    };

    const handleRecipientTypeChange = (e) => {
        const { value } = e.target;
        setActionState({
            recipientType: value,
            recipientValue: [],
        });
    };

    const insertTextToEditor = (i) => {
        const shortCode = `{${availablePlaceholders[i]?.value}}`;
        setTextToInsert(`${shortCode}`);
        setForceEditorUpdate((props) => !props);
    }

    return (
        <>
            <div className="card mt-2 mb-4">
                <div className="card-body border-0 p-3 automation-action">
                    <div className="d-flex  flex-column assign">
                        <label htmlFor="channel mb-1">Notification Channel</label>

                        <RSelect
                            id="channel"
                            name="action"
                            openMenuOnFocus
                            value={action.channel}
                            onChange={handleChannelSelect}
                            options={actionChannels}
                            defaultValue={actionChannels.filter((option) => option.label === 'Email')}
                        />
                    </div>

                    <div className="mt-4 d-flex align-items-center">
                        <div className="input-group w-50 me-2">
                            <input
                                type="number"
                                name="days"
                                min={0}
                                className="form-control"
                                value={action.days}
                                onKeyDown={handleMinorKeydown}
                                onChange={handleMinorInput}
                            />
                            <span className="input-group-text acx-fs-8">Days</span>
                            <input
                                type="number"
                                name="hours"
                                min={0}
                                className="form-control"
                                value={action.hours}
                                onKeyDown={handleMinorKeydown}
                                onChange={handleMinorInput}
                            />
                            <span className="input-group-text acx-fs-8">Hours</span>
                        </div>

                        <label>after ticket creation </label>
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            className="form-control mt-2"
                            id="subject"
                            name="subject"
                            value={action.subject}
                            onChange={handleMinorInput}
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="ticket" className="f-14 mb-1">
                            Action Recipient(s)
                        </label>
                        <div className="d-flex">
                            <div className="form-check">
                                <input
                                    className={`form-check-input ${css({ '&:checked': { ...brandKit({ bgCol: 0 }) } })}`}
                                    name={`recipientType-${action.id}`}
                                    id={`recipientType-${action.id}-agent`}
                                    type="radio"
                                    value="agent"
                                    checked={action.recipientType === 'agent'}
                                    onClick={handleRecipientTypeChange}
                                />
                                <label className="form-check-label f-14" htmlFor={`recipientType-${action.id}-agent`}>
                                    Agents
                                </label>
                            </div>
                            <div className="form-check" style={{ marginLeft: 10 }}>
                                <input
                                    className={`form-check-input ${css({ '&:checked': { ...brandKit({ bgCol: 0 }) } })}`}
                                    name={`recipientType-${action.id}`}
                                    id={`recipientType-${action.id}-team`}
                                    type="radio"
                                    value="group"
                                    checked={action.recipientType === 'group'}
                                    onClick={handleRecipientTypeChange}
                                />
                                <label className="form-check-label f-14" htmlFor={`recipientType-${action.id}-team`}>
                                    Teams
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <RSelect
                                className="select-light-blue"
                                isClearable={false}
                                name="recipient"
                                isMulti
                                value={action.recipientValue}
                                onMenuOpen={() => loadRecipients()}
                                options={action.recipientOptions}
                                onChange={handleRecipientSelect}
                            />
                        </div>
                    </div>

                    <div className="form-group mt-3">
                        <label className="mb-1">Available Placeholders</label>
                        <div className="available-placeholders">
                            {availablePlaceholders.map((item, i) => (
                                // <p key={i} onClick={() => insertPlaceholder(i)}>
                                <button type="button" key={i} onClick={() => insertTextToEditor(i)} className={`btn ${css({
                                    ...brandKit({ col: 0 }),
                                    border: `1px solid ${brandKit({ col: 0 })?.color} !important`,
                                    '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                                })}`}>
                                    {item?.name}
                                </button>
                        ))}
                        </div>
                    </div>

                    <div className="form-group mt-3">
                        <label className="mb-1">Message</label>

                        <EditorBox
                            text={action.body || ''}
                            editorClassName="automation-editor"
                            // textParent={newPolicy}
                            textFormat="plain"
                            updateText={(val) =>
                                setActionState({
                                    body: val,
                                })
                            }
                            placeholder={action.placeholder}
                            setPlaceholder={(val) =>
                                setActionState({
                                    placeholder: val,
                                })
                            }
                            updateVal={actions.length}
                            textToInsert={textToInsert}
                            forceEditorUpdate={forceEditorUpdate}
                        />
                    </div>
                </div>
                <div className="card-footer bg-light px-3 py-3 d-flex align-items-center" id="customer-choice">
                    <button className="addNewResolution d-inline-flex justify-content-center align-items-center" onClick={addAction}>
                        <AddIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} /> <span className="ms-1">New Action</span>
                    </button>

                    {actions.length > 1 && (
                        <button
                            className="delete-resolution mx-4 d-inline-flex justify-content-center align-items-center pt-1"
                            onClick={(e) => {
                                e.preventDefault();
                                setDeleteConfirm(true);
                            }}
                        >
                            {/* <img src={DeleteIcon} alt="" className="img-fluid me-1 mt-n5 " /> Delete Action */}
                            <DeleteIcon stroke="red" /> <span className="ms-1">Delete Action</span>
                        </button>
                    )}
                </div>
            </div>

            <Modal open={deleteConfirm} onClose={() => setDeleteConfirm(false)} center>
                <div className="p-5 w-100">
                    <h6 className="mb-5">Are you sure you want to delete this Action?</h6>
                    <div className="float-end mb-5">
                        <button
                            className="btn btn-sm f-12 border cancel px-4"
                            onClick={() => setDeleteConfirm(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className={`btn btn-sm ms-2 f-12 px-4 ${css({
                                ...brandKit({ bgCol: 0 }),
                                color: 'white',
                                '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                            })}`}
                            onClick={(e) => {
                                deleteAction(e);
                                setDeleteConfirm(false);
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        agents: state.agent.agents,
        teams: state.group.groups,
    };
};

export default connect(mapStateToProps)(AutomationAction);
