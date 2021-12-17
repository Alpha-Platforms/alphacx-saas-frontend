// @ts-nocheck
import {useState, Fragment, useEffect, useContext} from 'react';
// 
import { Link } from 'react-router-dom';
// bootstrap components
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
// 
import { httpGetMain, httpPostMain, httpPatchMain } from "../../../helpers/httpMethods";
// 
import "./search.css";
import DummyAvatar from '../../../assets/images/dummyavatar.jpeg';


const NavbarSearch = () => {
    
  const [searchListVisible, setSearchListVisible] = useState(false)

    // useEffect(() => {
    // }, [])

    
    return (
        <Form className="mx-3 navbar-search-form d-flex justify-content-end align-items-center flex-grow-1">
            <Form.Group className="acx-form-group resizable">
                <Form.Control
                    size="sm"
                    type="search"
                    placeholder="Search"
                    className="me-2 search-input shadow-none rounded-3 bg-light"
                    aria-label="Search"
                />
                <div className="navbar-search-dropdown bg-white">
                    <nav className="border border-light shadow-sm position-sticky bg-white">
                        <div className="d-flex justify-content-between align-items-center border-bottom py-2 px-3">
                            <div className="flex-grow-1">
                                <p className="acx-text-gray-800 mb-0">
                                    Search results
                                </p>
                            </div>
                            <div className="">
                                <Link to="/search" className="acx-link-primary text-muted" title="advanced search">
                                    <i className="bi bi-sliders"></i>
                                </Link>
                            </div>
                        </div>
                    </nav>
                    <section className="border-end border-start border-bottom border-light bg-white shadow">
                        <ListGroup variant="flush">
                            <ListGroup.Item action className="border-bottom">
                                <div className="d-flex justify-content-start align-items-start">
                                    <div className="me-3 flex-shrink-0 avatar avatar-md rounded-circle overflow-hidden d-flex justify-content-center align-items-center acx-bg-affair-800">
                                        {/* <h3 className="text-white">
                                            <span>AB</span>
                                        </h3> */}
                                        <img width="40" height="auto" src={DummyAvatar} alt="" />
                                    </div>
                                    <div className="media-body flex-grow-1">
                                        <div className="media-header d-flex justify-content-between align-items-center mb-1">
                                            <div className="">
                                                <p className="mb-0 me-2 text-truncate text-dark" title="Yes" style={{"maxWidth": "130px"}}>Mr. Jonson Obi</p>
                                                <span className="text-muted small">What ever this is</span>
                                            </div>
                                            <span className="">
                                                <Button size="sm" className="acx-btn-icon rounded-circle fs-5" tile="Close suggestions">
                                                    <i className="bi-x"></i>
                                                </Button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item action className="border-bottom">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-0">
                                        User ID 2334234-34 Adewole Johnson
                                    </p>
                                    <span className="">
                                        <Button size="sm" className="acx-btn-icon rounded-circle fs-5" tile="Close suggestions">
                                            <i className="bi-x"></i>
                                        </Button>
                                    </span>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item action className="">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-0">
                                        <span className="text-primary">@Mobi</span> dick Morbi leo
                                        <span className="fw-bold"> Frem on </span> eter free
                                    </p>
                                    <span className="">
                                        <Button size="sm" className="acx-btn-icon rounded-circle fs-5" tile="Close suggestions">
                                            <i className="bi-x"></i>
                                        </Button>
                                    </span>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </section>
                </div>
            </Form.Group>
        </Form>
    )
}

export default NavbarSearch;