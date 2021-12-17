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
import { httpGetMain, httpPostMain, httpPatchMain } from "../../../helpers/httpMethods";
// 
import "./search.css";
import DummyAvatar from '../../../assets/images/dummyavatar.jpeg';
import TicketIdIcon from "../../../assets/icons/ticketid.svg";


const SearchList = () => {
    
    const [searchListVisible, setSearchListVisible] = useState(false)

    useEffect(() => {
    }, [])

    
    return (
        <ListGroup variant="flush">
            <ListGroup.Item action className="border-bottom px-0">
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
            <ListGroup.Item action className="border-bottom px-0">
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
            <ListGroup.Item action className="border-bottom px-0">
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
            <ListGroup.Item action className="border-bottom px-0">
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
            <ListGroup.Item action className="border-bottom px-0">
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
            <ListGroup.Item action className=" px-0">
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
    )
}

export default SearchList;