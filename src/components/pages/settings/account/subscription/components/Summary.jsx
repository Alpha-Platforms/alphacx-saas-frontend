/* eslint-disable */
// @ts-nocheck
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { Fragment, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { httpPost } from '../../../../../../helpers/httpMethods';
import { getRealCurrency } from './SubTop';
import { separateNum } from '../../../../../../helper';

function CheckoutForm({ setPlanState }) {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const stripeRes = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        /* const { error, token } = await stripe.createToken(elements.getElement(CardElement)); */

        if (!stripeRes?.error) {
            // console.log('STRIPE RESPONSE => ', stripeRes);
            setPlanState((prev) => ({ ...prev, isVerifying: true }));
            const verifyPaymentRes = await httpPost(`subscriptions/verify-payment`, stripeRes?.paymentMethod);
            setPlanState((prev) => ({ ...prev, isVerifying: false }));

            if (verifyPaymentRes?.status === 'success') {
                NotificationManager.success('', 'Transaction successful', 4000);
                window.location.href = `/settings/account?tab=subscription`;
                // setPlanState(prev => ({...prev, isUpdatingPlan: false,
                // stripeConfig: null, amount: null, setSelectingPlan: false}));
            }
        } else {
            console.log(stripeRes?.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" className="stripe-payment-btn" disabled={!stripe || !elements}>
                Make Payment
            </button>
        </form>
    );
}

function FlutterWaveAction({ config, setPlanState }) {
    // use flutterwave react hook
    const handleFlutterPayment = useFlutterwave(config);

    return (
        <button
            onClick={() => {
                handleFlutterPayment({
                    callback: async (response) => {
                        closePaymentModal(); // this will close the modal programmatically

                        if (response?.status === 'successful') {
                            setPlanState((prev) => ({ ...prev, isVerifying: true }));
                            const verifyPaymentRes = await httpPost(`subscriptions/verify-payment`, response);
                            setPlanState((prev) => ({ ...prev, isVerifying: false }));

                            if (verifyPaymentRes?.status === 'success') {
                                NotificationManager.success('', 'Transaction successful', 4000);
                                window.location.href = `/settings/account?tab=subscription`;
                                // setPlanState(prev => ({...prev, isUpdatingPlan: false,
                                // flutterwaveConfig: null, amount: null, selectingPlan: false}));
                            }
                        } else {
                            NotificationManager.error('', 'Transaction failed', 4000);
                        }
                    },
                    onClose: () => {
                        setPlanState((prev) => ({
                            ...prev,
                            isUpdatingPlan: false,
                            flutterwaveConfig: null,
                            amout: null,
                        }));
                    },
                });
            }}
        >
            Make Payment
        </button>
    );
}

function Summary({ planState, setPlanState, plan, tenantInfo }) {
    return (
        <div className="summary-box">
            <h5>Summary</h5>

            {/* <div className="summary-divider"/> */}

            <div className="sbox-2">
                <div>
                    <span>Alpha</span>
                    <span>
                        {planState.numOfAgents} Agent{planState.numOfAgents > 1 ? 's' : ''}
                    </span>
                </div>
                <div>
                    <span>{`${separateNum(
                        planState?.amount
                            ? planState?.amount
                            : planState.numOfAgents * plan[planState?.billingCycle?.value],
                    )} ${getRealCurrency(tenantInfo?.currency || '')}`}</span>
                </div>
            </div>

            <div className="summary-divider" />

            <div className="sbox-3">
                <div>
                    <span>Subtotal</span>
                </div>
                <div>
                    <span>{`${separateNum(
                        planState?.amount
                            ? planState?.amount
                            : planState.numOfAgents * plan[planState?.billingCycle?.value],
                    )} ${getRealCurrency(tenantInfo?.currency || '')}`}</span>
                </div>
            </div>

            <div className="sbox-4">
                <label>Coupons</label>
                <div>
                    <input
                        disabled
                        type="text"
                        className="form-control"
                        name="coupoun"
                        placeholder="Enter Coupon Code"
                    />
                    <button disabled>Apply</button>
                </div>
            </div>

            <div className="summary-divider" />

            <div className="sbox-5">
                <div>
                    <span>Discount</span>
                    <span>0%</span>
                </div>
                <div>
                    <span>0 {getRealCurrency(tenantInfo?.currency || '')}</span>
                </div>
            </div>

            <div className="summary-divider" />

            <div className="sbox-6">
                <div>
                    <span>Total</span>
                </div>
                <div>
                    <span>{`${separateNum(
                        planState?.amount
                            ? planState?.amount
                            : planState.numOfAgents * plan[planState?.billingCycle?.value],
                    )} ${getRealCurrency(tenantInfo?.currency || '')}`}</span>
                </div>
            </div>

            <div className="sbox-7">
                {/* {!flutterwaveConfig && <button onClick={handleInitiatePayment}>{ !isContinuing ? 'Continue' : <ScaleLoader color={"#ffffff"} height={14} width={2} margin={1} />}</button>} */}
                {planState.flutterwaveConfig && (
                    <FlutterWaveAction
                        planState={planState}
                        config={planState.flutterwaveConfig}
                        setPlanState={setPlanState}
                    />
                )}
            </div>
            <div>
                {planState.stripeConfig && (
                    <Elements
                        stripe={loadStripe(planState.stripeConfig?.STRIPE_PUBLIC_KEY)}
                        options={{ clientSecret: planState.stripeConfig?.clientSecret }}
                    >
                        <CheckoutForm planState={planState} setPlanState={setPlanState} />
                    </Elements>
                )}
            </div>
        </div>
    );
}

export default Summary;
