import {useEffect} from 'react';
import "./newEmailTemplate.scss";
import "../NotificationSettings.scss";
import RightArrow from "../../../../../assets/imgF/arrow_right.png";
import DeleteIcon from "../../../../../assets/icons/Delete.svg";
import AddIcon from "../../../../../assets/icons/add.svg";
import EditorBox from "../../../../reusables/EditorBox";
import {useState} from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {getConfigs, updateEmailConfig} from './../../../../../reduxstore/actions/configActions';
import {NotificationManager} from 'react-notifications';

const NewEmailTemplate = ({isConfigsLoaded, configs, getConfigs, updateEmailConfig}) => {
    const availablePlaceholders = ["name", "ticket", "category", "open", "closed"];
    const [placeholder,
        setPlaceholder] = useState("");
    const [custLoading,
        setCustLoading] = useState(false);
    const [newTemplate,
        setNewTemplate] = useState({text: "", subject: "", name: ""});

    useEffect(() => {
        setCustLoading(!isConfigsLoaded)
        if (isConfigsLoaded) {
            const emailTemplate = configs
                ?.email_config
                    ?.template;

            setNewTemplate(prev => ({
                ...prev,
                name: 'Ticket Email Template',
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
        const shortCode = `{{${availablePlaceholders[i]}}}`;
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

    const updateSuccess = () => {
        getConfigs();
        NotificationManager.success('Template updated successfully', 'Success');
    }

    const updateFailed = () => {
        NotificationManager.error('An error occured', 'Opps');
    }

    const handleSubmit = () => {
        setCustLoading(true);
        const newEmailTemplate = {
            template: {
                title: configs?.email_config?.template?.title,
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
                        <form action="">
                            <div className="form-group mt-3">
                                <label for="slaName" className="f-14 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="slaName"
                                    name="name"
                                    value={newTemplate.name || ""}
                                    onChange={handleChange}/>
                            </div>

                            {/* <div className="form-group mt-3">
                <label for="ticket" className="f-14 mb-1">
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
                                <label for="slaName" className="f-14 mb-1">
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
                                <label className="f-14 mb-1">Description</label>

                                <EditorBox
                                    text={newTemplate.text}
                                    textParent={newTemplate}
                                    updateText={setNewTemplate}
                                    textFormat={"plain"}
                                    placeholder={placeholder}
                                    setPlaceholder={setPlaceholder}/>
                            </div>
                        </form>

                        <div className="float-end mb-5">
                            <Link
                                to="/settings/notifications"
                                className="btn btn-sm f-12 bg-outline-custom cancel px-4">
                                Cancel
                            </Link>
                            <button className="btn btn-sm ms-2 f-12 bg-custom px-4" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({isConfigsLoaded: state.config.isConfigsLoaded, configs: state.config.configs});

export default connect(mapStateToProps, {getConfigs, updateEmailConfig})(NewEmailTemplate);
