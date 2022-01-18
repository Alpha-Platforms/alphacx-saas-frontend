// @ts-nocheck
import {Fragment, useState, useEffect} from 'react';
import SubTop from './components/SubTop';
import CurrentPlan from './components/CurrentPlan';
import Summary from './components/Summary';
import BillingDetails from './components/BillingDetails';
import './Subscription.scss'
import PaymentHistory from './components/PaymentHistory';
import PaymentForm from './components/PaymentForm';
import {httpGet} from '../../../../../helpers/httpMethods';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {ReactComponent as TickIcon} from '../../../../../assets/icons/tick.svg';
import {getRealCurrency} from './components/SubTop';
import {separateNum} from '../../../../../helper';


const Subscription = () => {
    const [plan,
        setPlan] = useState(null);
    const [tenantId] = useState(window.localStorage.getItem('tenantId'));
    const [domain] = useState(window.localStorage.getItem('domain'));
    const [tenantInfo, setTenantInfo] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [paymentHistory, setPaymentHistory] = useState(null);

    const [planState,
        setPlanState] = useState({
            numOfAgents: 0, 
            billingCycle: {label: 'Billing Monthly', value: 'monthly_amount'},
            selectedPlan: {label: '', value: ''},
            isUpdatingPlan: false,
            flutterwaveConfig: null,
            stripeConfig: null,
            loading: false,
            amount: null,
            selectingPlan: false,
            isVerifying: false
        });

    const getPlan = async () => {
        const res = await httpGet(`subscriptions/plans/${tenantId}`);
        if (res
            ?.status === "success") {
            
            setPlan(res
                ?.data[0]?.name === "Alpha Plan" ? res?.data[0] : res?.data[1]);
        } else {
            setPlan({})
        }
    }

    const getSubscription = async () => {
        const res = await httpGet(`subscriptions/${tenantId}`);
        if (res
            ?.status === "success") {
            setSubscription(res
                ?.data);
            
            window.localStorage.setItem("tenantSubscription", JSON.stringify(res?.data));
        } else {
            setSubscription({})
        }
    }

    const getPaymentHistory = async () => {
        const res = await httpGet(`subscriptions/payment/history/${tenantId}`);
        if (res
            ?.status === "success") {
            setPaymentHistory(res
                ?.data);
        } else {
            setPaymentHistory({})
        }
    }

    const getTenantInfo = async () => {
        const res = await httpGet(`auth/tenant-info/${domain}`);
        if (res
            ?.status === "success") {
            setTenantInfo(res?.data);
        } else {
            setTenantInfo({})
        }
    }

    useEffect(() => {
        getPlan();
        getTenantInfo();
        getSubscription();
        getPaymentHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if (plan && Object.keys(plan || {}).length !== 0) {
            setPlanState(prev => ({
                ...prev,
                selectedPlan: {label: plan?.name, value: plan?.name}
            })); 
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plan]);

    useEffect(() => {
        if (subscription) {
            setPlanState(prev => ({
                ...prev,
                billingCycle: subscription?.subscription?.interval === "yearly" ? {label: 'Billing Year', value: 'monthly_amount'} : {label: 'Billing Monthly', value: 'monthly_amount'}
            }));
        }
    }, [subscription]);

    console.log('PLAN => ', plan);

    console.log('SUBSCRIPTION => ', subscription);


    return (
        <Fragment>
            {(planState.loading || planState.isVerifying) && <div className="cust-table-loader"><ScaleLoader loading={true} color={"#006298"}/></div>}
            {(plan && tenantInfo)
                ?  <div>
                    <div className="d-flex justify-content-between col-md-8 mb-4">
                        <h3 className="fs-6 text-black">Subscription Details</h3>
                    </div>

                    <div>
                        <SubTop plan={plan} tenantInfo={tenantInfo} subscription={subscription} />
                    </div>

                    {true
                        ? <Fragment>
                                {Object.keys(plan).length !== 0 && <Fragment>
                                    {planState.selectingPlan ? <div>
                                        <p className="current-plan-text">
                                            <small>Plan selected: Alpha Plan &nbsp; <button className="btn" onClick={() => setPlanState(prev => ({...prev, selectingPlan: false}))}>✖</button></small>
                                        </p>

                                        <div className="payment-sect-2">
                                            <div><CurrentPlan plan={plan} planState={planState} tenantInfo={tenantInfo} setPlanState={setPlanState} subscription={subscription} /></div>
                                            {(planState.isUpdatingPlan && (planState.flutterwaveConfig || planState.stripeConfig)) && <div><Summary planState={planState} setPlanState={setPlanState} tenantInfo={tenantInfo} plan={plan} /></div>}
                                            {false && <div><BillingDetails/></div>}
                                        </div>
                                    </div> : <div className="plan-selection">
                                    <div className="free-plan">
                                        <div>
                                            <p>Free Plan</p>
                                            <h3>Free</h3>
                                        </div>
                                        <div>
                                            <ul>
                                                <li><span><TickIcon /></span> <span>Conversational Inbox</span></li>
                                                <li><span><TickIcon /></span> <span>Embeddable Livechat Widget</span></li>
                                                <li><span><TickIcon /></span> <span><del>Facebook Integration</del></span></li>
                                                <li><span><TickIcon /></span> <span><del>Whatsapp Integration</del></span></li>
                                                <li><span><TickIcon /></span> <span><del>Automation & Escalation</del></span></li>
                                                <li><span><TickIcon /></span> <span><del>Knowledge Base System</del></span></li>
                                            </ul>
                                            <div>
                                                <button className="btn btn-outline-primary" disabled={true}>Activate</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="alpha-plan">
                                        <div>
                                            <p>Alpha Plan</p>
                                            <h3>{getRealCurrency((tenantInfo?.currency || "")) === "NGN" ? "₦" : "$" }{separateNum(plan[planState?.billingCycle?.value])} <small>per user / Month</small></h3>
                                        </div>
                                        <div>
                                            <ul>
                                                <li><span><TickIcon /></span> <span>Conversational Inbox</span></li>
                                                <li><span><TickIcon /></span> <span>Embeddable Livechat Widget</span></li>
                                                <li><span><TickIcon /></span> <span>Facebook Integration</span></li>
                                                <li><span><TickIcon /></span> <span>Whatsapp Integration</span></li>
                                                <li><span><TickIcon /></span> <span>Automation & Escalation</span></li>
                                                <li><span><TickIcon /></span> <span>Knowledge Base System</span></li>
                                            </ul>
                                            <div>
                                                <button className="btn bg-at-blue-light" onClick={() => setPlanState(prev => ({...prev, selectingPlan: true}))}>Select Plan</button>
                                            </div>
                                        </div>
                                    </div>

                                    </div>}
                                    {paymentHistory && <div><PaymentHistory paymentHistory={paymentHistory} /></div>}
                                </Fragment>}
                            </Fragment>
                        : <Fragment>
                            <PaymentForm/>
                        </Fragment>}

                </div> : <div className="cust-table-loader"><ScaleLoader loading={true} color={"#006298"}/></div>
                }
        </Fragment>
    )
}

export default Subscription;