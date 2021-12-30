// @ts-nocheck
import Select from "react-select";
import {getRealCurrency} from './SubTop';
import {useState, useEffect} from 'react';
import {httpPost} from '../../../../../../helpers/httpMethods';
import ScaleLoader from 'react-spinners/ScaleLoader';

const CurrentPlan = ({plan, planState, tenantInfo, setPlanState}) => {
    const [initiating, setInitiating] = useState(false);

    const handlePlanChange = option => {
        console.log('Selected option => ', option);
        setPlanState(prev => ({
            ...prev,
            selectedPlan: option
        }));
    }

    const handleInitiatePayment = async() => {

        // body data to initiate payment
        const initPaymentBody = {
            tenantId: window
                .localStorage
                .getItem('tenantId'),
            subscriptionCategory: planState.billingCycle
                ?.value === 'yearly_amount'
                    ? 'yearly'
                    : 'monthly',
            subscriptionTypeId: plan
                ?.id,
            numOfUsers: planState
                ?.numOfAgents
        }

        setInitiating(true);

        const initPaymentRes = await httpPost(`subscriptions/initialize-payment`, initPaymentBody);

        setInitiating(false);

        if (initPaymentRes
            ?.status === "success") {

            console.log('INITIATE PAYMENT RESPONSE => ', initPaymentRes);

            setPlanState(prev => ({...prev, isUpdatingPlan: true}))

            // get current user from localStorage
            const currentUser = JSON.parse(window.localStorage.getItem('user'));

            if (getRealCurrency(tenantInfo?.currency || '') === "NGN") {
                const config = {
                    public_key: initPaymentRes
                        ?.data
                            ?.FLW_PUBLIC_KEY,
                    tx_ref: initPaymentRes
                        ?.data
                            ?.reference,
                    amount: planState.numOfAgents * (plan[planState?.billingCycle?.value]),
                    currency: "NGN",
                    // payment_options: 'card,mobilemoney,ussd',
                    payment_options: 'card',
                    customer: {
                        email: currentUser
                            ?.user
                                ?.email,
                        phonenumber: currentUser
                            ?.user
                                ?.phone_number,
                        name: `${currentUser
                            ?.user
                                ?.firstname || ''} ${currentUser
                                    ?.user
                                        ?.lastname || ''}`.trim()
                    },
                    customizations: { 
                        title: 'AlphaCX',
                        description: `Payment for ${planState.numOfAgents} agents`,
                        logo: 'https://alphacx.co/wp-content/uploads/2021/08/AlphaCX-Logo-Full-768x212.png'
                    }
                };
    
                setPlanState(prev => ({ 
                    ...prev, 
                    flutterwaveConfig: config
                }));


            } else if (getRealCurrency(tenantInfo?.currency || '') === "USD") {
                setPlanState(prev => ({ 
                    ...prev, 
                    stripeConfig: initPaymentRes?.data
                }));
            }

        }

    }

    const handleUpdatePlanBtn = () => {
        if (planState.numOfAgents <= 0)
            return window.document.getElementById('numOfAgents')?.focus();   
        
        handleInitiatePayment();
    }

    const handleBillingChange = option => {
        setPlanState(prev => ({
            ...prev,
            billingCycle: option
        }));
    }

    useEffect(() => {
        setPlanState(prev => ({
            ...prev,
            loading: initiating
        }));
    }, [initiating]);

    return (
        <div className="currentplan-box">
            <div className="cp-top">
                <div>
                    <div>
                        <label>Plan</label>
                        <Select
                            name="plan"
                            className="cptop-plan"
                            value={planState?.selectedPlan}
                            isDisabled={initiating || planState.isUpdatingPlan}
                            options={[
                                {value: 'Alpha Plan', label: 'Alpha Plan'},
                                ]}
                            onChange={handlePlanChange}/>
                    </div>
                </div>

                <div className="sbox-1">
                    <div>
                        <label>Billing Cycle</label>
                    </div>
                    <div>
                        <Select
                            name="plan"
                            className="billing-time-select"
                            value={planState.billingCycle}
                            isDisabled={initiating || planState.isUpdatingPlan}
                            options={[
                            {
                                value: 'monthly_amount',
                                label: 'Billing Monthly'
                            }, {
                                value: 'yearly_amount',
                                label: 'Billing Yearly'
                            }
                        ]}
                            onChange={handleBillingChange}/>
                    </div>
                </div>
                
                
            </div>

            <p>
                {plan[planState?.billingCycle?.value]} {getRealCurrency(tenantInfo?.currency || '')} per agent / month
            </p>

            <div className="agent-count-select">
                <div>
                    <label htmlFor="numOfAgents">Agents</label>
                    <div><input type="number" className="form-control" value={planState.numOfAgents} name="numOfAgents" id="numOfAgents" min={0} onChange={e => setPlanState(prev => ({...prev, numOfAgents: e.target.value }))} disabled={planState.isUpdatingPlan} /></div>
                </div>
                <div>
                    <span>{`${planState.numOfAgents * (plan[planState?.billingCycle?.value])} ${getRealCurrency(tenantInfo?.currency || '')} / ${planState?.billingCycle?.value === "monthly_amount" ? "month" : "year"}`}</span>
                </div>
            </div>
            
            <div className="updateplan-btn-wrapper">
                <button onClick={handleUpdatePlanBtn} type="button" disabled={initiating || planState.isUpdatingPlan}>{Object.keys(plan || {}).length === 0 ? 'Select Plan' : 'Update Plan'}</button>

                {planState.isUpdatingPlan && <button onClick={() => setPlanState(prev => ({...prev, isUpdatingPlan: false, flutterwaveConfig: null, stripeConfig: null}))} type="button">Cancel</button>}
            </div>

        </div>
    )
}

export default CurrentPlan;