import { hideLoader, showLoader } from 'components/helpers/loader';
import { httpPatchMain } from 'helpers/httpMethods';
import React, {useState, useEffect} from 'react'
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import "../settings.css";
// img assets
import facebookImg from "../../../../assets/imgF/Facebook.png";
import RightArrow from "../../../../assets/imgF/arrow_right.png";

const FB = window.FB

const FBIntegration = ({location}) => {

    const [FBData, setFBData] = useState({});
    const [pageConnected, setPageConnected] = useState(false);
    const [domain, setDomain] = useState("")
    const [baseUrl, setBaseUrl] = useState("")
    // const [domain, setDomain] = useState("")



    // const params = `domain=${window.localStorage.getItem('domain')}&id=${window.localStorage.getItem('token')}&uid=${window.localStorage.getItem('refreshToken')}`
    



    useEffect(() => {
        const params = new URLSearchParams(location.search)      


        const protocol = window.location.protocol
        const hostname = window.location.hostname.split(".").slice(1).join(".")
        const port = window.location.port

        const domain = params.get('domain');
        const token = params.get('id');
        const uid = params.get('uid');

        const baseUrl = `${protocol}//${domain}.${hostname}:${port}`
        setBaseUrl(baseUrl)

        setDomain(domain)

        localStorage.setItem('domain', domain)
        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', uid)


        // run facebook login script
        FB.init({
            appId: "244578957291734",
            autoLogAppEvents: true,
            xfbml: true,
            version: "v11.0",
        });

      
    }, [])


    const handleConnectFBPage = async (response) => {
        if (!response) return;
        showLoader();
        const data = {
            facebook_config: {
                page_token: `${response?.accessToken}`,
                access_token: `${response?.accessToken}`,
                id: `${response?.userID}`,
                connected: true,
            },
        };
        // checking data
        console.log("Data before request:", data)
        const res = await httpPatchMain ("settings/facebook-config", data);
        console.log("Response from request:", res)
        if (res) {
            hideLoader();
            if (res.er) {
                hideLoader();
                return NotificationManager.error(res.er);
            }
            localStorage.setItem("pageConnected", "true");
            NotificationManager.success("Page successfully connected");
        }
    // hideLoader();
    };



    const authFb = () => {
        FB.login(function (response) {
            if (response.authResponse && response.authResponse !== "undefined." && response.authResponse !== undefined) {
                setFBData(response?.authResponse);
                handleConnectFBPage(response?.authResponse);
                setPageConnected(true);
                FB.api("/me", function (response) {
                    // console.log("FB.api response:", response)
                });
            } else {
                console.log("Request cancelled or unauthorized.");
            }
            },
            {
            scope:
                "pages_messaging,pages_manage_metadata,pages_read_engagement,pages_show_list",
            }
        );
    };


    return (
        <div className="social-integrating-page">
        <header id="mainContentHeader" className="breadcrumb">
            <h6 className="text-muted f-14">
                <a href={`${baseUrl}/settings`}>
                    <span className="text-custom">Settings</span>
                </a>{" "}
                <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                <a href={`${baseUrl}/settings/integrations`}>
                    <span className="text-custom">Integrations</span>
                </a>{" "}
                <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                <span>Facebook</span>
            </h6>
        </header>
        <div className="">
            <h5 className="">Facebook</h5>
            <section>
                <div className="connectViaWhatsWrap">
                    <div className="connectViaWhatsappInstr">
                        <img src={facebookImg} alt="" />
                        <div className="connectViaInstText">
                            <p>Communicate with Facebook users via AlphaCX</p>
                            <p>
                                Connect your company’s Facebook page to Conversational Inbox and
                                start chatting with Facebook users.
                                <br /> Incoming message allocation is based ticket distribution
                                rules. Chats can be converted to tickets.
                            </p>
                        </div>
                    </div>

                    <p className="mt-3">
                        You need to create your company Facebook page or use an existing
                        one.
                        <br /> You need to be the Administrator of that page.
                    </p>

                    <div className="">
                        <button className="btn acx-btn-primary px-3 py-2" onClick={authFb} disabled={pageConnected}>
                            {pageConnected ? "Page Connected" : "Connect Page"}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </div>
    )
}

export default FBIntegration