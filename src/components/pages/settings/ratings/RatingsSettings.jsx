import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { hideLoader, showLoader } from "../../../helpers/loader";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import Logo from "../../../../assets/svgicons/Logo.svg";
// 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';
import Image  from 'react-bootstrap/Image';
import Spinner  from 'react-bootstrap/Spinner';
// 
import StarRatings from 'react-star-ratings';
// 

import { httpPatchMain, httpGetMain } from "../../../../helpers/httpMethods";
import "../settings.css";
// 
import Feedback from "./Feedback";
// 
let tenantDomain = localStorage.getItem("domain");

export default function RatingsSettings() {
    const [activePage, setActivePage] = useState("ratingsForm");
    const [processing, setProcessing] = useState(false);
    // form field
    const [ratingsData, setRatingsData] = useState({
        "npsLabel": "",
        "ratingLabel": "",
        "commentLabel": ""
    });
    useEffect(() => {
        getRatingsConfig();
    },[]);

    const getRatingsConfig = async () => {
        const res = await httpGetMain(`settings/config?type=rating`);
            if (res.status === "success") {
            setRatingsData({
                ...ratingsData,
                ...res?.data
            });
        } else {
            return NotificationManager.error(res.er.message, "Error", 4000);
        }
    };
    const handleSubmit = (e) => {
        setProcessing(true);
        for (var key in ratingsData) {
            if(ratingsData[key] === "" || ratingsData[key] === null ||  ratingsData[key] === undefined) {
                setProcessing(false);
                return NotificationManager.error(`${key.replace("Label","")} label cannot be empty`, "Error", 4000);
            }
        }
        submitData();
    };

    const submitData = async () => {
        const data = {
            "rating_config": {...ratingsData}
        }
        const res = await httpPatchMain(`settings/rating-config`, data);
            if (res.status === "success") {
            setProcessing(false);
            return NotificationManager.success( "Labels updated successfully", "Success", 4000);
        } else {
            setProcessing(false);
            return NotificationManager.error(res.er.message, "Error", 4000);
        }
    }

    return(
        <section className="ratings-page min-vh-100">
            <header id="mainContentHeader" className="breadcrumb">
                <h6 className="text-muted f-14">
                    <Link to="/settings">
                        <span className="text-custom">Settings</span>
                    </Link>{" "}
                    <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                    <span>Ratings Form</span>
                </h6>
            </header>
            <div className="acx-tab">
                <a href="#ratings-form" className={`acx-fs-14 ${activePage === "ratingsForm" ? "acx-active-tab" : ""}`}
                    onClick={() => setActivePage("ratingsForm")}>
                    {" "}
                    Ratings Form
                </a>
                <a href="#ratings-form" onClick={() => setActivePage("feedback")}
                    className={`acx-fs-14 ${activePage === "feedback" ? "acx-active-tab" : ""}`}>
                    Feedback
                </a>
            </div>
            <div className="">
                {activePage === "ratingsForm" ? (
                    <div className="mt-3 mb-5">
                        <Row className="justify-content-center">
                            <Col sm={10} md={8} lg={6}>
                                <Form className="mt-3" onSubmit={e => e.preventDefault()}>
                                    <Form.Group className="mb-3 form-group acx-form-group p-3 rounded-4 acx-bg-alpha-blue-50 border" controlId="firstMessage">
                                        <Form.Label>Rating label goes here...</Form.Label>
                                        <Form.Control required type="text" defaultValue={ratingsData.ratingLabel}
                                                      onChange={(e) => setRatingsData({...ratingsData, "ratingLabel": e.target.value})} 
                                                      placeholder="Enter ratings label" />
                                        <Form.Text className="text-muted"></Form.Text>
                                    </Form.Group>
                                    <div className="p-3 bg-light border rounded mb-3">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <StarRatings
                                                rating={0}
                                                starEmptyColor="#e2e2e2"
                                                starRatedColor="#DFB300"
                                                starHoverColor="#DFB300"
                                                starSpacing="4px"
                                                starDimension="40px"
                                                numberOfStars={5}
                                                name='rating'
                                            />
                                        </div>
                                    </div>
                                    <Form.Group className="mb-3 form-group acx-form-group p-3 rounded-4 acx-bg-alpha-blue-50 border" controlId="secondMessage">
                                        <Form.Label>Comment label goes here...</Form.Label>
                                        <Form.Control required type="text" defaultValue={ratingsData.commentLabel} 
                                                      onChange={(e) => setRatingsData({...ratingsData, "commentLabel": e.target.value})} 
                                                      placeholder="Enter comment label" />
                                    </Form.Group>
                                    <Form.Group className="mb-3 form-group acx-form-group" controlId="improveMessage">
                                        <Form.Control disabled={true} draggable={false} style={{ "resize": "none"}} className="overflow-hidden" as="textarea" placeholder="Tell us how we can improve..." rows={4}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3 form-group acx-form-group p-3 rounded-4 acx-bg-alpha-blue-50 border" controlId="thirdMessage">
                                        <Form.Label>NPS label goes here...</Form.Label>
                                        <Form.Control required type="text" defaultValue={ratingsData.npsLabel} 
                                                      onChange={(e) => setRatingsData({...ratingsData, "npsLabel": e.target.value})}  
                                                      placeholder="Enter NPS label" />
                                    </Form.Group>
                                    <div className="mb-5">
                                        <div className="p-3 bg-light border acx-hover-border-primary rounded ">
                                            <div className="d-flex justify-content-between align-items-center">
                                                {(() => {
                                                    let rows = [];
                                                    for (let i = 0; i <= 10; i++) {
                                                        rows.push(
                                                            <button type="button" disabled={true} key={i}
                                                                    className={`mb-0 btn acx-btn-icon acx-hover-border-primary rounded-1`}>
                                                                <span>{i}</span>
                                                            </button>
                                                        );
                                                    }
                                                    return rows;
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 text-center">
                                        <a href={`https://${tenantDomain}.alphacx.co/feedback`} target="_blank" className="acx-link-primary">https://{tenantDomain}.alphacx.co/feedback</a>
                                    </div>
                                    <div className="text-center">
                                        <Button type="submit" onClick={handleSubmit} size="lg" disabled={processing} size="lg" className="px-4 acx-btn-primary"> 
                                            {(processing) ? <span className="text-light"><Spinner as="span" 
                                                    animation="border" variant="light" size="sm" role="status" 
                                                    aria-hidden="true"/> Loading...
                                                </span>
                                                : <span className="text-white"> Submit </span>
                                            }
                                        </Button>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                ) : ("")}
                {activePage === "feedback" ? (
                    <Feedback/>
                ) : ("")}
            </div>
            <footer className="">
                <p className="text-center">
                    <Image src={Logo} className="me-2" height="16" width="auto" /> We care with AlphaCX
                </p>
            </footer>
        </section>
    );
}