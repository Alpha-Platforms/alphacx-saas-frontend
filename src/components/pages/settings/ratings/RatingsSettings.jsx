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
// 
import StarRatings from 'react-star-ratings';
// 
import "../settings.css";
// 
import Feedback from "./Feedback";


export default function RatingsSettings() {
    const [activePage, setActivePage] = useState("ratingsForm");
    const [rating, setRating] = useState(0);
    const [npsScore, setNpsScore] = useState(null);
    const [processing, setProcessing] = useState(false);

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
                <a href="#ratings-form" className={activePage === "ratingsForm" ? "acx-active-tab" : ""} 
                    onClick={() => setActivePage("ratingsForm")}>
                    {" "}
                    Ratings Form
                </a>
                <a href="#ratings-form" onClick={() => setActivePage("feedback")}
                    className={activePage === "feedback" ? "acx-active-tab" : ""}>
                    Feedback
                </a>
            </div>
            <div className="">
                {activePage === "ratingsForm" ? (
                    <div className="mt-3 mb-5">
                        <Row className="justify-content-center">
                            <Col sm={10} md={8} lg={6}>
                                <div className="text-end">
                                    <Button className="acx-btn-primary px-3">
                                       <i className="bi-eye"></i> Preview
                                    </Button>
                                </div>
                                <Form className="mt-3">
                                    <Form.Group className="mb-3 form-group acx-form-group p-3 rounded-4 acx-bg-alpha-blue-50 border" controlId="firstMessage">
                                        <Form.Label>Header Message</Form.Label>
                                        <Form.Control type="text" defaultValue="Are you satisfied with our customer support service? Click on the stars below to rate us." 
                                            placeholder="Enter header message" />
                                        <Form.Text className="text-muted"></Form.Text>
                                    </Form.Group>
                                    <div className="p-3 bg-light border rounded mb-3">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <StarRatings
                                                rating={rating}
                                                starEmptyColor="#e2e2e2"
                                                starRatedColor="#DFB300"
                                                starHoverColor="#DFB300"
                                                starSpacing="4px"
                                                starDimension="40px"
                                                changeRating={(newRating) => { setRating(newRating) }}
                                                numberOfStars={5}
                                                name='rating'
                                            />
                                        </div>
                                    </div>
                                    <Form.Group className="mb-3 form-group acx-form-group p-3 rounded-4 acx-bg-alpha-blue-50 border" controlId="secondMessage">
                                        <Form.Label>Second Header Message</Form.Label>
                                        <Form.Control type="text" defaultValue="Tell us what can be improved" 
                                            placeholder="Enter header message" />
                                        <Form.Text className="text-muted"></Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-3 form-group acx-form-group" controlId="improveMessage">
                                        <Form.Control as="textarea" placeholder="Tell us how we can improve..." rows={4}>Tell us how we can improve...</Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3 form-group acx-form-group p-3 rounded-4 acx-bg-alpha-blue-50 border" controlId="thirdMessage">
                                        <Form.Label>Third Header Message</Form.Label>
                                        <Form.Control type="text" defaultValue="How likely are you to recommend AlphaCX to a friend or colleague?" 
                                            placeholder="Enter header message" />
                                        <Form.Text className="text-muted"></Form.Text>
                                    </Form.Group>
                                    <div className="mb-5">
                                        <div className="">
                                            <p className="mb-2">How likely are you to recommend AlphaCX to a friend or colleague?</p>
                                        </div>
                                        <div className="p-3 bg-light border acx-hover-border-primary rounded ">
                                            <div className="d-flex justify-content-between align-items-center">
                                                {(() => {
                                                    let rows = [];
                                                    for (let i = 0; i <= 10; i++) {
                                                        rows.push(
                                                            <button type="button" key={i} onClick={() => setNpsScore(i)}
                                                                    className={`mb-0 btn acx-btn-icon acx-hover-border-primary rounded-1 ${(npsScore == i ? "acx-bg-primary": "")}`}>
                                                                <span className={`${(npsScore == i ? "text-white": "")}`}>{i}</span>
                                                            </button>
                                                        );
                                                    }
                                                    return rows;
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 text-center">
                                        <a href="https://techpoint.alphacx.co/feedback" target="_blank" className="acx-link-primary">https://techpoint.alphacx.co/feedback</a>
                                    </div>
                                    <Button type="submit" className="acx-btn-primary px-3"><i className="bi-check2-circle"></i> Save</Button>
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