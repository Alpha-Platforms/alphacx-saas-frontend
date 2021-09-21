import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import { HelpDesk, Chart, Heart } from "../../../assets/images/svgs";

export default function Reports(){
    
    return (

        <Container fluid>
            <Row className="g-3">
                <Col sm={6} md={4} className="settings-menu-item">
                <div className="border rounded bg-light">
                    <Link
                    to="/settings/users"
                    className="d-block cursor text-decoration-none"
                    >
                    <div className="d-flex p-md-4">
                        <div className="">
                            {<HelpDesk/>}
                        </div>
                        <div className="ms-3">
                        <h6 className="text-dark mb-0">Helpdesk</h6>
                        <p className="acx-fs-8 mb-0 lh-base mt-1 text-muted">
                            Coming Soon
                        </p>
                        </div>
                    </div>
                    </Link>
                </div>
                </Col>

                <Col sm={6} md={4} className="settings-menu-item">
                <div className="border rounded bg-light">
                    <Link
                    to="/settings/users"
                    className="d-block cursor text-decoration-none"
                    >
                    <div className="d-flex p-md-4">
                        <div className="">
                            {<Chart/>}
                        </div>
                        <div className="ms-3">
                        <h6 className="text-dark mb-0">Agent Performance</h6>
                        <p className="acx-fs-8 mb-0 lh-base mt-1 text-muted">
                            Coming Soon
                        </p>
                        </div>
                    </div>
                    </Link>
                </div>
                </Col>

                <Col sm={6} md={4} className="settings-menu-item">
                <div className="border rounded bg-light">
                    <Link
                    to="/settings/users"
                    className="d-block cursor text-decoration-none"
                    >
                    <div className="d-flex p-md-4">
                        <div className="">
                            {<Heart/>}
                        </div>
                        <div className="ms-3">
                        <h6 className="text-dark mb-0">Customer Satisfaction</h6>
                        <p className="acx-fs-8 mb-0 lh-base mt-1 text-muted">
                            Coming Soon
                        </p>
                        </div>
                    </div>
                    </Link>
                </div>
                </Col>
            </Row>
        </Container>

    );
}