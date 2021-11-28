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
import {getCurrentEmailTemplate, updateEmailTemplate} from './../../../../../reduxstore/actions/emailTemplateActions';
// 
import "./newEmailTemplate.scss";
import "../NotificationSettings.scss";

const EditEmailTemplate = ({isCurrentEmailTemplateLoaded, getCurrentEmailTemplate, currentEmailTemplate, updateEmailTemplate}) => {
    // 
    const {id} = useParams();
    // 
    // const availablePlaceholders = ["name", "ticket", "category", "open", "closed"];
    const availablePlaceholders = ["ticket", "customer", "status", "category"];
    const [placeholder, setPlaceholder] = useState("");
    const [custLoading, setCustLoading] = useState(false);
    const [newTemplate, setNewTemplate] = useState({title: "", subject: "", body: "", type: ""});
    // 
    useEffect(() => {
        setCustLoading(!isCurrentEmailTemplateLoaded)
        if (isCurrentEmailTemplateLoaded) {
            setNewTemplate(prev => ({
                ...prev,
                title: currentEmailTemplate?.title || '',
                subject: currentEmailTemplate?.subject || '',
                body: currentEmailTemplate?.body || '',
                type: currentEmailTemplate?.type || ''
            }))
            // console.log(currentEmailTemplate);
            setPlaceholder('Start typing...');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCurrentEmailTemplateLoaded]);

    // 
    useEffect(() => {
        if(id){
            getCurrentEmailTemplate(id)
        }
    }, [id])

    const insertPlaceholder = (i) => {
        const shortCode = `{${availablePlaceholders[i]}}`;
        setNewTemplate({
            ...newTemplate,
            text: newTemplate.body + " " + shortCode + " "
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

    const handleSubmit = () => {
        setCustLoading(true);
        const emailTemplateEdit = {
            title: newTemplate.title,
            subject: newTemplate.subject,
            body: newTemplate.body,
            "type": newTemplate.type
        };
        updateEmailTemplate(id, emailTemplateEdit, 
            () => {
                setCustLoading(false);
                NotificationManager.success('Template updated successfully', 'Success');
            }, 
            (errMsg) => {
                setCustLoading(false);
                NotificationManager.error(errMsg, 'An error occured', 'Opps')
            }
        );
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
                            <div className="form-group mt-3">
                                <label htmlFor="slaName" className="f-14 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="title"
                                    name="title"
                                    value={newTemplate.title || ""}
                                    onChange={handleChange}/>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="slaName" className="f-14 mb-1">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="subject"
                                    name="subject"
                                    value={newTemplate.subject || ""}
                                    onChange={handleChange}/>
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="ticket" className="f-14 mb-1">
                                    Notification Type
                                </label>
                                <select
                                    className="form-select form-select-sm f-14"
                                    id="type"
                                    name="type"
                                    value={newTemplate.type || ""}
                                    // onChange={handleChange}
                                    disabled
                                >
                                    <option value="">Select category</option>
                                    <option value="emailAutoRespond">Email Auto Respond</option>
                                    <option value="agentActivation">Agent Activation</option>
                                    <option value="customerActivation">Customer Activation</option>
                                </select>
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
                                    text={newTemplate.body}
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
                                    Update
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    isCurrentEmailTemplateLoaded: state.emailTemplate.isCurrentEmailTemplateLoaded,
    currentEmailTemplate: state.emailTemplate.currentEmailTemplate,
});

export default connect(mapStateToProps, {getCurrentEmailTemplate, updateEmailTemplate})(EditEmailTemplate);
