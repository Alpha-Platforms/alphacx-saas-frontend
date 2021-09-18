import {useState, Fragment, useEffect} from 'react';
// react bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// 
import {getUserInitials} from '../../../../helper';


const Profile = (currentCustomer) => {
    // const [customerDetails, setCustomerDetails] = useState();
    // const [isCustomerLoaded, setIsCustomerLoaded] = useState(false);

    //  useEffect(() => {
    // }, [])

    return (
        <Fragment>
            <section className="">
                <Container fluid className="">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h6 className="text-muted">CONTACT INFORMATION</h6>
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
                                        <span className="text-dark">Mr.</span>
                                    </h6>
                                </Col>
                                <Col>
                                    <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2">
                                        <span className="text-muted small mb-2">Gender</span>
                                        <span className="text-dark">Male</span>
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
                                {currentCustomer?.avatar ? <div className="customer-avatar rounded-3">
                                                            <img src={currentCustomer.avatar} alt='' />
                                                        </div> 
                                                        : <div className="user-initials blue me-auto ms-auto d-flex justify-content-center align-items-center">
                                                            {getUserInitials(`${currentCustomer.firstname} ${currentCustomer.lastname == "default" ? "" : currentCustomer.lastname}`)}
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
                    <h6 className="text-muted mb-4">ADDRESS</h6>
                    <Row className="mb-3">
                        <Col md={8}>
                            <Row className="justify-content-between mb-3">
                                <Col md={8}>
                                    <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2 mb-3">
                                        <span className="text-muted small mb-2">Address</span>
                                        <span className="text-dark">14 Ozumba Mbadiwe Crescent, VI</span>
                                    </h6>
                                </Col>
                                <Col md={4}>
                                    <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2 mb-3">
                                        <span className="text-muted small mb-2">Zip Code</span>
                                        <span className="text-dark">60433</span>
                                    </h6>
                                </Col>
                                <Col md={8}>
                                    <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2 mb-3">
                                        <span className="text-muted small mb-2">City</span>
                                        <span className="text-dark">Lagos</span>
                                    </h6>
                                </Col>
                                <Col md={4}>
                                    <h6 className="d-inline-flex flex-column flex-grow-0 border-bottom pb-2 mb-3">
                                        <span className="text-muted small mb-2">Country</span>
                                        <span className="text-dark">Nigeria</span>
                                    </h6>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    );
};

export default Profile;
// export default Profile