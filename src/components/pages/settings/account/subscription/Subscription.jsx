/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-useless-fragment */
// @ts-nocheck
import { Fragment, useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import MoonLoader from 'react-spinners/MoonLoader';
import moment from 'moment';
import SubTop, { getRealCurrency } from './components/SubTop';
import CurrentPlan from './components/CurrentPlan';
import Summary from './components/Summary';
import BillingDetails from './components/BillingDetails';
import './Subscription.scss';
import PaymentHistory from './components/PaymentHistory';
import PaymentForm from './components/PaymentForm';
import { httpGet, httpPatch } from '../../../../../helpers/httpMethods';
import { ReactComponent as TickIcon } from '../../../../../assets/icons/tick.svg';

import { separateNum } from '../../../../../helper';
import { getAgents } from '../../../../../reduxstore/actions/agentActions';
import { getAdmins } from '../../../../../reduxstore/actions/adminActions';
import { getSupervisors } from '../../../../../reduxstore/actions/supervisorActions';

function Subscription({ getAgents, getAdmins, getSupervisors, agents, admins, supervisors, isUserAuthenticated }) {
    const [tenantId] = useState(window.localStorage.getItem('tenantId'));
    const [domain] = useState(window.localStorage.getItem('domain'));
    const [tenantInfo, setTenantInfo] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [plans, setPlans] = useState(null);
    const [totalUsers, setTotalUsers] = useState(null);

    const [planState, setPlanState] = useState({
        numOfAgents: 0,
        billingCycle: { label: 'Billing Monthly', value: 'monthly_amount' },
        selectedPlan: { name: '', id: '' },
        isUpdatingPlan: false,
        flutterwaveConfig: null,
        stripeConfig: null,
        loading: false,
        amount: null,
        selectingPlan: false,
        isVerifying: false,
        actionType: 'renew-plan',
    });

    useEffect(() => {
        if (isUserAuthenticated) {
            // get the first set of users
            // getPaginatedUsers(50, 1);
            getAgents();
            getSupervisors();
            getAdmins();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserAuthenticated]);

    useEffect(() => {
        const realAdmins = Array.isArray(admins) ? admins.filter((item) => item?.isActivated === true) : [];
        const realSupervisors = Array.isArray(supervisors)
            ? supervisors.filter((item) => item?.isActivated === true)
            : [];
        const realAgents = Array.isArray(agents) ? agents.filter((item) => item?.isActivated === true) : [];
        const allUsers = [...realAdmins, ...realSupervisors, ...realAgents];
        setTotalUsers(allUsers);
        setPlanState((prev) => ({ ...prev, numOfAgents: allUsers.length }));
    }, [admins, supervisors, agents]);

    const getPlan = async () => {
        const res = await httpGet(`subscriptions/plans/${tenantId}`);
        if (res?.status === 'success') {
            setPlans(res?.data);
        } else {
            setPlans({});
        }
    };

    const getSubscription = async ({ reload } = { reload: false }) => {
        const res = await httpGet(`subscriptions/${tenantId}`);
        if (res?.status === 'success') {
            setSubscription(res?.data);

            window.localStorage.setItem('tenantSubscription', JSON.stringify(res?.data));
        } else {
            setSubscription({});
        }
        if (reload) window.location.href = `/settings/account?tab=subscription`;
    };

    const getTenantInfo = async () => {
        const res = await httpGet(`auth/tenant-info/${domain}`);
        if (res?.status === 'success') {
            setTenantInfo(res?.data);
        } else {
            setTenantInfo({});
        }
    };

    useEffect(() => {
        getPlan();
        getTenantInfo();
        getSubscription();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (subscription) {
            setPlanState((prev) => ({
                ...prev,
                billingCycle:
                    subscription?.subscription?.interval === 'yearly'
                        ? { label: 'Billing Year', value: 'monthly_amount' }
                        : { label: 'Billing Monthly', value: 'monthly_amount' },
            }));
        }
    }, [subscription]);

    const subExpired = moment(subscription?.subscription?.end_date).isBefore(new Date());

    // eslint-disable-next-line consistent-return
    const handleActivateFreePlan = async () => {
        if (!(subExpired && subscription?.plan?.name !== 'Free Plan')) {
            // user is not in trial or alpha plan

            // const res = await httpPatch(`subscriptions/free-plan`, { tenantId: window.localStorage.getItem('tenantId'), planId: subscription?.plan?.id || "" });

            const res = await httpPatch(`subscriptions/free-plan`, {
                tenantId: window.localStorage.getItem('tenantId'),
                planId: Array.isArray(plans) ? plans.find((x) => x?.name === 'Free Plan')?.id : '',
            });

            if (res?.status === 'success') {
                window.location.href = `/settings/account?tab=subscription`;
                return NotificationManager.success('', 'Successful', 4000);
            }
        }
    };

    return (
        <>
            {(planState.loading || planState.isVerifying) && (
                <div className="cust-table-loader">
                    <MoonLoader loading color="#006298" size={30} />
                </div>
            )}
            {subscription?.plan && tenantInfo ? (
                <div>
                    <div className="d-flex justify-content-between col-md-8 mb-4">
                        <h3 className="fs-6 text-black">Subscription Details</h3>
                    </div>

                    <div>
                        <SubTop tenantInfo={tenantInfo} subscription={subscription} totalUsers={totalUsers} />
                    </div>

                    {true ? (
                        <>
                            {Object.keys(subscription?.plan).length !== 0 && (
                                <>
                                    {planState.selectingPlan ? (
                                        <div>
                                            <p className="current-plan-text">
                                                <small>
                                                    Plan selected: Alpha Plan &nbsp;{' '}
                                                    <button
                                                        type="button"
                                                        className="btn"
                                                        onClick={() =>
                                                            setPlanState((prev) => ({ ...prev, selectingPlan: false }))
                                                        }
                                                    >
                                                        ✖
                                                    </button>
                                                </small>
                                            </p>

                                            <div className="payment-sect-2">
                                                <div>
                                                    <CurrentPlan
                                                        planState={planState}
                                                        tenantInfo={tenantInfo}
                                                        setPlanState={setPlanState}
                                                        subscription={subscription}
                                                        totalUsers={totalUsers}
                                                    />
                                                </div>
                                                {planState.isUpdatingPlan &&
                                                    (planState.flutterwaveConfig || planState.stripeConfig) && (
                                                        <div>
                                                            <Summary
                                                                planState={planState}
                                                                setPlanState={setPlanState}
                                                                tenantInfo={tenantInfo}
                                                                totalUsers={totalUsers}
                                                                getSubscription={getSubscription}
                                                            />
                                                        </div>
                                                    )}
                                                {false && (
                                                    <div>
                                                        <BillingDetails />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="plan-selection">
                                            {plans?.map((item) => (
                                                <div
                                                    className={`${
                                                        item?.name === 'Free Plan' ? 'free-plan' : 'alpha-plan'
                                                    } ${
                                                        !(subExpired && subscription?.plan?.name !== 'Free Plan') &&
                                                        item?.name === 'Free Plan'
                                                            ? 'free-plan-disabled'
                                                            : ''
                                                    }`}
                                                >
                                                    <div>
                                                        <p>{item?.name}</p>
                                                        {item?.name === 'Free Plan' ? (
                                                            <h3>Free</h3>
                                                        ) : (
                                                            <h3>
                                                                {getRealCurrency(item?.currency) === 'NGN' ? '₦' : '$'}
                                                                {separateNum(item?.monthly_amount)}{' '}
                                                                <small className="fs-6">/ user / month</small>
                                                            </h3>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <ul className="features-list">
                                                            <li>
                                                                <span>
                                                                    <TickIcon />
                                                                </span>{' '}
                                                                <span>Conversational Inbox</span>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <TickIcon />
                                                                </span>{' '}
                                                                <span>Embeddable Livechat Widget</span>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <TickIcon />
                                                                </span>{' '}
                                                                <span>Facebook Integration</span>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <TickIcon />
                                                                </span>{' '}
                                                                <span>WhatsApp Integration</span>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <TickIcon />
                                                                </span>{' '}
                                                                <span>Automation & Escalation</span>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <TickIcon />
                                                                </span>{' '}
                                                                <span>Knowledge Base System</span>
                                                            </li>
                                                        </ul>
                                                        <div>
                                                            {item?.name === 'Free Plan' ? (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-primary"
                                                                    disabled={
                                                                        !(
                                                                            subExpired &&
                                                                            subscription?.plan?.name !== 'Free Plan'
                                                                        ) && item?.name === 'Free Plan'
                                                                    }
                                                                    onClick={() => handleActivateFreePlan()}
                                                                >
                                                                    Activate
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    className="btn bg-at-blue-light"
                                                                    style={{ color: 'white' }}
                                                                    onClick={() =>
                                                                        setPlanState((prev) => ({
                                                                            ...prev,
                                                                            selectingPlan: true,
                                                                            selectedPlan: item,
                                                                        }))
                                                                    }
                                                                >
                                                                    Select Plan
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div>
                                        <PaymentHistory tenantId={tenantId} />
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <PaymentForm />
                    )}
                </div>
            ) : (
                <div className="cust-table-loader">
                    <MoonLoader loading color="#006298" size={30} />
                </div>
            )}
        </>
    );
}

const mapStateToProps = (state) => ({
    isUsersLoaded: state.user.isUsersLoaded,
    agents: state.agent.agents,
    admins: state.admin.admins,
    supervisors: state.supervisor.supervisors,
    isAgentsLoaded: state.agent.isAgentsLoaded,
    isAdminsLoaded: state.admin.isAdminsLoaded,
    isSupervisorLoaded: state.supervisor.isSupervisorsLoaded,
    isUserAuthenticated: state.userAuth.isUserAuthenticated,
});

export default connect(mapStateToProps, { getSupervisors, getAdmins, getAgents })(Subscription);
