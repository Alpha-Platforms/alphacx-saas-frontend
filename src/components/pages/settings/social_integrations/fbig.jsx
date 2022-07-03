/* eslint-disable */
import { hideLoader, showLoader } from 'components/helpers/loader';
import { httpPatchMain } from 'helpers/httpMethods';
import React, {useState, useEffect} from 'react'
import { NotificationManager } from 'react-notifications';
import { Link, Redirect, useHistory } from 'react-router-dom';
import "../settings.css";
// img assets
import facebookImg from "../../../../assets/imgF/Facebook.png";
import instagramImg from "../../../../assets/imgF/instagram.png";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import ArrowLeft from "../../../../assets/icons/Arrow---Left.svg";
import { wordCapitalize } from 'helper';


const FB = window.FB

const FBIntegration = ({location}) => {

    const [FBData, setFBData] = useState({});
    const [pageConnected, setPageConnected] = useState(false);
    const [domain, setDomain] = useState("")
    const [baseUrl, setBaseUrl] = useState("")
    // const [domain, setDomain] = useState("")
    const [showRedirectText, setShowRedirectText] = useState(false)
    const history = useHistory()
    const [channel, setChannel] = useState("")

    
    // const params = `domain=${window.localStorage.getItem('domain')}&id=${window.localStorage.getItem('token')}&uid=${window.localStorage.getItem('refreshToken')}`
    

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const protocol = window.location.protocol
        const hostname = window.location.hostname.split(".").slice(1).join(".")
        const port = window.location.port

        setChannel(params.get('channel'));

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

  
    const redirectToPreviewPage = () => {
        setShowRedirectText(true)
        setTimeout(() => {
            window.location.href = `${baseUrl}/settings/integrations`       
        }, 1000);
    }

    const handleConnectFBPage = async (channel, response) => {
        if (!response) return;
        showLoader();
        const config = channel === "facebook"? {key: "facebook_config", route: "facebook-config"} : {key: "instagram_config", route: "instagram-config"}
        const data = {
            [config.key]: {
                page_token: `${response?.accessToken}`,
                access_token: `${response?.accessToken}`,
                id: `${response?.userID}`,
                connected: true,
            },
        };
        // checking data
        console.log("Data before request:", data)
        const res = await httpPatchMain (`settings/${config.route}`, data);
        console.log("Response from request:", res)
        if (res) {
            hideLoader();
            
            if (res.status === 'success') {
                NotificationManager.success("Page successfully connected");
                // Go back
                // redirectToPreviewPage()
            } else {
                return NotificationManager.error(res.er);
            }
        }
    // hideLoader();
    };



    const authFb = () => {
        FB.login(function (response) {
            if (response.authResponse && response.authResponse !== "undefined." && response.authResponse !== undefined) {
                setFBData(response?.authResponse);
                console.log(response.authResponse);
                handleConnectFBPage(channel, response?.authResponse);
                setPageConnected(true);
                FB.api("/me", function (response) {
                    // console.log("FB.api response:", response)
                });
            } else {
                console.log("Request cancelled or unauthorized.");
            }
            },
            {
            scope: channel === "facebook"?
                "pages_messaging,pages_manage_metadata,pages_read_engagement,pages_show_list"
                :
                "pages_messaging, pages_read_engagement, instagram_basic, instagram_manage_messages, pages_manage_metadata"
            }
        );
    };


    return (
        <div className="container" style={{marginTop: "5rem"}}>
            
            {showRedirectText && <div className="py-3 fs-5 text-end">Redirecting...</div>}

            <div className="border p-4 bg-white rounded social-integrating-page">
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
                    <span>{wordCapitalize(channel)}</span>
                </h6>
            </header>
            <div className="">
                <h5 className="">{wordCapitalize(channel)} Integration</h5>
                <section>
                    <div className="connectViaWhatsWrap">
                        <div className="connectViaWhatsappInstr">
                            <img src={channel === "facebook"? facebookImg : instagramImg} alt="" />
                            <div className="connectViaInstText">
                                <p>Communicate with {wordCapitalize(channel)} users via AlphaCX</p>
                                <p>
                                    Connect your company’s {wordCapitalize(channel)} page to Conversational Inbox and
                                    start chatting with {wordCapitalize(channel)} users.
                                    <br /> Incoming message allocation is based ticket distribution
                                    rules. Chats can be converted to tickets.
                                </p>
                            </div>
                        </div>

                        <ul className="mt-2">
                            <li>You need to create your business page or use an existing one.</li>
                            {channel === "instagram" && <li>Your Instagram business page must be connected to your Facebook Page</li>}
                            <li>You need to be the Administrator of the Facebook Page.</li>
                        </ul>                            

                        <div className="">
                            <button className="btn acx-btn-primary px-3 py-2" onClick={authFb} disabled={pageConnected}>
                                {pageConnected ? "Page Connected" : "Connect Page"}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div className='pt-2'>
            <button className='fs-6' onClick={() => window.location.href = `${baseUrl}/settings/integrations`}>
                <img src={ArrowLeft} alt="ArrowLeft" /> If not automatically redirected click here to go back</button>
        </div>
    </div>
    )
}

export default FBIntegration