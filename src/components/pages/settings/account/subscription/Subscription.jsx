// @ts-nocheck
import {Fragment} from 'react';
import SubTop from './components/SubTop';
import CurrentPlan from './components/CurrentPlan';
import Summary from './components/Summary';
import BillingDetails from './components/BillingDetails';
import './Subscription.scss'
import PaymentHistory from './components/PaymentHistory';
import PaymentForm from './components/PaymentForm';

const Subscription = () => {

    return (
        <div>
            <div className="d-flex justify-content-between col-md-8 mb-4">
                <h3 className="fs-6 text-black">Subscription Details</h3>
            </div>

            <div>
                <SubTop/>
            </div>

            {false
                ? <Fragment>
                        <div>
                            <p className="current-plan-text">
                                <small>Your current plan</small>
                            </p>

                            <div className="payment-sect-2">
                                <div><CurrentPlan/></div>
                                <div><Summary/></div>
                                <div><BillingDetails/></div>
                            </div>
                        </div>
                        <div><PaymentHistory/></div>
                    </Fragment>
                : <Fragment>
                    <PaymentForm/>
                </Fragment>}

        </div>
    )
}

export default Subscription;