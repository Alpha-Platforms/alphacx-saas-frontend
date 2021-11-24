import {useEffect, useState} from 'react';
// 
import {connect} from 'react-redux';
import {useHistory, Link, useParams} from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {NotificationManager} from 'react-notifications';
// 
import Form from "react-bootstrap/Form";
// 
import EditorBox from "../../../../reusables/EditorBox";
import AddIcon from "../../../../../assets/icons/add.svg";
import DeleteIcon from "../../../../../assets/icons/Delete.svg";
import RightArrow from "../../../../../assets/imgF/arrow_right.png";
// 
import {getConfigs, updateEmailConfig} from './../../../../../reduxstore/actions/configActions';
// 
import "./newEmailTemplate.scss";
import "../NotificationSettings.scss";

const EditEmailTemplate = ({isConfigsLoaded, configs, getConfigs, updateEmailConfig}) => {
    // 
    const {id} = useParams();
    // 
    // const availablePlaceholders = ["name", "ticket", "category", "open", "closed"];
    const availablePlaceholders = ["ticket", "customer", "status", "category"];
    const [placeholder, setPlaceholder] = useState("");
    const [custLoading, setCustLoading] = useState(false);
    const [newTemplate, setNewTemplate] = useState({text: "", subject: "", name: ""});

    useEffect(() => {
        setCustLoading(!isConfigsLoaded)
        if (isConfigsLoaded) {
            const emailTemplate = configs
                ?.email_config
                    ?.template;
            setNewTemplate(prev => ({
                ...prev,
                name: emailTemplate
                ?.title || '',
                subject: emailTemplate
                    ?.subject || '',
                text: emailTemplate
                    ?.ticket_template || ''
            }))
            setPlaceholder('Start typing...');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConfigsLoaded]);

    const insertPlaceholder = (i) => {
        const shortCode = `{${availablePlaceholders[i]}}`;
        setNewTemplate({
            ...newTemplate,
            text: newTemplate.text + " " + shortCode + " "
        });
        setPlaceholder(" " + shortCode + " ");
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewTemplate({
            ...newTemplate,
            [name]: value
        });
    };

    const submitNotificationTemplate = async() => {
        console.clear();
    };

    const history = useHistory();

    const redirectUser = () => {
      history.push('/settings/notifications');
    }

    const updateSuccess = () => {
        getConfigs(redirectUser);
        NotificationManager.success('Template updated successfully', 'Success');
    }

    const updateFailed = () => {
        NotificationManager.error('An error occured', 'Opps');
    }

    const handleSubmit = () => {
        setCustLoading(true);
        const newEmailTemplate = {
            template: {
                title: newTemplate.name,
                subject: newTemplate.subject,
                ticket_template: newTemplate.text
            }
        };
        updateEmailConfig(newEmailTemplate, updateSuccess, updateFailed);
    }

    return (
        <div className="new-email-template notification-settings">
            {custLoading && <div className="cust-table-loader"><ScaleLoader loading={custLoading} color={"#006298"}/></div>}
            <div className="card card-body bg-white border-0 p-5">
                <div className="col-md-8">
                    <div id="mainContentHeader">
                        <h6 className="text-muted f-14">
                            <Link to="/settings">
                                <span className="text-custom">Settings</span>
                            </Link>{" "}
                            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3"/> {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
                            <Link to="/settings/notifications/">
                                <span className="text-custom">Notifications Settings</span>{" "}
                            </Link>
                            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3"/>
                            <span>Notification Template</span>
                        </h6>
                    </div>
                    <div id="setting-form">
                        <h5 className="mt-3 mb-4 f-16 fw-bold">Edit Notification Template</h5>
                        <Form onSubmit={(e) => e.preventDefault()}>
                            {/* <div className="form-group mt-3">
                                <label htmlFor="ticket" className="f-14 mb-1">
                                    Notification Category
                                </label>
                                <select
                                    className="form-select form-select-sm f-14"
                                    id="ticket"
                                    name="category"
                                    value={newTemplate.category || ""}
                                    onChange={handleChange}
                                >
                                    <option value="">Select category</option>
                                    <option value="email">Email</option>
                                    <option value="whatsapp">WhatsApp</option>
                                    <option value="sms">SMS</option>
                                </select>
                            </div> */}
                            <div className="form-group mt-3">
                                <label htmlFor="slaName" className="f-14 mb-1">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="slaName"
                                    name="subject"
                                    value={newTemplate.subject || ""}
                                    onChange={handleChange}/>
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="slaName" className="f-14 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="slaName"
                                    name="name"
                                    value={newTemplate.name || ""}
                                    onChange={handleChange}/>
                            </div>

                            <div className="form-group mt-3 mb-4">
                                <label className="f-14 mb-1">Available Placeholders</label>
                                <div className="available-placeholders">
                                    {availablePlaceholders.map((item, i) => (
                                        <p key={i} onClick={() => insertPlaceholder(i)}>
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group mt-3 mb-5">
                                <label className="f-14 mb-1">Body</label>
                                <EditorBox
                                    text={newTemplate.text}
                                    editorClassName="automation-editor"
                                    textFormat={"plain"}
                                    updateText={setNewTemplate}
                                    placeholder={placeholder}
                                    textParent={newTemplate}
                                    setPlaceholder={setPlaceholder}
                                />
                            </div>
                            <div className="text-end">
                                <Link
                                    to="/settings/notifications"
                                    className="btn btn-sm bg-outline-custom cancel px-4">
                                    Cancel
                                </Link>
                                <button className="btn btn-sm acx-btn-primary ms-2 px-4" onClick={handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({isConfigsLoaded: state.config.isConfigsLoaded, configs: state.config.configs});

export default connect(mapStateToProps, {getConfigs, updateEmailConfig})(EditEmailTemplate);
