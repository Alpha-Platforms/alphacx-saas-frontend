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


const Subscription = () => {
    const [plan,
        setPlan] = useState(null);
    const [tenantId] = useState(window.localStorage.getItem('tenantId'));
    const [domain] = useState(window.localStorage.getItem('domain'));
    const [tenantInfo, setTenantInfo] = useState(null);
    const [planState,
        setPlanState] = useState({
            numOfAgents: 0, 
            billingCycle: {label: 'Billing Monthly', value: 'monthly_amount'},
            selectedPlan: {label: '', value: ''},
            isUpdatingPlan: false,
            flutterwaveConfig: null,
            stripeConfig: null});

    const getPlan = async () => {
        const res = await httpGet(`subscriptions/plans/${tenantId}`);
        if (res
            ?.status === "success") {
            setPlan(res
                ?.data);
        } else {
            setPlan({})
        }
    }

    const getTenantInfo = async () => {
        const res = await httpGet(`auth/tenant-info/${domain}`);
        if (res
            ?.status === "success") {
            console.log('TENANT INFO => ', res);
            setTenantInfo(res?.data);
        } else {
            setTenantInfo({})
        }
    }

    useEffect(() => {
        getPlan();
        getTenantInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log('PLAN STATE => ', planState);

    useEffect(() => {
        if (plan && Object.keys(plan || {}).length !== 0) {
            setPlanState(prev => ({
                ...prev,
                selectedPlan: {label: plan?.name, value: plan?.name}
            }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plan]);

    console.log('PLAN => ', plan)

    return (
        <Fragment>
            {(plan && tenantInfo)
                ?  <div>
                    <div className="d-flex justify-content-between col-md-8 mb-4">
                        <h3 className="fs-6 text-black">Subscription Details</h3>
                    </div>

                    <div>
                        <SubTop plan={plan} tenantInfo={tenantInfo} />
                    </div>

                    {true
                        ? <Fragment>
                                {Object.keys(plan).length !== 0 && <Fragment>
                                    <div>
                                        <p className="current-plan-text">
                                            <small>Your current plan</small>
                                        </p>

                                        <div className="payment-sect-2">
                                            <div><CurrentPlan plan={plan} planState={planState} tenantInfo={tenantInfo} setPlanState={setPlanState}/></div>
                                            {(planState.isUpdatingPlan && (planState.flutterwaveConfig || planState.stripeConfig)) && <div><Summary planState={planState} setPlanState={setPlanState} plan={plan} /></div>}
                                            {false && <div><BillingDetails/></div>}
                                        </div>
                                    </div>
                                    {false && <div><PaymentHistory/></div>}
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