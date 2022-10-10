/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { usePaystackPayment } from 'react-paystack';
import { NotificationManager } from 'react-notifications';
import { loadStripe } from '@stripe/stripe-js';
import { css } from '@emotion/css';
import ClipLoader from 'react-spinners/ClipLoader';
import { CardElement, PaymentElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { httpPost } from '../../../../../../helpers/httpMethods';
import { getRealCurrency, getRealCurrencyv2 } from './SubTop';
import { separateNum, centToDollarCentv2, brandKit } from '../../../../../../helper';
import acxLogo from '../../../../../../assets/images/whitebg.jpg';
import { config } from '../../../../../../config/keys';

const { paystackPublicKey, flutterwavePublicKey } = config;

function CheckoutForm({ setPlanState, planState, getSubscription }) {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet.  stripe must be fully loaded before form submission
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(PaymentElement);

        setPlanState((prev) => ({ ...prev, isVerifying: true }));

        // get stripe's payment intent
        const stripeRes = await stripe.confirmCardPayment(planState.stripeConfig?.clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (!stripeRes?.error) {
            const verifyPaymentRes = await httpPost(`subscriptions/verify-payment`, stripeRes?.paymentIntent);
            setPlanState((prev) => ({ ...prev, isVerifying: false }));
            if (verifyPaymentRes?.status === 'success') {
                NotificationManager.success('', 'Transaction successful', 4000);
                dispatch(
                    getSubscription(null, () => {
                        window.location.href = `/settings/account?tab=subscription`;
                    }),
                );
                // window.location.href = `/settings/account?tab=subscription`;
                // setPlanState(prev => ({...prev, isUpdatingPlan: false,
                // stripeConfig: null, amount: null, setSelectingPlan: false}));
            }
        } else {
            setPlanState((prev) => ({ ...prev, isVerifying: false }));
            // eslint-disable-next-line no-console
            console.error(stripeRes?.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button
                type="submit"
                className={`stripe-payment-btn ${css({
                    ...brandKit({ bgCol: 0 }),
                    color: 'white',
                    '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                })}`}
                disabled={!stripe || !elements}
            >
                Make Payment
            </button>
        </form>
    );
}

// eslint-disable-next-line no-shadow
function FlutterWaveAction({ planState, config, setPlanState, getSubscription }) {
    const dispatch = useDispatch();
    // get current user from localStorage
    const currentUser = useSelector((state) => state?.userAuth?.user);

    const configToUse = {
        public_key: flutterwavePublicKey,
        tx_ref: config?.reference,
        amount: Number(config?.amount + config?.vat),
        currency: 'NGN',
        // payment_options: 'card,mobilemoney,ussd',
        payment_options: 'card',
        customer: {
            email: currentUser?.email,
            phonenumber: currentUser?.phone_number,
            name: `${currentUser?.firstname || ''} ${currentUser?.lastname || ''}`.trim(),
        },
        customizations: {
            title: 'AlphaCX',
            description: `Payment for ${planState.numOfAgents} agents`,
            logo: acxLogo,
        },
    };
    // use flutterwave react hook
    const handleFlutterPayment = useFlutterwave(configToUse);

    return (
        <button
            type="button"
            className={`${css({
                ...brandKit({ bgCol: 0 }),
                color: 'white',
                '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
            })}`}
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
                                dispatch(
                                    getSubscription(null, () => {
                                        window.location.href = `/settings/account?tab=subscription`;
                                    }),
                                );
                                // window.location.href = `/settings/account?tab=subscription`;
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
                            amount: null,
                        }));
                    },
                });
            }}
        >
            Make Payment
        </button>
    );
}

