/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import { NotificationManager } from 'react-notifications';
import { css } from '@emotion/css';
import Form from 'react-bootstrap/Form';
import EditorBox from '../../../../reusables/EditorBox';
import AddIcon from '../../../../../assets/icons/add.svg';
import DeleteIcon from '../../../../../assets/icons/Delete.svg';
import RightArrow from '../../../../../assets/imgF/arrow_right.png';
import { addEmailTemplate } from '../../../../../reduxstore/actions/emailTemplateActions';
import { allPlaceholders,  templateTypes} from './placeholders'
import './newEmailTemplate.scss';
import '../NotificationSettings.scss';
import { brandKit } from './../../../../../helper';

function NewEmailTemplate({ addEmailTemplate, emailTemplates }) {

    const history = useHistory();

    const [specificPlaceholders, setSpecificPlaceholders] = useState([]);
    const [placeholder, setPlaceholder] = useState('');
    const [custLoading, setCustLoading] = useState(false);
    const [newTemplate, setNewTemplate] = useState({ title: '', subject: '', text: '', type: '' });
    const [existingTypes, setExistingTypes] = useState([]);

    useEffect(() => {
      setExistingTypes(emailTemplates.map(i => i.type))
    }, [emailTemplates])

    const insertPlaceholder = (i) => {
        const shortCode = `{${specificPlaceholders[i].placeHolder}}`;
        setNewTemplate({
            ...newTemplate,
            text: `${newTemplate.text} ${shortCode} `,
        });
        setPlaceholder(` ${shortCode} `);
    };

    const getPlaceholders = (value) => {
        setSpecificPlaceholders(allPlaceholders[value]);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTemplate({
            ...newTemplate,
            [name]: value,
        });

        if(name === 'type') getPlaceholders(value)
    };

    const redirectUser = () => {
        history.push('/settings/notifications');
    };

    const handleSubmit = () => {

        if (newTemplate.title && newTemplate.subject && newTemplate.text && newTemplate.type) {
            setCustLoading(true);
            const newEmailTemplate = {
                title: newTemplate.title,
                subject: newTemplate.subject,
                body: newTemplate.text,
                type: newTemplate.type,
            };
            
            addEmailTemplate(
                newEmailTemplate,
                () => {
                    setCustLoading(false);
                    NotificationManager.success('Template created successfully', 'Success');
                    redirectUser();
                },
                (errMsg) => {
                    setCustLoading(false);
                    NotificationManager.error(errMsg, 'An error occured', 4000);
                },
            );
        } else {
            NotificationManager.error('All fields are required', 'Validation Error', 4000);
        }
    };

    return (
        <div className="new-email-template notification-settings">
            {custLoading && (
                <div className="cust-table-loader">
                    <MoonLoader loading={custLoading} color={brandKit({ bgCol: 0 })?.backgroundColor} size={30} />
                </div>
            )}
            <div className="card card-body bg-white border-0 p-5">
                <div className="col-md-8">
                    <div id="mainContentHeader">
                        <h6 className="text-muted f-14">
                            <Link to="/settings">
                                <span className="text-custom">Settings</span>
                            </Link>{' '}
                            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                            <Link to="/settings/notifications/">
                                <span className="text-custom">Notifications Settings</span>{' '}
                            </Link>
                            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                            <span>Notification Template</span>
                        </h6>
                    </div>
                    <div id="setting-form">
                        <h5 className="mt-3 mb-4 f-16 fw-bold">Edit Notification Template</h5>
                        <Form onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group mt-3">
                                <label htmlFor="slaName" className="f-14 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="slaName"
                                    name="title"
                                    value={newTemplate.title || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="slaName" className="f-14 mb-1">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="slaName"
                                    name="subject"
                                    value={newTemplate.subject || ''}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="ticket" className="f-14 mb-1">
                                    Notification Type
                                </label>
                                <select
                                    className="form-select form-select-sm f-14"
                                    id="type"
                                    name="type"
                                    value={newTemplate.type || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Select category
                                    </option>
                                    {templateTypes.filter((i) => !existingTypes.includes(i.value)).map((item) => <option value={item.value}>{item.text}</option>)}
                                    
                                </select>
                            </div>
                            <div className="form-group mt-3 mb-4">
                                <label className="f-14 mb-1">Available Placeholders</label>
                                <div className="available-placeholders">
                                    {specificPlaceholders.map((item, i) => (
                                        <p key={i} onClick={() => insertPlaceholder(i)}>
                                            {item.title}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group mt-3 mb-5">
                                <label className="f-14 mb-1">Body</label>
                                <EditorBox
                                    text={newTemplate.text}
                                    editorClassName="automation-editor"
                                    textFormat="plain"
                                    placeholder={placeholder}
                                    textParent={newTemplate}
                                    setPlaceholder={setPlaceholder}
                                    updateText={setNewTemplate}
                                />
                                {/*  // updateText={setNewTemplate}
                                   updateText={val => setNewTemplate((prevState) =>({
                                            ...prevState,
                                            body: val
                                        }))
                                    }
                                    // placeholder={action.placeholder}
                                    // setPlaceholder={val => setActionState({
                                    //     placeholder: val
                                    // })}
                                    // updateVal={actions.length} */}
                            </div>
                            <div className="text-end mb-5">
                                <Link to="/settings/notifications" className="btn btn-sm px-3 me-2 border reset-btn-outline">
                                    Cancel
                                </Link>
                                <button className={`btn btn-sm ms-2 px-3 ${css({
                                ...brandKit({ bgCol: 0 }),
                                color: 'white',
                                '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                            })}`} onClick={handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => (
    { 
        configs: state.config.configs,
        emailTemplates: state.emailTemplate.emailTemplates,
    }
);

export default connect(mapStateToProps, { addEmailTemplate })(NewEmailTemplate);
