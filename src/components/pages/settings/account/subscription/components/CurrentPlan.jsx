/* eslint-disable react/prop-types */
/* eslint-disable */
// @ts-nocheck
import Select from 'react-select';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { getRealCurrency } from './SubTop';
import { httpPost } from '../../../../../../helpers/httpMethods';
import { separateNum } from '../../../../../../helper';
import acxLogo from '../../../../../../assets/images/whitebg.jpg';
// import MoonLoader from 'react-spinners/MoonLoader';

function CurrentPlan({ plan, planState, tenantInfo, setPlanState, subscription, totalUsers}) {
    const [initiating, setInitiating] = useState(false);
    const [addMoreUser, setAddMoreUser] = useState(false);

    const handleInitiatePayment = async () => {
        setInitiating(true);

        const paymentInitEndpoint =
            false &&
            ['monthly', 'yearly'].includes(subscription?.subscription?.interval) &&
            subscription?.plan?.name?.toLowerCase() === 'alpha plan' &&
            moment(subscription?.subscription?.end_date).isAfter(new Date())
                ? `subscriptions/payment/initialize-subscription-update`
                : `subscriptions/initialize-payment`;

        // body data to initiate payment
        const initPaymentBody =
            paymentInitEndpoint === 'subscriptions/payment/initialize-subscription-update'
                ? {
                      tenantId: window.localStorage.getItem('tenantId'),
                      numOfUsers: planState?.numOfAgents,
                  }
                : {
                      tenantId: window.localStorage.getItem('tenantId'),
                      subscriptionCategory: planState.billingCycle?.value === 'yearly_amount' ? 'yearly' : 'monthly',
                      subscriptionTypeId: plan?.id,
                      numOfUsers: planState?.numOfAgents,
                  };

        const initPaymentRes = await httpPost(paymentInitEndpoint, initPaymentBody);

        setInitiating(false);

        if (initPaymentRes?.status === 'success') {
            // console.log('INITIATE PAYMENT RESPONSE => ', initPaymentRes);

            setPlanState((prev) => ({ ...prev, isUpdatingPlan: true }));

            // get current user from localStorage
            const currentUser = JSON.parse(window.localStorage.getItem('user'));

            /* *
            * if currency is NGN, use flutterwave for payment, if currency is        
            * USD, use stripe for payment
            * 
            */
            if (getRealCurrency(tenantInfo?.currency || '') === 'NGN') {
                // FLUTTERWAVE PAYMENT
                const config = {
                    public_key: initPaymentRes?.data?.FLW_PUBLIC_KEY,
                    tx_ref: initPaymentRes?.data?.reference,
                    amount: initPaymentRes?.data?.amount,
                    currency: 'NGN',
                    // payment_options: 'card,mobilemoney,ussd',
                    payment_options: 'card',
                    customer: {
                        email: currentUser?.user?.email,
                        phonenumber: currentUser?.user?.phone_number,
                        name: `${currentUser?.user?.firstname || ''} ${currentUser?.user?.lastname || ''}`.trim(),
                    },
                    customizations: {
                        title: 'AlphaCX',
                        description: `Payment for ${planState.numOfAgents} agents`,
                        logo: acxLogo,
                    },
                };

                setPlanState((prev) => ({
                    ...prev,
                    flutterwaveConfig: config,
                    amount: initPaymentRes?.data?.amount,
                }));
            } else if (getRealCurrency(tenantInfo?.currency || '') === 'USD') {
                // STRIPE PAYMENT
                setPlanState((prev) => ({
                    ...prev,
                    stripeConfig: initPaymentRes?.data,
                }));
            }
        }
    };

    const handleUpdatePlanBtn = () => {
        if (planState.numOfAgents <= 0) return window.document.getElementById('numOfAgents')?.focus();

        handleInitiatePayment();
    };

    const handleBillingChange = (option) => {
        setPlanState((prev) => ({
            ...prev,
            billingCycle: option,
        }));
    };

    useEffect(() => {
        setPlanState((prev) => ({
            ...prev,
            loading: initiating,
        }));
    }, [initiating]);

    const handleNumChange = (e) => {
        if (Number(e.target.value) < totalUsers?.length) return;
        setPlanState((prev) => ({ ...prev, numOfAgents: e.target.value }))
    }

    return (
        <div className="currentplan-box">
            <p className='mb-1'><small><b>ⓘ</b> You can only pay for your number of active users ({totalUsers.length}) and above.</small></p>
            <div className="cp-top">
                <div>
                    {/* <div>
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
                    </div> */}
                    <div>
                        <label htmlFor="numOfAgents">Agents</label>
                        <div>
                            <input
                                type="number"
                                className="form-control"
                                value={planState.numOfAgents}
                                name="numOfAgents"
                                id="numOfAgents"
                                min={totalUsers.length}
                                onChange={handleNumChange}
                                disabled={planState.isUpdatingPlan}
                            />
                        </div>
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
                            isDisabled={
                                initiating ||
                                planState.isUpdatingPlan ||
                                (subscription?.subscription?.interval === 'monthly' &&
                                    subscription?.plan?.name === 'Alpha Plan') ||
                                (subscription?.subscription?.interval === 'yearly' &&
                                    subscription?.plan?.name === 'Alpha Plan')
                            }
                            options={[
                                {
                                    value: 'monthly_amount',
                                    label: 'Billing Monthly',
                                },
                                {
                                    value: 'yearly_amount',
                                    label: 'Billing Yearly',
                                },
                            ]}
                            onChange={handleBillingChange}
                        />
                    </div>
                </div>
            </div>

            <p>
                {separateNum(plan[planState?.billingCycle?.value])} {getRealCurrency(tenantInfo?.currency || '')} per
                agent / month
            </p>

            <div className="agent-count-select">
                <div>
                    <span>{`${separateNum(
                        planState.numOfAgents * plan[planState?.billingCycle?.value],
                    )} ${getRealCurrency(tenantInfo?.currency || '')} / ${
                        planState?.billingCycle?.value === 'monthly_amount' ? 'month' : 'year'
                    }`}</span>
                </div>
            </div>

            <div className="updateplan-btn-wrapper">
                <button onClick={handleUpdatePlanBtn} type="button" disabled={initiating || planState.isUpdatingPlan}>
                    {Object.keys(plan || {}).length === 0 ? 'Select Plan' : 'Update Plan'}
                </button>

                {planState.isUpdatingPlan && (
                    <button
                        onClick={() =>
                            setPlanState((prev) => ({
                                ...prev,
                                isUpdatingPlan: false,
                                flutterwaveConfig: null,
                                stripeConfig: null,
                                amount: null,
                            }))
                        }
                        type="button"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
}

export default CurrentPlan;
