import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import Logo from "../../../assets/svgicons/Logo.svg";

// 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';
import Spinner  from 'react-bootstrap/Spinner';
import Image  from 'react-bootstrap/Image';

// 
import StarRatings from 'react-star-ratings';
import { useLocation } from "react-router-dom";
// 
import { httpPostMain } from "../../../helpers/httpMethods";
import "../settings/settings.css";

export default function RatingsForm() {
    const [rating, setRating] = useState(0);
    const [npsScore, setNpsScore] = useState(null);
    const [comment, setComment] = useState("");
    const [processing, setProcessing] = useState(false);

    // 
    const search = useLocation().search;
    // 
    const handleSubmit = async () =>{
        setProcessing(true);
        const ticketId = new URLSearchParams(search).get("ticket_id");
        if(ticketId == null ){
            setProcessing(false);
            return NotificationManager.error("ticket id is not defined", "Error", 4000);
        }
        if(rating == 0 ){
            setProcessing(false);
            return NotificationManager.error("rating must be 1 or more ", "Error", 4000);
        }
        const data = {
            "value": rating,
            "npsScore": npsScore,
            "ticketId": ticketId,
            "comment": comment
        };
        const res = await httpPostMain(`ratings`, data);
        if (res?.status === "success") {
            setProcessing(false);
            return NotificationManager.success("Thanks for your feedback 😃", "Success");
        } else {
            setProcessing(false);
            console.log(res);
            return NotificationManager.error(res?.er?.message, "Error", 4000);
        }
    }

    return(
        <section className="ratings-page bg-white min-vh-100">
            <Container fluid className="py-5">
                <Row className="justify-content-center">
                    <Col sm={12} md={8} lg={6}>
                        <Form className="mt-3" onSubmit={e => e.preventDefault()}>
                            <div className="text-center mb-4">
                                <h1 className="mb-3">Rate Your Experience</h1>
                                <p className="">Are you satisfied with our customer support service? Click on the stars below to rate us.</p>
                            </div>
                            <div className="p-3 mb-4">
                                <div className="d-flex justify-content-center align-items-center">
                                    <StarRatings
                                        rating={rating}
                                        starRatedColor="#DFB300"
                                        starEmptyColor="#e2e2e2"
                                        starHoverColor="#DFB300"
                                        starSpacing="4px"
                                        starDimension="40px"
                                        changeRating={(newRating) => { setRating(newRating) }}
                                        numberOfStars={5}
                                        name='rating'
                                    />
                                </div>
                            </div>
                            <hr className="mb-5"/>
                            <Form.Group className="mb-5 form-group acx-form-group" controlId="improveMessage">
                                <Form.Label>Tell us what can be improved?</Form.Label>
                                <Form.Control onChange={e => { setComment(e.target.value) }} className="shadow-sm" as="textarea" defaultValue=" " placeholder="Tell us how we can improve..." rows={6}/>
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
                                <Button type="submit" onClick={handleSubmit} size="lg" disabled={processing} variant="secondary" className="px-4"> 
                                    {(processing) ? <span className="text-light"><Spinner as="span" 
                                            animation="border" variant="light" size="sm" role="status" 
                                            aria-hidden="true"/> Loading...
                                        </span>
                                        : <span className="text-white">Submit</span>
                                    }
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
                <footer className="">
                    <p className="text-center">
                        <Image src={Logo} className="me-2" height="16" width="auto" /> We care with AlphaCX
                    </p>
                </footer>
            </Container>
        </section>
    );
}