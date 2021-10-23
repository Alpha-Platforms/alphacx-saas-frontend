// @ts-nocheck
import Select from 'react-select';
import {httpPost} from '../../../../../../helpers/httpMethods';
import AcxLogo from '../../../../../../assets/images/acxsquarelogo.png';
import {useFlutterwave, closePaymentModal} from 'flutterwave-react-v3';
import {Fragment, useState} from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { NotificationManager } from 'react-notifications';

const FlutterWaveAction = ({config, isVerifying, setIsVerifying, setPlanState}) => {

    // use flutterwave react hook
    const handleFlutterPayment = useFlutterwave(config);
    // console.log('From flutterwave action');

    return <Fragment>
        <button onClick={() => {
            handleFlutterPayment({
                callback: async (response) => {
                    console.log('Flutterwave Response => ', response);
                    closePaymentModal() // this will close the modal programmatically

                    if (response?.status === "successful") {
                        setIsVerifying(true);
                        const verifyPaymentRes = await httpPost(`subscriptions/verify-payment`, response);
                        setIsVerifying(false);

                        if (verifyPaymentRes?.status === "success") {
                            NotificationManager.success('', 'Transaction successful', 4000);
                            setPlanState(prev => ({...prev, isUpdatingPlan: false}));
                        }
                    } else {
                        NotificationManager.error('', 'Transaction failed', 4000);
                    }
                },
                onClose: () => {
                    setPlanState(prev => ({...prev, isUpdatingPlan: false}));
                }
            });
        }}>Make Payment</button>
    </Fragment>
}

const Summary = ({planState, setPlanState, plan}) => {
    const [flutterwaveConfig,
        setFlutterwaveConfig] = useState(null);
    const [isContinuing, setIsContinuing] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    console.log('Flutterwave config => ', flutterwaveConfig);

    const handleBillingChange = option => {
        console.log('Option => ', option);
        setPlanState(prev => ({
            ...prev,
            billingCycle: option
        }));
    }

    const handleInitiatePayment = async() => {
        console.log('Attempting to initiate payment')

        // body data to initiate payment
        const initPaymentBody = {
            tenantId: window
                .localStorage
                .getItem('tenantId'),
            subscriptionCategory: planState.billingCycle
                ?.value === 'yearly_amount'
                    ? 'yearly'
                    : 'amount',
            subscriptionTypeId: plan
                ?.id,
            numOfUsers: planState
                ?.numOfAgents
        }

        setIsContinuing(true);

        const initPaymentRes = await httpPost(`subscriptions/initialize-payment`, initPaymentBody);

        setIsContinuing(false);

        if (initPaymentRes
            ?.status === "success") {

            // get current user from localStorage
            const currentUser = JSON.parse(window.localStorage.getItem('user'));
            const config = {
                public_key: initPaymentRes
                    ?.data
                        ?.FLW_PUBLIC_KEY,
                tx_ref: initPaymentRes
                    ?.data
                        ?.reference,
                amount: planState.billingCycle
                    ?.value === 'yearly_amount'
                        ? planState.numOfAgents * plan
                            ?.yearly_amount
                            : planState.numOfAgents * plan
                                ?.monthly_amount,
                currency: plan
                    ?.currency || 'NGN',
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

            setFlutterwaveConfig(config);

            // eslint-disable-next-line react-hooks/rules-of-hooks

        }

    }

    return (
        <div className="summary-box">
            {isVerifying && <div className="cust-table-loader"><ScaleLoader loading={true} color={"#006298"}/></div>} 
            <h5>Summary</h5>
            <div className="sbox-1">
                <div>
                    <span>Billing Cycle</span>
                </div>
                <div>
                    <Select
                        name="plan"
                        className="billing-time-select"
                        value={planState.billingCycle}
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

            <div className="summary-divider"/>

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
                {!flutterwaveConfig && <button onClick={handleInitiatePayment}>{ !isContinuing ? 'Continue' : <ScaleLoader color={"#ffffff"} height={14} width={2} margin={1} />}</button>}
                {flutterwaveConfig && <FlutterWaveAction isVerifying={isVerifying} setIsVerifying={setIsVerifying} config={flutterwaveConfig} setPlanState={setPlanState} />}
            </div>

        </div>
    )
}

export default Summary;