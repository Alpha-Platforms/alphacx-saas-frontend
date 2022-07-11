/* eslint-disable react/no-array-index-key */
import React from 'react';
import { TickeCircle } from '../../../assets/images/svgs';
import './AppsumoPlans.scss';

function AppsumoPlans() {
    const freePlanFeatures = ['3 Users', 'Live Chat', 'Facebook Messenger', 'Instagram DM', '1000 Contact Limit'];
    const alphaPlanFeatures = [
        'Whatsapp Messaging',
        'Facebook Messenger',
        'Instagram Messaging',
        'Email-to-ticket',
        'Knowledge Base',
        'Customer Feedback',
        'Automation',
        'Auto Ticket Distribution',
    ];
    const enterprisePlanFeatures = [
        'Everything in Alpha Plan',
        'Unlimited Users',
        'Unlimited Contacts',
        'API Integration',
        'Team Structure',
        'AD/LDAP Integration',
        'Custom Email Signature',
        'Customer Portal',
        'Brand Theme',
        'Private Hosted Option',
        'Dedicated Account Manager',
    ];
    return (
        <div className="appsumo-plans-page">
            <div className="appsumo__section--one">
                <h1>All-in-one Subscription Plan</h1>
                <p>
                    Get started with our all-in-one standard Alpha subscription; and an enterprise plan for
                    organisations with specific needs.
                </p>
            </div>
            <div className="appsumo__section--two">
                <div className="appsumo__card--free appsumo__card">
                    <h4>Free</h4>
                    <h2>NGN 0</h2>
                    <p>Forever free</p>
                    <button className="appsumo__card--cta btn" type="button">
                        Start Free Trial
                    </button>
                    <ul className="appsumo__card--features">
                        {freePlanFeatures.map((item, idx) => (
                            <li key={idx}>
                                <span>
                                    <TickeCircle color="#004882" />
                                </span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="appsumo__card--alpha appsumo__card">
                    <h4>Alpha Plan</h4>
                    <h2>$15</h2>
                    <p>Per Agent/Month - Billed Annually</p>
                    <button className="appsumo__card--cta btn" type="button">
                        Start Free Trial
                    </button>
                    <ul className="appsumo__card--features">
                        {alphaPlanFeatures.map((item, idx) => (
                            <li key={idx}>
                                <span>
                                    <TickeCircle color="#C20C38" />
                                </span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="appsumo__card--enterprise appsumo__card">
                    <h4>Enterprise Plan</h4>
                    <h2>Customisation</h2>
                    <p>Build the right plan </p>
                    <button className="appsumo__card--cta btn" type="button">
                        Contact Us
                    </button>
                    <ul className="appsumo__card--features">
                        {enterprisePlanFeatures.map((item, idx) => (
                            <li key={idx}>
                                <span>
                                    <TickeCircle color="#ffffff" />
                                </span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AppsumoPlans;
