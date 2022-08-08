/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
// @ts-nocheck
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { NotificationManager } from 'react-notifications';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { httpPost } from '../../../../../../helpers/httpMethods';
import { getRealCurrency, getRealCurrencyv2 } from './SubTop';
import { separateNum, centToDollarCentv2 } from '../../../../../../helper';
import acxLogo from '../../../../../../assets/images/whitebg.jpg';

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
        const cardElement = elements.getElement(CardElement);

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
            <CardElement />
            <button type="submit" className="stripe-payment-btn" disabled={!stripe || !elements}>
                Make Payment
            </button>
        </form>
    );
}

function FlutterWaveAction({ planState, config, setPlanState, getSubscription }) {
    const dispatch = useDispatch();
    // get current user from localStorage
    const currentUser = useSelector((state) => state?.userAuth?.user);

    const configToUse = {
        public_key: config?.FLW_PUBLIC_KEY,
        tx_ref: config?.reference,
        amount: config?.totalAmount || config?.amount,
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

function Summary({ planState, setPlanState, tenantInfo, getSubscription }) {
    const numOfAgentsToPayFor = planState.numOfAgents;
    return (
        <div className="summary-box">
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
                            getRealCurrency(tenantInfo?.currency || '') === 'NGN'
                                ? separateNum(Number(planState?.flutterwaveConfig?.amount))
                                : centToDollarCentv2(Number(planState?.stripeConfig?.amount))
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
                            getRealCurrency(tenantInfo?.currency || '') === 'NGN'
                                ? separateNum(Number(planState?.flutterwaveConfig?.vat))
                                : centToDollarCentv2(Number(planState?.stripeConfig?.vat))
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
                            getRealCurrency(tenantInfo?.currency || '') === 'NGN'
                                ? separateNum(
                                      Number(planState?.flutterwaveConfig?.amount + planState?.flutterwaveConfig?.vat),
                                  )
                                : centToDollarCentv2(
                                      Number(planState?.stripeConfig?.amount + planState?.stripeConfig?.vat),
                                  )
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
                    <span>{getRealCurrencyv2(tenantInfo?.currency || '')}0.00</span>
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
                            getRealCurrency(tenantInfo?.currency || '') === 'NGN'
                                ? separateNum(
                                      Number(planState?.flutterwaveConfig?.amount + planState?.flutterwaveConfig?.vat),
                                  )
                                : centToDollarCentv2(
                                      Number(planState?.stripeConfig?.amount + planState?.stripeConfig?.vat),
                                  )
                        }`.trim()}
                    </span>
                </div>
            </div>

            <div className="sbox-7">
                {/* {!flutterwaveConfig && <button onClick={handleInitiatePayment}>{ !isContinuing ? 'Continue' : <MoonLoader color={"#ffffff"} size={30} height={14} width={2} margin={1} />}</button>} */}
                {planState.flutterwaveConfig && (
                    <FlutterWaveAction
                        planState={planState}
                        config={planState.flutterwaveConfig}
                        setPlanState={setPlanState}
                        getSubscription={getSubscription}
                    />
                )}
            </div>
            <div>
                {planState.stripeConfig && (
                    <Elements
                        stripe={loadStripe(planState.stripeConfig?.STRIPE_PUBLIC_KEY)}
                        options={{ clientSecret: planState.stripeConfig?.clientSecret }}
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
