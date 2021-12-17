// @ts-nocheck
import {useState, Fragment, useEffect, useContext} from 'react';
// bootstrap components
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
// 
import SearchList from './SearchList.jsx';
// 
import { httpGetMain, httpPostMain, httpPatchMain } from "../../../helpers/httpMethods";
// 
import "./search.css";
import DummyAvatar from '../../../assets/images/dummyavatar.jpeg';
import TicketIdIcon from "../../../assets/icons/ticketid.svg";


const Search = () => {
    
    const [searchListVisible, setSearchListVisible] = useState(false)

    useEffect(() => {
    }, [])

    
    return (
        <Container>
            <section className="pt-3">
                <Form className="navbar-search-form w-100">
                    <Form.Group className="acx-form-group">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2 search-input shadow-none rounded-3 bg-light"
                            aria-label="Search"
                        />
                    </Form.Group>
                </Form>
            </section>
            <section className="pt-3">
                <div className="">
                    <h6 className="text-dark">Recent Searches</h6>
                    <div className="border-bottom pb-2">
                        <Row>
                            <Col sm={6} lg={3} className="">
                                <div className="d-flex justify-content-start align-items-center">
                                    <div className="me-3 flex-shrink-0 avatar avatar-md rounded-circle overflow-hidden d-flex justify-content-center align-items-center acx-bg-affair-800">
                                        {/* <h3 className="text-white">
                                            <span>AB</span>
                                        </h3> */}
                                        <img width="40" height="auto" src={DummyAvatar} alt="" />
                                    </div>
                                    <div className="media-body flex-grow-1">
                                        <p className="mb-0 text-truncate text-dark" title="Yes">Mr. Jonson Obi</p>
                                        <span className="text-muted small">What ever this is</span>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={6} lg={3} className="">
                                <div className="d-flex justify-content-start align-items-center">
                                    <div className="me-3 flex-shrink-0 avatar avatar-md rounded-circle overflow-hidden d-flex justify-content-center align-items-center acx-bg-alpha-blue-100">
                                        <span className="">
                                            <img src={TicketIdIcon} alt="" className="pe-none" width="auto" height="50"/>
                                        </span> 
                                    </div>
                                    <div className="media-body flex-grow-1">
                                        <p className="mb-0 text-truncate text-dark" title="Yes">#1002345</p>
                                        <span className="text-muted small">Techpoint Nigeria</span>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={6} lg={3} className="">
                                <div className="d-flex justify-content-start align-items-center">
                                    <div className="me-3 flex-shrink-0 avatar avatar-md rounded-circle overflow-hidden d-flex justify-content-center align-items-center acx-bg-alpha-blue-100">
                                        <span className="">
                                            <img src={TicketIdIcon} alt="" className="pe-none" width="auto" height="50"/>
                                        </span> 
                                    </div>
                                    <div className="media-body flex-grow-1">
                                        <p className="mb-0 text-truncate text-dark" title="Yes">15th December</p>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={6} lg={3} className="">
                                <div className="d-flex justify-content-start align-items-center">
                                    <div className="me-3 flex-shrink-0 avatar avatar-md rounded-circle overflow-hidden d-flex justify-content-center align-items-center acx-bg-affair-800">
                                        {/* <h3 className="text-white">
                                            <span>AB</span>
                                        </h3> */}
                                        <img width="40" height="auto" src={DummyAvatar} alt="" />
                                    </div>
                                    <div className="media-body flex-grow-1">
                                        <p className="mb-0 text-truncate text-dark" title="Yes">Mr. Jonson Obi</p>
                                        <span className="text-muted small">What ever this is</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>
             <section className="pt-3">
                <div className="">
                    <SearchList />
                </div>
            </section>
        </Container>
    )
}

export default Search;