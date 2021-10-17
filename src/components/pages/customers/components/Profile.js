import {useState, Fragment, useEffect} from 'react';
import {NotificationManager} from 'react-notifications';
import {connect} from 'react-redux';
import RSelect from 'react-select/creatable';
// react bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Collapse from 'react-bootstrap/Collapse';
// 
import {getUserInitials} from '../../../../helper';
import {
  httpGetMain,
  httpPatchMain
  /* httpPostMain,, */
} from "../../../../helpers/httpMethods";
import {updateCustomer} from '../../../../reduxstore/actions/customerActions';
import {countrycodes} from '../../../shared/countrycodes';

// resources
import {ExpandChat} from "../../../../assets/images/svgs";


const Profile = ({currentCustomer, customerId, updateCustomer, ...props}) => {
    const [editProfile, setEditProfile] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [customFieldConfig, setCustomFieldConfig] = useState([]);
    // 
    const [customFieldIsSet, setCustomFieldIsSet] = useState(false);
    const [mergedCustomUserFields, setMergedCustomUserFields] = useState([]);
    // profile update info
    const [processing, setProcessing] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: '', 
        lastName: '', 
        phone_number: '',
        avatar: '',
        customFields: {} 
    });
    // avatar upload
    const [uploadInfo, setUploadInfo] = useState({
        blob: null,
        msg: 'Upload logo for customer profile.',
        error: false,
        image: null,
        ownAvatar: ''
    });

    //get custom field config
    useEffect(() => {
        getCustomFieldConfig();
    },[]);

    // if customers is mounted
    useEffect(() => {
        // get
        let user_custom_fields = currentCustomer.custom_fields || {};
        let merged_custom_user_fields = customFieldConfig.map((element) =>{ 
            if(user_custom_fields.hasOwnProperty(element.id)){
                return {
                    ...element,
                    value: user_custom_fields[element.id]
                }
            }else{
                return {
                    ...element,
                    value: ""
                }
            }
        });
        setCustomFieldIsSet(true);
        setMergedCustomUserFields(merged_custom_user_fields);
    }, [currentCustomer, customFieldConfig]);

    // get custom field config 
    const getCustomFieldConfig = async() =>{
        const res = await httpGetMain(`custom-field?belongsTo=user`);
        if (res.status === "success") {
            setCustomFieldConfig(res?.data);
            return;
        } else {
            return;
        }
    }

    // 
    const handleEditProfile = () =>{
        setProfileData((prevState) => ({
            ...prevState,
            firstName: currentCustomer?.firstname,
            lastName: currentCustomer?.lastname,
            phone_number: currentCustomer.phoneNumber ? currentCustomer.phoneNumber 
                          : currentCustomer.phone_number ? currentCustomer.phone_number 
                          : '',
            avatar: currentCustomer?.avatar ? currentCustomer?.avatar : '',
        }));
        setEditProfile(!editProfile);
    }

    // handle profile inputs change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            [name] : value
        }));

    }

    // handle custom field input change
    const handleCustomFieldChange = (e) => {
        const {name, value} = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            customFields: {
                ...prevState.customFields,
                [name] : value
            }
        }));
    }

    // update profile function
    const updateProfile = async(e) => {
        setProcessing(true);
        // updateCustomer(customerId, profileData);
        const res = await httpPatchMain(`customer/${customerId}`, profileData);
        if (res.status === "success") {
            setProcessing(false);
            return NotificationManager.success("Profile successfully updated", "Success");
        }else{
            setProcessing(false);
            return NotificationManager.error(res.er.message, "Error", 4000);
        }
    }

    return (
        <Fragment>
            <Form className="" onSubmit={(e) => e.preventDefault()}>
                <Container fluid className="px-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h6 className="text-muted acx-ls-30 acx-fs-12">CONTACT INFORMATION</h6>
                        <div className="">
                            <Button title="Toggle edit profile" className={`acx-btn-icon acx-btn-icon-default  ${editProfile? "active" : ""}`} onClick={handleEditProfile}>
                                <i className="bi-pencil-square"></i>
                            </Button>
                        </div>
                    </div>
                    {/* CONTACT INFORMATION< */}
                    <Row className="mb-3">
                        <Col md={8}>
                            <Row className="justify-content-between mb-3">
                                <Col>
                                    <Form.Group className={`d-inline-flex flex-column flex-grow-0 ${editProfile? "" : "border-bottom"} pb-2 form-group acx-form-group`}>
                                        <Form.Label className="text-muted small mb-1">First Name</Form.Label>
                                        <Form.Control type="text" name="firstName" required
                                                      className={`text-dark ${editProfile? "" : "py-0"}`} 
                                                      plaintext={!editProfile} readOnly={!editProfile} 
                                                      defaultValue={currentCustomer?.firstname}
                                                      onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className={`d-inline-flex flex-column flex-grow-0 ${editProfile? "" : "border-bottom"} pb-2 form-group acx-form-group`}>
                                        <Form.Label className="text-muted small mb-1">Last Name</Form.Label>
                                        <Form.Control type="text" name="lastName" required
                                                    className={`text-dark ${editProfile? "" : "py-0"}`}
                                                    plaintext={!editProfile} readOnly={!editProfile} 
                                                    defaultValue={currentCustomer?.lastname}
                                                    onChange={handleChange}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="mb-3 border-bottom">
                                <Form.Group className={`d-inline-flex flex-column flex-grow-0 pb-2 form-group acx-form-group`}>
                                    <Form.Label className="text-muted small mb-1">Phone</Form.Label>
                                    <Form.Control type="tel" className={`text-dark ${editProfile? "" : "py-0"}`} 
                                        plaintext={!editProfile} readOnly={!editProfile} required
                                        defaultValue={currentCustomer.phoneNumber ? currentCustomer.phoneNumber 
                                                    : currentCustomer.phone_number ? currentCustomer.phone_number : ''} 
                                        onChange={handleChange}/>
                                </Form.Group>
                            </div>
                            <h6 className="text-muted mb-4 acx-ls-30 acx-fs-12">CUSTOM FIELDS</h6>
                            <Row className="justify-content-between mb-3">
                                {customFieldIsSet? 
                                    mergedCustomUserFields.map((data) => {
                                        if(data?.field_type == "select"){
                                            return (
                                                <Col md={4} key={data.id}>
                                                    <Form.Group className={`d-flex flex-column flex-grow-1 ${editProfile? "" : "border-bottom"} pb-2 mb-3 form-group acx-form-group`}>
                                                        <Form.Label className="text-muted small mb-1">{data?.field_name}</Form.Label>
                                                        <Form.Select className={`text-dark ${editProfile? "" : "ps-0 py-0 border-0 bg-white"}`} 
                                                                    plaintext={`${!editProfile}`} readOnly={!editProfile} disabled={!editProfile} 
                                                                    onChange={handleCustomFieldChange} required={data?.required}>
                                                            <option>Select</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            )
                                        }else{
                                            return (
                                                <Col md={4} key={data.id}>
                                                    <Form.Group className={`d-inline-flex flex-column flex-grow-0 ${editProfile? "" : "border-bottom"} pb-2 mb-3 form-group acx-form-group`}>
                                                        <Form.Label className="text-muted small mb-1">{data?.field_name}</Form.Label>
                                                        <Form.Control name={data?.id} type={data?.field_type} 
                                                                    className={`text-dark ${editProfile? "" : "py-0"}`} 
                                                                    plaintext={!editProfile} readOnly={!editProfile} 
                                                                    defaultValue={data?.value || "N/A"} required={data?.required}
                                                                    onChange={handleCustomFieldChange}/>
                                                    </Form.Group>
                                                </Col>
                                            )
                                        }
                                    })
                                    :
                                    <Col md={12}>
                                        <div className="text-center">
                                            <p className="">Custom field not found</p>
                                        </div>
                                    </Col>
                                }
                            </Row>
                        </Col>
                        <Col md={4}>
                            <div className="text-center">
                                {currentCustomer?.avatar ? 
                                    <div className="avatar avatar-xxl d-flex justify-content-center overflow-hidden mx-auto rounded-3">
                                        <img src={currentCustomer.avatar} alt={`${currentCustomer.firstname} ${currentCustomer.lastname == "default" ? "" : currentCustomer.lastname}`} width="200" height="auto"/>
                                    </div> 
                                    : <div className="user-initials blue mx-auto d-flex justify-content-center align-items-center avatar avatar-xl rounded-3">
                                        <h1 className="">{getUserInitials(`${currentCustomer.firstname} ${currentCustomer.lastname == "default" ? "" : currentCustomer.lastname}`)}</h1>
                                    </div>
                            }
                            </div>
                        </Col>
                    </Row>
                    <div className="py-3 text-end">
                        {(editProfile)? (
                            <Button type="submit" disabled={processing} onClick={updateProfile} className="acx-btn-primary px-3">
                                {processing? 
                                    <span className="text-light d-flex justify-content-center align-items-center">
                                        <Spinner as="span" size="sm"
                                            animation="border" variant="light"
                                            aria-hidden="true"  role="status" /> 
                                        <span className="ms-1"> Loading...</span>
                                    </span>
                                :
                                    <span>Update Profile</span>
                                }
                            </Button>
                        ): ""}
                    </div>
                </Container>
            </Form>
        </Fragment>
    );
};

const mapStateToProps = (state, ownProps) => ({});
export default connect(mapStateToProps, {updateCustomer})(Profile);
