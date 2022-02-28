import React, { useState, useEffect, useMemo } from 'react';
// import PropTypes from 'prop-types';
import {NotificationManager} from 'react-notifications';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ClipLoader from "react-spinners/ClipLoader";
import { Settings } from "@material-ui/icons";
import {connect} from 'react-redux';
import {Link, useLocation} from "react-router-dom";
import {css} from "@emotion/react";
// 
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
// 
import { httpPostMain, httpGetMain } from "../../../../helpers/httpMethods";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import ThankYou from "../../../../assets/imgF/thank-you.png";
import './style.css';


const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const TwitterSignup = ({
    ...props
}) =>{
    const [hostName] = useState(() => {
        return window.location.hostname.split(".")
    });
    const [domain, setDomain] = useState("")
    const [processing, setProcessing] = useState(false);
    const [twitterAuthSate, setTwitterAuthSate] = useState("login");
    // 
    let query = useQuery();
    const oauth_token = query.get("oauth_token");
    const oauth_verifier = query.get("oauth_verifier");

    useEffect(() => {
        const hostLength = hostName.length;
        if( hostName[hostLength-2] === "alphacx" && hostName[0] !== "app"){
            setDomain("app.alphacx.co") 
        }else if (hostName[hostLength-2] === "qustomar" &&  hostLength === 3 ) {
            setDomain("qustomar.com")
        } else if (hostName[hostLength-1] === "localhost" &&  hostLength !== 1 ) {
            setDomain("localhost:3000") 
        }else{
            setDomain("76f7-197-210-70-82.ngrok.io")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // 
    useEffect(() => {
        
        if (oauth_token && oauth_verifier) {
            // /settings/twitter/oauth/request_token

            const data = {
                "oauth_token": oauth_token,
                "oauth_verifier": oauth_verifier
            };
            twitterSigninCallback(data);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [oauth_token, oauth_verifier])
    // 
    const twitterSigninCallback = async(data) => {
        setTwitterAuthSate("processing")
        // console.log("yes");
        // setProcessing(true);
        const response = await httpPostMain("settings/twitter-signin-callback", data);
        if (response) {
            // console.log(response);
            // setProcessing(false);
            if (response.er) {
                setTwitterAuthSate("failed")
                return NotificationManager.error(response.er.message);
            }else{
                setTwitterAuthSate("successful")
                return NotificationManager.success("Logged in successfully");
            }  
        }
    }
    // 
    const twitterLogin = async() => {
        setProcessing(true);
        // /settings/twitter/oauth/request_token
        const data = {
            "call_back": `https://${domain}/twitter-auth`,
        };
        const response = await httpPostMain("settings/twitter/oauth/request_token", data);
        if (response) {
            setProcessing(false);
            if (response.er) {
                return NotificationManager.error("There was an error processing your request");
            }else{
                // console.log(response);
                window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${response?.data?.oauth_token}`;
                // NotificationManager.success("Page successfully connected");
            }
        }
    }

    return (
        <section className="">
            <div className="card card-body bg-white border-0 p-0 mb-4">
                <header id="mainContentHeader" className="breadcrumb">
                    <h6 className="text-muted f-14">
                        <Link to="/settings">
                            <span className="text-custom">Settings</span>
                        </Link>{" "}
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                        <Link to="/settings/integrations">
                            <span className="text-custom">Integrations</span>
                        </Link>{" "}
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                        <span>Twitter</span>
                    </h6>
                </header>
            </div>
            <div className="">
                <Row className="justify-content-center">
                    <Col sm={8} md={6} lg={4}>
                        {twitterAuthSate === "login"? 
                            <div className="py-5 text-center">
                                <Button variant="primary" size="lg" disabled={processing}
                                    className="" onClick={twitterLogin}>
                                    { processing ? 
                                        <span className="text-light d-flex justify-content-center align-items-center">
                                            <Spinner as="span" size="sm"
                                                animation="border" variant="light"
                                                aria-hidden="true"  role="status" /> 
                                            <span className="ms-1"> Loading...</span>
                                        </span>
                                        :
                                        <span className="">
                                            <i className="bi-twitter"></i> Login with twitter
                                        </span>
                                    }
                                </Button>
                            </div>
                        :
                        twitterAuthSate === "processing"? 
                            <div className="py-5 text-center">
                                <div className="text-center">
                                    <Spinner size="lg"
                                            animation="border" variant="secondary"
                                            aria-hidden="true"  role="status" />
                                </div>
                                <h3 className="">Processing</h3>
                            </div>
                        :
                        twitterAuthSate === "successful"?
                            <div className="">
                                <div className="d-flex justify-content-center my-5">
                                    <img src={ThankYou } alt="" />
                                </div>
                                <div className="Auth-header mb-2">
                                    <h3 className="mb-3">Congratulations!</h3>
                                    <p className="text-center">
                                        Twitter account added created successfully.
                                    </p>
                                </div>
                    
                                <div className="submit-auth-btn text-center mt-4">
                                    <a className="fs-6" href="https://app.alphacx.co/knowledge-base">
                                        view configurations
                                    </a>
                                </div>
                            </div>
                        :
                            <div className="py-5 text-center">
                                <p className="mb-3">Please click to repeat</p>
                                <Button as={Link} to="/settings/integrations/twitter" className="" variant="warning" size="lg"
                                    onClick={()=> setTwitterAuthSate("login")}>
                                    <i className=""></i> Repeat twitter login
                                </Button>
                            </div>
                        }
                    </Col>
                </Row>
            </div>
        </section>
    )
}

// index.propTypes = {}

export default TwitterSignup
