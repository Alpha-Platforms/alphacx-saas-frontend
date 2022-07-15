/* eslint-disable react/no-array-index-key */
import { httpGet, httpPost } from 'helpers/httpMethods';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TickeCircle } from '../../../assets/images/svgs';
import './AppsumoPlans.scss';
import CheckCircle from '../../../assets/icons/CheckCircle.svg';

function AppsumoPlans({ currentPlan }) {
    const [plans, setPlans] = useState([{ name: '' }]);
    const [productUrl, setProductUrl] = useState('');
    const tenantId = localStorage.getItem('tenantId');

    useEffect(() => {
        async function getAllPlans() {
            const res = await httpGet(`subscriptions/plans/${tenantId}`);
            if (res?.status === 'success') {
                setPlans(res.data);
            }
        }

        async function getAppsumoCustomerUuid() {
            const res = await httpPost(`appsumo/customer/${tenantId}`);
            if (res?.status === 'success') {
                setProductUrl(res.data.invoice_item_uuid);
            }
        }

        getAllPlans();
        getAppsumoCustomerUuid();
    }, []);

    const freePlanFeatures = ['All above-listed features', 'All deal terms', '3 agent seats'];

    const dealTerms = [
        'Lifetime access to AlphaCX',
        'All future Alpha Plan updates',
        'No codes, no stacking—just choose the plan thats right for you',
        'You must activate your license within 60 days of purchase',
        'Ability to upgrade or downgrade between 3 license tiers',
        'GDPR compliant',
        'Only for new AlphaCX users who do not have existing accounts',
        '60-day money-back guarantee, no matter the reason',
    ];

    const FeaturesIncluded = [
        'Unlimited clients',
        'Unlimited WhatsApp Messaging (powered by Twilio)',
        'Unlimited Facebook Messenger',
        'Unlimited Instagram Messaging',
        'Unlimited email-to-ticket',
        'Unlimited Contacts',
        'Knowledge Base',
        'Ratings & Feedback',
        'SLA Automation',
        'Auto Ticket Distributuon',
        'Report Export',
        'API Integration',
        'Team Structure',
    ];

    return (
        <div className="appsumo-plans-page mt-5">
            <div className="row mt-4  mx-3 flex justify-content-center">
                <div className="col-5 bg-light rounded p-4 me-3">
                    <p className="fw-bold ">Feature Included</p>
                    <ul className="appsumo__card--features list-unstyled">
                        {FeaturesIncluded.map((item, idx) => (
                            <li key={idx} className="mb-2">
                                <span>
                                    <img
                                        src={CheckCircle}
                                        style={{ width: '14px', marginBottom: '3px' }}
                                        alt="check icon"
                                    />
                                </span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-5 bg-light rounded p-4">
                    <p className="fw-bold ">Deal Terms</p>
                    <ul className="appsumo__card--features list-unstyled">
                        {dealTerms.map((item, idx) => (
                            <li key={idx} className="mb-2">
                                <span>
                                    <img
                                        src={CheckCircle}
                                        style={{ width: '14px', marginBottom: '3px' }}
                                        alt="check icon"
                                    />
                                </span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="appsumo__section--two">
                {plans.map((plan, index) => {
                    if (plan.plan_type === 'appsumo') {
                        return (
                            <div className="appsumo__card" key={index}>
                                <div className="text-center">
                                    <h5>{plan.name}</h5>
                                    <h5 className="fw-bold">${plan.yearly_amount} </h5>
                                    <p>(One Time Purchase)</p>
                                </div>
                                <ul className="appsumo__card--features mt-4">
                                    {freePlanFeatures.map((item, idx) => (
                                        <li key={idx}>
                                            <span>
                                                <TickeCircle color={index % 2 === 0 ? '#004882' : '#ffffff'} />
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href={`https://appsumo.com/account/redemption/${productUrl}`}
                                    target="_blank"
                                    className={`appsumo__card--cta btn ${plan.name === currentPlan ? 'disabled' : ''} `}
                                    type="button"
                                    rel="noreferrer"
                                >
                                    {plan.name === currentPlan ? 'Current Plan' : 'Select Plan'}
                                </a>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currentPlan: state.subscription.subscription.plan.name,
    };
};
export default connect(mapStateToProps)(AppsumoPlans);
