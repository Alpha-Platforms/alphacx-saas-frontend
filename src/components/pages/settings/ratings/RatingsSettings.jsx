/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { css } from '@emotion/css';
import StarRatings from 'react-star-ratings';
//
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
// assets
import { hideLoader, showLoader } from '../../../helpers/loader';
import RightArrow from '../../../../assets/imgF/arrow_right.png';
//
import { httpPatchMain, httpGetMain } from '../../../../helpers/httpMethods';
import '../settings.css';
import { brandKit } from './../../../../helper';
//

export default function RatingsSettings() {
    const [isChanged, setIsChanged] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [ratingsData, setRatingsData] = useState({
        npsLabel: '',
        ratingLabel: '',
        commentLabel: '',
    });

    useEffect(() => {
        getRatingsConfig();
    }, []);

    useEffect(() => {
        if (window.localStorage.getItem('ratingLabel') && window.localStorage.getItem('commentLabel')) {
            setIsChanged(true);
        } else {
            setIsChanged(false);
        }
    }, [ratingsData])
    

    const getRatingsConfig = async () => {
        const res = await httpGetMain(`settings/config?type=rating`);
        if (res.status === 'success') {
            setRatingsData({
                // ...ratingsData,
                ...res?.data,
            });
        } else {
        }
    };

    const handleRatingsChange = (e) => {
        setRatingsData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        window.localStorage.setItem(e.target.name, e.target.value )
    }

    const handleSubmit = async () => {
        setProcessing(true);
        const data = {
            rating_config: { ...ratingsData },
        };
        const res = await httpPatchMain(`settings/rating-config`, data);
        if (res.status === 'success') {
            setProcessing(false);
            return NotificationManager.success('Labels updated successfully', 'Success', 4000);
        }
        setProcessing(false);
        return NotificationManager.error(res.er.message, 'Error', 4000);
    };

    return (
        <>
        <section className="ratings-page">
            <header id="mainContentHeader" className="breadcrumb">
                <h6 className="text-muted f-14">
                    <Link to="/settings">
                        <span className="text-custom">Settings</span>
                    </Link>{' '}
                    <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                    <span>Ratings</span>
                </h6>
            </header>
            
            <div className="">
                    <div className="mt-3 mb-5">
                        <Row className="justify-content-center">
                            <Col sm={10} md={8} lg={6}>
                                <Form className="mt-3" onSubmit={(e) => e.preventDefault()}>
                                    <Form.Group
                                        controlId="firstMessage"
                                    >
                                        <Form.Label>Rating Label</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="ratingLabel"
                                            defaultValue={ratingsData.ratingLabel}
                                            onChange={handleRatingsChange}
                                            placeholder="Kindly rate us"
                                        />
                                        <Form.Text className="text-muted" />
                                    </Form.Group>
                                    <div className="py-1 bg-light border mb-3">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <StarRatings
                                                rating={0}
                                                starEmptyColor="#e2e2e2"
                                                starRatedColor="#DFB300"
                                                starHoverColor="#DFB300"
                                                starSpacing="4px"
                                                starDimension="40px"
                                                numberOfStars={5}
                                                name="rating"
                                            />
                                        </div>
                                    </div>
                                    <Form.Group
                                        controlId="secondMessage"
                                    >
                                        <Form.Label>Comment Label</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="commentLabel"
                                            defaultValue={ratingsData.commentLabel}
                                            onChange={handleRatingsChange}
                                            placeholder="Kindly, tell us what we can improved upon"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="improveMessage">
                                        <Form.Control
                                            disabled
                                            className="overflow-hidden"
                                            draggable={false}
                                            style={{ resize: 'none' }}
                                            as="textarea"
                                            placeholder={ratingsData.commentLabel}
                                            rows={4}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        controlId="thirdMessage"
                                    >
                                        <Form.Label>Recommend Label (NPS)</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="npsLabel"
                                            defaultValue={ratingsData.npsLabel}
                                            onChange={handleRatingsChange}
                                            placeholder="How likely are you to recommend us"
                                        />
                                    </Form.Group>
                                    <div className="mb-5">
                                        <div className="p-3 bg-light border">
                                            <div className="d-flex justify-content-between align-items-center">
                                                {(() => {
                                                    const rows = [];
                                                    for (let i = 0; i <= 10; i++) {
                                                        rows.push(
                                                            <button
                                                                type="button"
                                                                disabled
                                                                key={i}
                                                                className="mb-0 btn acx-btn-icon acx-hover-border-primary rounded-1"
                                                            >
                                                                <span>{i}</span>
                                                            </button>,
                                                        );
                                                    }
                                                    return rows;
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="text-center">


                                    {isChanged &&
                                        <Link to="/feedback?preview=true" className="btn border me-2" target="_blank">Preview</Link>
                                    }
                                        <Button
                                            type="submit"
                                            onClick={handleSubmit}
                                            disabled={processing || !isChanged}
                                            className={`btn px-4 ${css({
                                                ...brandKit({ bgCol: 0 }),
                                                color: 'white',
                                                '&:hover, &:disabled': { ...brandKit({ bgCol: 30 }), color: 'white' },
                                            })}`}
                                        >
                                            {processing ? (
                                                <span className="text-light">
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        variant="light"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />{' '}
                                                    Loading...
                                                </span>
                                            ) : (
                                                'Save'
                                            )}
                                        </Button>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                    
            </div>
        </section>
    </>
    );
}