// eslint-disable-next-line no-shadow
function PayStackAction({ config, setPlanState, getSubscription }) {
    const [paying, setPaying] = useState(false);
    const dispatch = useDispatch();
    // get current user from localStorage
    const currentUser = useSelector((state) => state?.userAuth?.user);

    const configToUse = {
        reference: config?.reference,
        email: currentUser?.email,
        amount: Number(config?.amount + config?.vat) * 100,
        publicKey: paystackPublicKey,
    };

    const initializePayment = usePaystackPayment(configToUse);

    const verifyPayment = async (payload) => {
        const verifyPaymentRes = await httpPost(`subscriptions/verify-payment`, payload);
        setPlanState((prev) => ({ ...prev, isVerifying: false }));

        if (verifyPaymentRes?.status === 'success') {
            NotificationManager.success('', 'Transaction successful', 4000);
            dispatch(
                getSubscription(null, () => {
                    window.location.href = `/settings/account?tab=subscription`;
                }),
            );
        } else {
            NotificationManager.error('', 'An error occured', 4000);
        }
    };

    const paymentSuccess = (reference) => {
        const verifyPayload = {
            tx_ref: config?.reference,
            reference: reference?.reference,
            amount: Number(config?.amount + config?.vat) * 100,
            auto_renew: true,
            currency: 'NGN',
        };

        verifyPayment(verifyPayload);
    };

    const handleClose = () => {
        setPlanState((prev) => ({
            ...prev,
            isUpdatingPlan: false,
            paystackConfig: null,
            amount: null,
        }));
    };

    const handleClick = () => {
        initializePayment(paymentSuccess, handleClose);
        setPaying(true);
    };
    return (
        <div>
            <button
                type="submit"
                className={`paystack-payment-btn ${css({
                    ...brandKit({ bgCol: 0 }),
                    color: 'white',
                    '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                })}`}
                onClick={handleClick}
            >
                {paying && (
                    <div className="d-inline-flex justify-content-center align-items-center">
                        <ClipLoader color="#ffffff" size={15} />
                    </div>
                )}{' '}
                {/* <ClipLoader size={15} loading color="#FFFFFF" /> */}
                <span>Make Payment</span>
            </button>
        </div>
    );
}

