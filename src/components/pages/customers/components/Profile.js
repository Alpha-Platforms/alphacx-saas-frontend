import {useState, Fragment, useEffect} from 'react';
// react bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
// 
import {getUserInitials} from '../../../../helper';
import {ExpandChat} from "../../../../assets/images/svgs";


const Profile = (currentCustomer) => {
    // const [customerDetails, setCustomerDetails] = useState();
    const [showDetails, setShowDetails] = useState(false);

    //  useEffect(() => {
    // }, [])

    return (
        <Fragment>
            <section className="">
                <Container fluid className="px-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h6 className="text-muted acx-ls-30 acx-fs-12">CONTACT INFORMATION</h6>
                        <div className="">
                            <Button className="acx-btn-icon">
                                <i className="bi-pencil-square"></i>
                            </Button>
                        </div>
                    </div>
                    {/* CONTACT INFORMATION< */}
                    <Row className="mb-3">
                        <Col md={8}>
                            <Row className="justify-content-between mb-3">
                                <Col>
                                    <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2">
                                        <span className="text-muted small mb-2">First Name</span>
                                        <span className="text-dark">{currentCustomer?.firstname}</span>
                                    </h6>
                                </Col>
                                <Col>
                                    <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2">
                                        <span className="text-muted small mb-2">Last Name</span>
                                        <span className="text-dark">{currentCustomer?.lastname}</span>
                                    </h6>
                                </Col>
                                <Col>
                                    <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2">
                                        <span className="text-muted small mb-2">Middle Name</span>
                                        <span className="text-dark">N/A</span>
                                    </h6>
                                </Col>
                            </Row>
                            <Row className="justify-content-between mb-3">
                                <Col>
                                    <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2">
                                        <span className="text-muted small mb-2">Title</span>
                                        <span className="text-dark">N/A</span>
                                    </h6>
                                </Col>
                                <Col>
                                    <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2">
                                        <span className="text-muted small mb-2">Gender</span>
                                        <span className="text-dark">N/A</span>
                                    </h6>
                                </Col>
                                <Col>
                                    <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2">
                                        <span className="text-muted small mb-2">Birthday</span>
                                        <span className="text-dark">N/A</span>
                                    </h6>
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
                        <h6 className="d-flex flex-column pb-2">
                            <span className="text-muted small mb-2">Phone </span>
                            <span className="text-dark">{currentCustomer.phoneNumber ? currentCustomer.phoneNumber : currentCustomer.phone_number ? currentCustomer.phone_number : ''}</span>
                        </h6>
                    </div>
                    <h6 className="text-muted mb-4 acx-ls-30 acx-fs-12">ADDRESS</h6>
                    <Row className="mb-3">
                        <Col md={8}>
                            <Row className="justify-content-between mb-3">
                                <Col md={8}>
                                    <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2 mb-3">
                                        <span className="text-muted small mb-2">Address</span>
                                        <span className="text-dark">...</span>
                                    </h6>
                                </Col>
                                <Col md={4}>
                                    <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2 mb-3">
                                        <span className="text-muted small mb-2">Zip Code</span>
                                        <span className="text-dark">...</span>
                                    </h6>
                                </Col>
                                <Col md={8}>
                                    <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2 mb-3">
                                        <span className="text-muted small mb-2">City</span>
                                        <span className="text-dark">...</span>
                                    </h6>
                                </Col>
                                <Col md={4}>
                                    <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2 mb-3">
                                        <span className="text-muted small mb-2">Country</span>
                                        <span className="text-dark">...</span>
                                    </h6>
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
                                            <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2 mb-3">
                                                <span className="text-muted small mb-2">Registration Date</span>
                                                <span className="text-dark">...</span>
                                            </h6>
                                        </Col>
                                        <Col md={4}>
                                            <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2 mb-3">
                                                <span className="text-muted small mb-2">Status</span>
                                                <span className="text-dark">...</span>
                                            </h6>
                                        </Col>
                                        <Col md={8}>
                                            <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2 mb-3">
                                                <span className="text-muted small mb-2">Plan</span>
                                                <span className="text-dark">...</span>
                                            </h6>
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
                </Container>
            </section>
        </Fragment>
    );
};

export default Profile;
// export default Profile