/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
// @ts-nocheck
import Select from 'react-select';
import { useState, useEffect } from 'react';
import FormCheck from 'react-bootstrap/FormCheck';
// import moment from 'moment';
import { getRealCurrency, getRealCurrencyv2 } from './SubTop';
import { httpPost } from '../../../../../../helpers/httpMethods';
import { separateNum } from '../../../../../../helper';
// import MoonLoader from 'react-spinners/MoonLoader';

function CurrentPlan({ planState, tenantInfo, setPlanState, subscription, totalUsers }) {
    const [initiating, setInitiating] = useState(false);

    const handleInitiatePayment = async () => {
        setInitiating(true);

        // moment(subscription?.subscription?.end_date).isAfter(new Date())

        const paymentInitEndpoint =
            ['monthly', 'yearly'].includes(subscription?.subscription?.interval) && planState.actionType === 'add-user'
                ? `subscriptions/payment/initialize-subscription-update`
                : `subscriptions/initialize-payment`;

        // body data to initiate payment
        const initPaymentBody =
            planState.actionType === 'add-user'
                ? {
                      tenantId: window.localStorage.getItem('tenantId'),
                      numOfUsers: planState.numOfAgents,
                  }
                : {
                      tenantId: window.localStorage.getItem('tenantId'),
                      subscriptionCategory: planState.billingCycle?.value === 'yearly_amount' ? 'yearly' : 'monthly',
                      subscriptionTypeId: planState?.selectedPlan?.id,
                      numOfUsers: planState?.numOfAgents,
                  };

        const initPaymentRes = await httpPost(paymentInitEndpoint, initPaymentBody);

        setInitiating(false);

        if (initPaymentRes?.status === 'success') {
            // console.log('INITIATE PAYMENT RESPONSE => ', initPaymentRes);

            setPlanState((prev) => ({ ...prev, isUpdatingPlan: true }));
            /* *
             * if currency is NGN, use flutterwave for payment, if currency is
             * USD, use stripe for payment
             *
             */
            if (getRealCurrency(tenantInfo?.currency || '') === 'NGN') {
                // FLUTTERWAVE PAYMENT
                setPlanState((prev) => ({
                    ...prev,
                    flutterwaveConfig: initPaymentRes?.data,
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

    const disableAfterActionBtnClick =
        initiating || planState.isUpdatingPlan || (planState.actionType === 'add-user' && planState?.numOfAgents <= 0);

    const handleUpdatePlanBtn = () => {
        if (planState.numOfAgents <= 0) return window.document.getElementById('numOfAgents')?.focus();
        // eslint-disable-next-line consistent-return
        if (disableAfterActionBtnClick) return;

        return handleInitiatePayment();
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initiating]);

    const handleNumChange = (e) => {
        if (Number(e.target.value) < totalUsers && planState?.actionType !== 'add-user') return;
        if (Number(e.target.value) < 0 && planState?.actionType === 'add-user') return;
        if (planState?.actionType !== 'add-user') return;
        setPlanState((prev) => ({ ...prev, numOfAgents: e.target.value }));
    };

    const handleActionType = (e) => {
        if (disableAfterActionBtnClick) return;
        const type = e.target.id;
        setPlanState((prev) => ({
            ...prev,
            actionType: type,
            numOfAgents: type === 'add-user' ? 1 : totalUsers || 0,
        }));
    };

    return (
        <div className="currentplan-box">
            <div className="mb-3">
                <FormCheck
                    onChange={handleActionType}
                    inline
                    label="Renew Plan"
                    name="actiontype"
                    type="radio"
                    id="renew-plan"
                    disabled={disableAfterActionBtnClick}
                    checked={planState.actionType === 'renew-plan'}
                />
                <FormCheck
                    onChange={handleActionType}
                    inline
                    label="Add Addiitonal Users"
                    name="actiontype"
                    type="radio"
                    id="add-user"
                    disabled={disableAfterActionBtnClick}
                    checked={planState.actionType === 'add-user'}
                />
                <FormCheck
                    onChange={handleActionType}
                    inline
                    label="Update Plan"
                    name="actiontype"
                    type="radio"
                    id="update-plan"
                    disabled={disableAfterActionBtnClick}
                    checked={planState.actionType === 'update-plan'}
                />
            </div>
            <p className="mb-1">
                <small>
                    <b>ⓘ</b>{' '}
                    {planState.actionType === 'renew-plan'
                        ? 'You can only renew active users. To renew inactive users click here'
                        : planState.actionType === 'add-user'
                        ? 'Add number of additional user licenses you want.'
                        : `You can only pay for your number of active users (${totalUsers}) and above.`}
                </small>
            </p>
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
                        <label htmlFor="numOfAgents">Number of Users</label>
                        <div>
                            <input
                                type="number"
                                className="form-control"
                                value={planState.numOfAgents}
                                name="numOfAgents"
                                id="numOfAgents"
                                min={planState?.actionType === 'add-user' ? 0 : totalUsers}
                                onChange={handleNumChange}
                                disabled={
                                    planState.isUpdatingPlan ||
                                    planState.actionType === 'renew-plan' ||
                                    planState.actionType === 'update-plan'
                                }
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
                                planState.actionType === 'renew-plan' ||
                                planState.actionType === 'add-user' ||
                                initiating ||
                                planState.isUpdatingPlan
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
                {getRealCurrencyv2(planState?.selectedPlan?.currency || '')}
                {separateNum(planState?.selectedPlan?.monthly_amount)} / agent / month
            </p>

            <div className="d-flex justify-content-between align-items-center mt-5">
                <div className="agent-count-select">
                    <div>
                        <span>{`${getRealCurrencyv2(tenantInfo?.currency || '')}${separateNum(
                            planState.numOfAgents * (planState?.selectedPlan?.[planState?.billingCycle?.value] || 0),
                        )} / ${planState?.billingCycle?.value === 'monthly_amount' ? 'month' : 'year'}`}</span>
                    </div>
                </div>

                <div className="updateplan-btn-wrapper">
                    <button onClick={handleUpdatePlanBtn} type="button" disabled={disableAfterActionBtnClick}>
                        Continue to Payment
                        {/* {Object.keys(planState?.selectedPlan || {}).length === 0 ? 'Select Plan' : 'Update Plan'} */}
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
        </div>
    );
}

export default CurrentPlan;
