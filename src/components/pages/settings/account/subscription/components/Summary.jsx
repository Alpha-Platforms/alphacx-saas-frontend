// @ts-nocheck
import {httpPost} from '../../../../../../helpers/httpMethods';
// import AcxLogo from '../../../../../../assets/images/acxsquarelogo.png';
import {useFlutterwave, closePaymentModal} from 'flutterwave-react-v3';
import {Fragment, useState} from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { NotificationManager } from 'react-notifications';
import {loadStripe} from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import {getRealCurrency} from './SubTop';

const CheckoutForm = ({setIsVerifying, setPlanState}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        /* const {error, paymentMethod, token} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        }); */

        const { error, token } = await stripe.createToken(CardElement);

        /* console.log('STRIPE Error => ', error);
        console.log('STRIPE paymentMethod => ', paymentMethod);
        console.log('STRIPE token => ', token) */
        if (!error) {
            
            setIsVerifying(true);
            const verifyPaymentRes = await httpPost(`subscriptions/verify-payment`, token);
            setIsVerifying(false);

            if (verifyPaymentRes?.status === "success") {
                NotificationManager.success('', 'Transaction successful', 4000);
                setPlanState(prev => ({...prev, isUpdatingPlan: false,
                stripeConfig: null}));
            }
            
            } else {
            console.log(error);
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
};

const FlutterWaveAction = ({config, isVerifying, setIsVerifying, setPlanState}) => {

    // use flutterwave react hook
    const handleFlutterPayment = useFlutterwave(config);
    // console.log('From flutterwave action');

    return <Fragment>
        <button onClick={() => {
            handleFlutterPayment({
                callback: async (response) => {
                    closePaymentModal() // this will close the modal programmatically

                    console.log('FLUTTEWAVE RESPONSE => ', response);

                    if (response?.status === "successful") {
                        setIsVerifying(true);
                        const verifyPaymentRes = await httpPost(`subscriptions/verify-payment`, response);
                        setIsVerifying(false);

                        if (verifyPaymentRes?.status === "success") {
                            NotificationManager.success('', 'Transaction successful', 4000);
                            setPlanState(prev => ({...prev, isUpdatingPlan: false,
                            flutterwaveConfig: null}));
                        }
                    } else {
                        NotificationManager.error('', 'Transaction failed', 4000);
                    }
                },
                onClose: () => {
                    setPlanState(prev => ({...prev, isUpdatingPlan: false, flutterwaveConfig: null}));
                }
            });
        }}>Make Payment</button>
    </Fragment>
}

const Summary = ({planState, setPlanState, plan}) => {
    const [isVerifying, setIsVerifying] = useState(false);

    return (
        <div className="summary-box">
            {isVerifying && <div className="cust-table-loader"><ScaleLoader loading={true} color={"#006298"}/></div>} 
            <h5>Summary</h5>

            {/* <div className="summary-divider"/> */}

            <div className="sbox-2">
                <div>
                    <span>Alpha</span>
                    <span>{planState.numOfAgents}
                        Agent{planState.numOfAgents > 1
                            ? 's'
                            : ''}</span>
                </div>
                <div>
                    <span>{`${planState.numOfAgents * plan
                            ?.monthly_amount} ${plan
                                ?.currency || 'NGN'}`}</span>
                </div>
            </div>

            <div className="summary-divider"/>

            <div className="sbox-3">
                <div>
                    <span>Subtotal</span>
                </div>
                <div>
                    <span>{`${planState.numOfAgents * plan
                            ?.monthly_amount} ${plan
                                ?.currency || 'NGN'}`}</span>
                </div>
            </div>

            <div className="sbox-4">
                <label>Coupons</label>
                <div>
                    <input
                        disabled={true}
                        type="text"
                        className="form-control"
                        name="coupoun"
                        placeholder="Enter Coupon Code"/>
                    <button disabled={true}>Apply</button>
                </div>
            </div>

            <div className="summary-divider"/>

            <div className="sbox-5">
                <div>
                    <span>Discount</span>
                    <span>0%</span>
                </div>
                <div>
                    <span>0 {plan
                            ?.currency || 'NGN'}</span>
                </div>
            </div>

            <div className="summary-divider"/>

            <div className="sbox-6">
                <div>
                    <span>Total</span>
                </div>
                <div>
                    <span>{`${planState.numOfAgents * plan
                            ?.monthly_amount} ${plan
                                ?.currency || 'NGN'}`}</span>
                </div>
            </div>

            <div className="sbox-7">
                {/* {!flutterwaveConfig && <button onClick={handleInitiatePayment}>{ !isContinuing ? 'Continue' : <ScaleLoader color={"#ffffff"} height={14} width={2} margin={1} />}</button>} */}
                {planState.flutterwaveConfig && <FlutterWaveAction isVerifying={isVerifying} setIsVerifying={setIsVerifying} config={planState.flutterwaveConfig} setPlanState={setPlanState} />}
            </div>
            <div>
                {planState.stripeConfig && <Elements stripe={loadStripe(planState.stripeConfig?.STRIPE_PUBLIC_KEY)}>
                    <CheckoutForm setIsVerifying={setIsVerifying} setPlanState={setPlanState} />
                </Elements>}
            </div>

        </div>
    )
}

export default Summary;