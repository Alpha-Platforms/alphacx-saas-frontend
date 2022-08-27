/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { httpGet } from '../../../helpers/httpMethods';
import { TickeCircle } from '../../../assets/images/svgs';
import './AppsumoPlans.scss';
import { brandKit } from '../../../helper';
import FormCheckIcon from '../../../assets/icons/form-check.svg';
import { css } from '@emotion/css';

function AppsumoPlans({ currentPlan }) {
    const [plans, setPlans] = useState([{ name: '' }]);
    const [productUrl, setProductUrl] = useState('');
    const tenantId = localStorage.getItem('tenantId');

    useEffect(() => {
        async function getAllPlans() {
            const res = await httpGet(`subscriptions/plans/${tenantId}`);
            if (res?.status === 'success') {
                const filterAndSorted = res.data
                    .filter((item) => item.plan_type === 'appsumo')
                    .sort((a, b) => {
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) return -1;
                        return 0;
                    });
                // console.log(filterAndSorted);
                setPlans(filterAndSorted);
            }
        }

        async function getAppsumoCustomerUuid() {
            const res = await httpGet(`appsumo/customer/${tenantId}`);
            if (res?.status === 'success') {
                setProductUrl(res.data.invoice_item_uuid);
            }
        }

        getAllPlans();
        getAppsumoCustomerUuid();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const freePlanFeatures = [
        'All above-listed features',
        'All deal terms',
        ['3 agent seats', '10 agent seats', 'unlimited'],
    ];

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
            <div className="row mt-4  mx-5 flex justify-content-center gap-3">
                <div className="border col-5 p-0 rounded-3">
                    <p className="fw-bold p-3 border-bottom rounded-top-04 bg-light text-dark">Feature Included</p>
                    <ul className="appsumo__card--features list-unstyled p-3">
                        {FeaturesIncluded.map((item, idx) => (
                            <li key={idx} className="mb-2">
                                <span>
                                    <img
                                        src={FormCheckIcon}
                                        style={{ marginRight: '4px', marginBottom: '3px' }}
                                        alt="check icon"
                                    />
                                </span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="border col-5 p-0 rounded-3">
                    <p className="fw-bold p-3 border-bottom rounded-top-04 bg-light text-dark">Deal Terms</p>
                    <ul className="appsumo__card--features list-unstyled p-3">
                        {dealTerms.map((item, idx) => (
                            <li key={idx} className="mb-2">
                                <span>
                                    <img
                                        src={FormCheckIcon}
                                        style={{ marginRight: '4px', marginBottom: '3px' }}
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
                    return (
                        <div
                            className={`appsumo__card ${index !== 1 ? 'bg-transparent border' : ''} ${css({
                                ...brandKit({ bgCol: 0 }),
                                color: index === 1 ? 'white' : '',
                            })}`}
                            key={index}
                        >
                            <div className="text-center">
                                <h5>{plan.name}</h5>
                                <h5 className="fw-bold">${plan.yearly_amount} </h5>
                                <p>(One Time Purchase)</p>
                            </div>
                            <ul className="appsumo__card--features mt-4">
                                {freePlanFeatures.map((item, idx) => {
                                    return (
                                        <li key={idx}>
                                            <span>
                                                <TickeCircle color={index % 2 === 0 ? '#3d3d3d' : '#ffffff'} />
                                            </span>
                                            <span>{idx === 2 ? item[index] : item}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                            <a
                                href={`https://appsumo.com/account/redemption/${productUrl}`}
                                target="_blank"
                                className={`appsumo__card--cta btn ${index === 1 ? 'border-white' : ''} ${plan.name === currentPlan ? 'disabled' : ''} ${css(
                                    {
                                        ...brandKit({ bgCol: 0 }),
                                        color: 'white',
                                    },
                                )}
                                `}
                                type="button"
                                rel="noreferrer"
                            >
                                {plan.name === currentPlan ? 'Current Plan' : 'Select Plan'}
                            </a>
                        </div>
                    );
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
