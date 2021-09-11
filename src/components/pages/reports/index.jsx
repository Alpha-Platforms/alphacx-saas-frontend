import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import { HelpDesk, Chart, Heart } from "../../../assets/images/svgs";

export default function Reports(){
    
    return (
        <article className="social-integration-page">
            {/* <nav id="mainContentHeader" className="breadcrumb">
                <h6 className="text-muted f-14">
                    <Link to="/reports">
                        <span className="text-custom">Reports</span>
                    </Link>
                </h6>
            </nav> */}
            <section className="">
                <Container fluid>
                    <Row>
                        <Col sm={6} md={4}>
                            <Card className="h-100 bg-light">
                                <Card.Body className="p-5">
                                    <div className="">
                                        <h4 className="text-center mb-3 w-100">
                                            {<HelpDesk/>}
                                        </h4>
                                        <Card.Subtitle as="h6" className="mb-2 text-center text-dark">Helpdesk </Card.Subtitle>
                                        <Card.Text className="text-danger text-center">
                                            Coming Soon
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={6} md={4}>
                            <Card className="h-100 bg-light">
                                <Card.Body className="p-5">
                                    <div className="">
                                        <h4 className="text-center mb-3 w-100">
                                            {<Chart/>}
                                        </h4>
                                        <Card.Subtitle as="h6" className="mb-2 text-center text-dark">Agent Performance </Card.Subtitle>
                                        <Card.Text className="text-danger text-center">
                                            Coming Soon
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={6} md={4}>
                            <Card className="h-100 bg-light">
                                <Card.Body className="p-5">
                                    <div className="">
                                        <h4 className="text-center mb-3 w-100">
                                            {<Heart/>}
                                        </h4>
                                        <Card.Subtitle as="h6" className="mb-2 text-center text-dark">Customer Satisfaction </Card.Subtitle>
                                        <Card.Text className="text-danger text-center">
                                            Coming Soon
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </article>
    );
}
