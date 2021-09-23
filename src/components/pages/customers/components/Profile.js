import {useState, Fragment, useEffect} from 'react';
// react bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
// 
import {getUserInitials} from '../../../../helper';
import {ExpandChat} from "../../../../assets/images/svgs";


const Profile = (currentCustomer) => {
    const [editProfile, setEditProfile] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    //  useEffect(() => {
    // }, [])
    const handleEditProfile = () =>{
        setEditProfile(!editProfile);
    }

    return (
        <Fragment>
            <Form className="">
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
                                        <Form.Control type="text" className={`text-dark ${editProfile? "" : "py-0"}`} plaintext={!editProfile} readOnly={!editProfile} defaultValue={currentCustomer?.firstname}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className={`d-inline-flex flex-column flex-grow-0 ${editProfile? "" : "border-bottom"} pb-2 form-group acx-form-group`}>
                                        <Form.Label className="text-muted small mb-1">Last Name</Form.Label>
                                        <Form.Control type="text" className={`text-dark ${editProfile? "" : "py-0"}`} plaintext={!editProfile} readOnly={!editProfile} defaultValue={currentCustomer?.lastname}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className={`d-inline-flex flex-column flex-grow-0 ${editProfile? "" : "border-bottom"} pb-2 form-group acx-form-group`}>
                                        <Form.Label className="text-muted small mb-1">Middle Name</Form.Label>
                                        <Form.Control type="text" className={`text-dark ${editProfile? "" : "py-0"}`} plaintext={!editProfile} readOnly={!editProfile} defaultValue={"N/A"}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-between mb-3">
                                <Col>
                                    <Form.Group className={`d-inline-flex flex-column flex-grow-0 ${editProfile? "" : "border-bottom"} pb-2 form-group acx-form-group`}>
                                        <Form.Label className="text-muted small mb-1">Title</Form.Label>
                                        <Form.Control type="text" className={`text-dark ${editProfile? "" : "py-0"}`} plaintext={!editProfile} readOnly={!editProfile} defaultValue={"N/A"}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className={`d-inline-flex flex-column flex-grow-0 ${editProfile? "" : "border-bottom"} pb-2 form-group acx-form-group`}>
                                        <Form.Label className="text-muted small mb-1">Gender</Form.Label>
                                        <Form.Control type="text" className={`text-dark ${editProfile? "" : "py-0"}`} plaintext={!editProfile} readOnly={!editProfile} defaultValue={"N/A"}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className={`d-inline-flex flex-column flex-grow-0 ${editProfile? "" : "border-bottom"} pb-2 form-group acx-form-group`}>
                                        <Form.Label className="text-muted small mb-1">Birthday</Form.Label>
                                        <Form.Control type="text" className={`text-dark ${editProfile? "" : "py-0"}`} plaintext={!editProfile} readOnly={!editProfile} defaultValue={"N/A"}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={4}>
                            <div className="text-center">
                                {currentCustomer?.avatar ? <div className="avatar avatar-xxl d-flex justify-content-center overflow-hidden mx-auto rounded-3">
                                                            <img src={currentCustomer.avatar} alt={`${currentCustomer.firstname} ${currentCustomer.lastname == "default" ? "" : currentCustomer.lastname}`} width="200" height="auto"/>
                                                        </div> 
                                                        : <div className="user-initials blue mx-auto d-flex justify-content-center align-items-center avatar avatar-xl rounded-3">
                                                            <h1 className="">{getUserInitials(`${currentCustomer.firstname} ${currentCustomer.lastname == "default" ? "" : currentCustomer.lastname}`)}</h1>
                                                        </div>
                            }
                            </div>
                        </Col>
                    </Row>
                    <div className="mb-3 border-bottom">
                        <Form.Group className={`d-inline-flex flex-column flex-grow-0 ${editProfile? "" : "border-bottom"} pb-2 form-group acx-form-group`}>
                            <Form.Label className="text-muted small mb-1">Phone</Form.Label>
                            <Form.Control type="tel" className={`text-dark ${editProfile? "" : "py-0"}`} 
                                plaintext={!editProfile} readOnly={!editProfile} 
                                defaultValue={currentCustomer.phoneNumber ? currentCustomer.phoneNumber : currentCustomer.phone_number ? currentCustomer.phone_number : ''}/>
                        </Form.Group>
                    </div>
                    <h6 className="text-muted mb-4 acx-ls-30 acx-fs-12">ADDRESS</h6>
                    <Row className="mb-3">
                        <Col md={8}>
                            <Row className="justify-content-between mb-3">
                                <Col md={8}>
                                    <Form.Group className={`d-inline-flex flex-column flex-grow-0 ${editProfile? "" : "border-bottom"} pb-2 mb-3 form-group acx-form-group`}>
                                        <Form.Label className="text-muted small mb-1">Address</Form.Label>
                                        <Form.Control type="text" className={`text-dark ${editProfile? "" : "py-0"}`} plaintext={!editProfile} readOnly={!editProfile} defaultValue={"N/A"}/>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className={`d-inline-flex flex-column flex-grow-0 ${editProfile? "" : "border-bottom"} pb-2 mb-3 form-group acx-form-group`}>
                                        <Form.Label className="text-muted small mb-1">Zip Code</Form.Label>
                                        <Form.Control type="text" className={`text-dark ${editProfile? "" : "py-0"}`} plaintext={!editProfile} readOnly={!editProfile} defaultValue={"N/A"}/>
                                    </Form.Group>
                                </Col>
                                <Col md={8}>
                                    <Form.Group className={`d-inline-flex flex-column flex-grow-0 ${editProfile? "" : "border-bottom"} pb-2 mb-3 form-group acx-form-group`}>
                                        <Form.Label className="text-muted small mb-1">City</Form.Label>
                                        <Form.Control type="text" className={`text-dark ${editProfile? "" : "py-0"}`} plaintext={!editProfile} readOnly={!editProfile} defaultValue={"N/A"}/>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className={`d-inline-flex flex-column flex-grow-0 ${editProfile? "" : "border-bottom"} pb-2 mb-3 form-group acx-form-group`}>
                                        <Form.Label className="text-muted small mb-1">Zip Code</Form.Label>
                                        <Form.Control type="text" className={`text-dark ${editProfile? "" : "py-0"}`} plaintext={!editProfile} readOnly={!editProfile} defaultValue={"N/A"}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Collapse in={showDetails}>
                        <div className="py-3 border-top ">
                            <h6 className="text-muted mb-4 acx-ls-30 acx-fs-12">SUBSCRIPTION INFORMATION</h6>
                            <Row className="mb-3">
                                <Col md={8}>
                                    <Row className="justify-content-between mb-3">
                                        <Col md={8}>
                                            <Form.Group className={`d-inline-flex flex-column flex-grow-0 ${editProfile? "" : "border-bottom"} pb-2 mb-3 form-group acx-form-group`}>
                                                <Form.Label className="text-muted small mb-1">Registration Date</Form.Label>
                                                <Form.Control type="text" className={`text-dark ${editProfile? "" : "py-0"}`} plaintext={!editProfile} readOnly={!editProfile} defaultValue={"..."}/>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className={`d-inline-flex flex-column flex-grow-0 ${editProfile? "" : "border-bottom"} pb-2 mb-3 form-group acx-form-group`}>
                                                <Form.Label className="text-muted small mb-1">Status</Form.Label>
                                                <Form.Control type="text" className={`text-dark ${editProfile? "" : "py-0"}`} plaintext={!editProfile} readOnly={!editProfile} defaultValue={"..."}/>
                                            </Form.Group>
                                        </Col>
                                        <Col md={8}>
                                            <Form.Group className={`d-inline-flex flex-column flex-grow-0 ${editProfile? "" : "border-bottom"} pb-2 mb-3 form-group acx-form-group`}>
                                                <Form.Label className="text-muted small mb-1">Plan</Form.Label>
                                                <Form.Control type="text" className={`text-dark ${editProfile? "" : "py-0"}`} plaintext={!editProfile} readOnly={!editProfile} defaultValue={"..."}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Collapse>
                    
                    <div className="py-3">
                        <a href="#expand-profile" className="d-inline-block app-link-primary" onClick={() => setShowDetails(!showDetails)}>
                            <span className=""><ExpandChat /></span>
                            <span className="ps-3">{showDetails ? "View less information" : "View more information"}</span>
                        </a>
                    </div>
                    <div className="py-3 text-end">
                        {(editProfile)? (
                            <Button type="submit" className="acx-btn-primary px-3">Update Profile</Button>
                        ): ""}
                    </div>
                </Container>
            </Form>
        </Fragment>
    );
};

export default Profile;
// export default Profile