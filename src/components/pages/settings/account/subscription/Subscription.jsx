/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-useless-fragment */
// @ts-nocheck
import { Fragment, useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import { connect, useDispatch } from 'react-redux';
import MoonLoader from 'react-spinners/MoonLoader';
import moment from 'moment';
import { Modal } from 'react-responsive-modal';
import { css } from '@emotion/css';
import SubTop, { getRealCurrencyv2 } from './components/SubTop';
import CurrentPlan from './components/CurrentPlan';
import Summary from './components/Summary';
import BillingDetails from './components/BillingDetails';
import './Subscription.scss';
import PaymentHistory from './components/PaymentHistory';
import PaymentForm from './components/PaymentForm';
import { httpGet, httpPatch } from '../../../../../helpers/httpMethods';
import { ReactComponent as TickIcon } from '../../../../../assets/icons/tick.svg';
import { separateNum, uuid, brandKit } from '../../../../../helper';
import { getAgents } from '../../../../../reduxstore/actions/agentActions';
import { getAdmins } from '../../../../../reduxstore/actions/adminActions';
import { getSupervisors } from '../../../../../reduxstore/actions/supervisorActions';
import { getObservers } from '../../../../../reduxstore/actions/observerActions';
import { getSubscription } from '../../../../../reduxstore/actions/subscriptionAction';

function Subscription({ subscription }) {
    const [tenantId] = useState(window.localStorage.getItem('tenantId'));
    const [domain] = useState(window.localStorage.getItem('domain'));
    const [tenantInfo, setTenantInfo] = useState(null);
    const [plans, setPlans] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [isPlanSelectionYearly, setIsPlanSelectionMonthly] = useState(false);

    const [planState, setPlanState] = useState({
        numOfAgents: 0,
        billingCycle: { label: 'Billing Monthly', value: 'monthly_amount' },
        selectedPlan: { name: '', id: '' },
        isUpdatingPlan: false,
        flutterwaveConfig: null,
        paystackConfig: null,
        stripeConfig: null,
        loading: false,
        amount: null,
        selectingPlan: false,
        isVerifying: false,
        actionType: 'renew-plan',
    });

    const dispatch = useDispatch();

    const totalUsers = subscription?.subscription?.totalUsers;

    useEffect(() => {
        setPlanState((prev) => ({
            ...prev,
            numOfAgents: totalUsers,
            selectingPlan: !(subscription?.plan?.is_free || subscription?.plan?.is_trial),
            selectedPlan: subscription?.plan,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getPlan = async () => {
        const res = await httpGet(`subscriptions/plans/${tenantId}`);
        if (res?.status === 'success') {
            setPlans(res?.data);
        } else {
            setPlans({});
        }
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
        if (subExpired && !subscription?.plan?.is_free) {
            // user is not in trial or alpha plan

            // const res = await httpPatch(`subscriptions/free-plan`, { tenantId: window.localStorage.getItem('tenantId'), planId: subscription?.plan?.id || "" });

            const res = await httpPatch(`subscriptions/free-plan`, {
                tenantId: window.localStorage.getItem('tenantId'),
                planId: Array.isArray(plans) ? plans.find((x) => x?.is_free)?.id : '',
            });

            if (res?.status === 'success') {
                dispatch(
                    getSubscription(null, () => {
                        window.location.href = `/settings/account?tab=subscription`;
                    }),
                );
                return NotificationManager.success('', 'Successful', 4000);
            }
        }
    };

    return (
        <>
            {(planState.loading || planState.isVerifying) && (
                <div className="cust-table-loader">
                    <MoonLoader loading color={brandKit({ bgCol: 0 })?.backgroundColor} size={30} />
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
                                                    (planState.flutterwaveConfig ||
                                                        planState.paystackConfig ||
                                                        planState.stripeConfig) && (
                                                        <div>
                                                            <Summary
                                                                planState={planState}
                                                                setPlanState={setPlanState}
                                                                tenantInfo={tenantInfo}
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
                                            <div className="duration-toggle-wrapper">
                                                <div>
                                                    <span>Montly</span>
                                                    <div className="custom-toggle-wrapper d-inline-block">
                                                        <input
                                                            type="checkbox"
                                                            className={`${css({
                                                                '&:checked + label': { ...brandKit({ bgCol: 0 }) },
                                                            })}`}
                                                            id="switch"
                                                            onChange={() => setIsPlanSelectionMonthly((prev) => !prev)}
                                                            checked={isPlanSelectionYearly}
                                                        />
                                                        <label htmlFor="switch">Toggle</label>
                                                    </div>
                                                    <span>
                                                        Annual <span>25% off</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="plan-selection-body">
                                                {plans
                                                    ?.filter((item) => item?.plan_type === 'main' && !item?.is_trial)
                                                    .map((item) => (
                                                        <div
                                                            key={uuid()}
                                                            className={`${css({
                                                                borderColor: brandKit({ bgCol: 0 })?.backgroundColor,
                                                            })} ${item?.is_free ? 'free-plan' : 'alpha-plan'} ${
                                                                !(subExpired && !subscription?.plan?.is_free) &&
                                                                item?.is_free
                                                                    ? 'free-plan-disabled'
                                                                    : ''
                                                            }`}
                                                        >
                                                            <div>
                                                                <p>{item?.name}</p>
                                                                {item?.is_free ? (
                                                                    <h3>Free</h3>
                                                                ) : (
                                                                    <h3>
                                                                        {getRealCurrencyv2(item?.currency)}
                                                                        {separateNum(
                                                                            isPlanSelectionYearly
                                                                                ? item?.yearly_amount
                                                                                : item?.monthly_amount,
                                                                        )}{' '}
                                                                        <small className="fs-6">
                                                                            / user /{' '}
                                                                            {isPlanSelectionYearly ? 'year' : 'month'}
                                                                        </small>
                                                                    </h3>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <ul className="features-list">
                                                                    <li>
                                                                        <span>
                                                                            <TickIcon
                                                                                stroke={
                                                                                    brandKit({ bgCol: 0 })
                                                                                        ?.backgroundColor
                                                                                }
                                                                            />
                                                                        </span>{' '}
                                                                        <span>Conversational Inbox</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>
                                                                            <TickIcon
                                                                                stroke={
                                                                                    brandKit({ bgCol: 0 })
                                                                                        ?.backgroundColor
                                                                                }
                                                                            />
                                                                        </span>{' '}
                                                                        <span>Embeddable Livechat Widget</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>
                                                                            <TickIcon
                                                                                stroke={
                                                                                    brandKit({ bgCol: 0 })
                                                                                        ?.backgroundColor
                                                                                }
                                                                            />
                                                                        </span>{' '}
                                                                        <span>Facebook Integration</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>
                                                                            <TickIcon
                                                                                stroke={
                                                                                    brandKit({ bgCol: 0 })
                                                                                        ?.backgroundColor
                                                                                }
                                                                            />
                                                                        </span>{' '}
                                                                        <span>WhatsApp Integration</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>
                                                                            <TickIcon
                                                                                stroke={
                                                                                    brandKit({ bgCol: 0 })
                                                                                        ?.backgroundColor
                                                                                }
                                                                            />
                                                                        </span>{' '}
                                                                        <span>Automation & Escalation</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>
                                                                            <TickIcon
                                                                                stroke={
                                                                                    brandKit({ bgCol: 0 })
                                                                                        ?.backgroundColor
                                                                                }
                                                                            />
                                                                        </span>{' '}
                                                                        <span>Knowledge Base System</span>
                                                                    </li>
                                                                </ul>
                                                                <div>
                                                                    {item?.is_free ? (
                                                                        <button
                                                                            type="button"
                                                                            className={`btn px-4 border reset-btn-outline ${css(
                                                                                {
                                                                                    '&:hover': {
                                                                                        backgroundColor: `${
                                                                                            brandKit({ bgCol: 30 })
                                                                                                ?.backgroundColor
                                                                                        } !important`,
                                                                                        color: 'white',
                                                                                    },
                                                                                },
                                                                            )}`}
                                                                            disabled={
                                                                                !(
                                                                                    subExpired &&
                                                                                    !subscription?.plan?.is_free
                                                                                ) && item?.is_free
                                                                            }
                                                                            onClick={() => setOpenModal(true)}
                                                                        >
                                                                            Activate
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            type="button"
                                                                            className={`btn px-4 ${css({
                                                                                ...brandKit({ bgCol: 0 }),
                                                                                color: 'white',
                                                                                '&:hover': {
                                                                                    ...brandKit({ bgCol: 30 }),
                                                                                    color: 'white',
                                                                                },
                                                                            })}`}
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
                                        </div>
                                    )}
                                    <Modal open={openModal} onClose={() => setOpenModal(false)} center>
                                        <div className="p-5 w-100">
                                            <h6 className="mb-4">Are you sure you want to activate the free plan?</h6>
                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="button"
                                                    className="btn f-12 bg-outline-custom cancel px-4"
                                                    onClick={() => setOpenModal(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn ms-2 f-12 bg-custom px-4"
                                                    onClick={() => handleActivateFreePlan()}
                                                >
                                                    Confirm
                                                </button>
                                            </div>
                                        </div>
                                    </Modal>
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
                    <MoonLoader loading color={brandKit({ bgCol: 0 })?.backgroundColor} size={30} />
                </div>
            )}
        </>
    );
}

const mapStateToProps = (state) => ({
    subscription: state?.subscription?.subscription,
});

export default connect(mapStateToProps, { getSupervisors, getAdmins, getAgents, getObservers })(Subscription);