function Summary({ planState, setPlanState, tenantInfo, getSubscription }) {
    const numOfAgentsToPayFor = planState.numOfAgents;
    return (
        <div className="summary-box">
            <div className="p-4">
                <h5>Summary</h5>

                {/* <div className="summary-divider"/> */}

                <div className="sbox-2">
                    <div>
                        <span>{planState?.selectedPlan?.name}</span>
                        <span>
                            {numOfAgentsToPayFor} Agent{numOfAgentsToPayFor > 1 ? 's' : ''}
                        </span>
                    </div>
                    <div>
                        {/* <span>{`${separateNum(
                            planState?.amount
                                ? planState?.amount
                                : numOfAgentsToPayFor * plan[planState?.billingCycle?.value],
                        )} ${getRealCurrency(tenantInfo?.currency || '')}`}</span> */}
                        <span>
                            {`${getRealCurrencyv2(tenantInfo?.currency || '')}${
                                getRealCurrency(tenantInfo?.currency || '') === 'NGN' && planState?.flutterwaveConfig
                                    ? separateNum(Number(planState?.flutterwaveConfig?.amount))
                                    : getRealCurrency(tenantInfo?.currency || '') === 'NGN' && planState?.paystackConfig
                                    ? separateNum(Number(planState?.paystackConfig?.amount))
                                    : getRealCurrency(tenantInfo?.currency || '') === 'USD'
                                    ? centToDollarCentv2(Number(planState?.stripeConfig?.amount))
                                    : 'N/A'
                            }`.trim()}
                        </span>
                    </div>
                </div>

                {getRealCurrency(tenantInfo?.currency || '') === 'NGN' && (
                    <div className="sbox-2 mt-3">
                        <div>
                            <span>VAT</span>
                        </div>
                        <div>
                            <span>{`${getRealCurrencyv2(tenantInfo?.currency || '')}${
                                getRealCurrency(tenantInfo?.currency || '') === 'NGN' && planState?.flutterwaveConfig
                                    ? separateNum(Number(planState?.flutterwaveConfig?.vat))
                                    : getRealCurrency(tenantInfo?.currency || '') === 'NGN' && planState?.paystackConfig
                                    ? separateNum(Number(planState?.paystackConfig?.vat))
                                    : getRealCurrency(tenantInfo?.currency || '') === 'USD'
                                    ? centToDollarCentv2(Number(planState?.stripeConfig?.vat))
                                    : 'N/A'
                            }`}</span>
                        </div>
                    </div>
                )}

                <div className="summary-divider" />

                <div className="sbox-3">
                    <div>
                        <span>Subtotal</span>
                    </div>
                    <div>
                        <span>
                            {`${getRealCurrencyv2(tenantInfo?.currency || '')}${
                                getRealCurrency(tenantInfo?.currency || '') === 'NGN' && planState.flutterwaveConfig
                                    ? separateNum(
                                        Number(planState?.flutterwaveConfig?.amount + planState?.flutterwaveConfig?.vat),
                                    )
                                    : getRealCurrency(tenantInfo?.currency || '') === 'NGN' && planState.paystackConfig
                                    ? separateNum(
                                        Number(planState?.paystackConfig?.amount + planState?.paystackConfig?.vat),
                                    )
                                    : getRealCurrency(tenantInfo?.currency || '') === 'USD'
                                    ? centToDollarCentv2(
                                        Number(planState?.stripeConfig?.amount + planState?.stripeConfig?.vat),
                                    )
                                    : 'N/A'
                            }`.trim()}
                        </span>
                    </div>
                </div>

                <div className="sbox-4">
                    <label htmlFor="coupoun">Coupons</label>
                    <div>
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            name="coupoun"
                            id="coupoun"
                            placeholder="Enter Coupon Code"
                        />
                        <button type="button" disabled>
                            Apply
                        </button>
                    </div>
                </div>

                <div className="summary-divider" />

                <div className="sbox-5">
                    <div>
                        <span>Discount</span>
                        <span>0%</span>
                    </div>
                    <div>
                        <span>
                            {getRealCurrencyv2(tenantInfo?.currency || '')}
                            {getRealCurrency(tenantInfo?.currency || '') === 'NGN' ? '0' : '0.00'}
                        </span>
                    </div>
                </div>

                <div className="summary-divider" />

                <div className="sbox-6">
                    <div>
                        <span>Total</span>
                    </div>
                    <div>
                        <span>
                            {`${getRealCurrencyv2(tenantInfo?.currency || '')}${
                                getRealCurrency(tenantInfo?.currency || '') === 'NGN' && planState.flutterwaveConfig
                                    ? separateNum(
                                        Number(planState?.flutterwaveConfig?.amount + planState?.flutterwaveConfig?.vat),
                                    )
                                    : getRealCurrency(tenantInfo?.currency || '') === 'NGN' && planState.paystackConfig
                                    ? separateNum(
                                        Number(planState?.paystackConfig?.amount + planState?.paystackConfig?.vat),
                                    )
                                    : getRealCurrency(tenantInfo?.currency || '') === 'USD'
                                    ? centToDollarCentv2(
                                        Number(planState?.stripeConfig?.amount + planState?.stripeConfig?.vat),
                                    )
                                    : 'N/A'
                            }`.trim()}
                        </span>
                    </div>
                </div>

                <div className="sbox-7">
                    {/* {!flutterwaveConfig && <button onClick={handleInitiatePayment}>{ !isContinuing ? 'Continue' : <ClipLoader color={"#ffffff"} size={30} height={14} width={2} margin={1} />}</button>} */}
                    {planState.flutterwaveConfig && (
                        <FlutterWaveAction
                            planState={planState}
                            config={planState.flutterwaveConfig}
                            setPlanState={setPlanState}
                            getSubscription={getSubscription}
                        />
                    )}
                    {planState.paystackConfig && (
                        <PayStackAction
                            planState={planState}
                            config={planState.paystackConfig}
                            setPlanState={setPlanState}
                            getSubscription={getSubscription}
                        />
                    )}
                </div>
            </div>

            <div className="p-4 bg-light border-top">
                {planState.stripeConfig && (
                    <Elements
                        stripe={loadStripe(planState.stripeConfig?.STRIPE_PUBLIC_KEY)}
                        options={{
                            clientSecret: planState.stripeConfig?.clientSecret,
                            appearance: {
                                theme: 'stripe',
                            },
                        }}
                    >
                        <CheckoutForm
                            planState={planState}
                            setPlanState={setPlanState}
                            getSubscription={getSubscription}
                        />
                    </Elements>
                )}
            </div>
        </div>
    );
}

export default Summary;
