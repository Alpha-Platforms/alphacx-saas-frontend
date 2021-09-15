import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { hideLoader, showLoader } from "../../../helpers/loader";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
// 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';
// 
import StarRatings from 'react-star-ratings';
// 
import "../settings.css";
// 
import Feedback from "./Feedback";


export default function RatingsForm() {
    const [activePage, setActivePage] = useState("ratingsForm");
    const [rating, setRating] = useState(0);

    return(
        <section className="ratings-page">
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
                                                starRatedColor="#006298"
                                                changeRating={setRating}
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
                                    <div className="p-3 bg-light border rounded mb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            {(() => {
                                                let rows = [];
                                                for (let i = 0; i <= 10; i++) {
                                                    rows.push(<p key={i} className="mb-0">{i}</p>);
                                                }
                                                return rows;
                                            })()}
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
        </section>
    );
}