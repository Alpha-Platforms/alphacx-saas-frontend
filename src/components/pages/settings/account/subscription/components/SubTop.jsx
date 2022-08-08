/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
// @ts-nocheck
import dayjs from 'dayjs';
import moment from 'moment';
import { ReactComponent as AccountIdIcon } from '../../../../../../assets/icons/accountid.svg';
import { ReactComponent as OrgNameIcon } from '../../../../../../assets/icons/orgname.svg';
import { ReactComponent as OrgDomainIcon } from '../../../../../../assets/icons/orgdomain.svg';
import { ReactComponent as CurrentPlanIcon } from '../../../../../../assets/icons/currentplan.svg';

export const getRealCurrency = (currency) => {
    switch (currency.toLowerCase()) {
        case 'naira':
        case 'ngn':
            return 'NGN';
        case 'usd':
        case 'dollar':
            return 'USD';
        default:
            return '';
    }
};

export const getRealCurrencyv2 = (currency) => {
    switch (currency.toLowerCase()) {
        case 'naira':
        case 'ngn':
            return '₦';
        case 'usd':
        case 'dollar':
            return '$';
        default:
            return '';
    }
};

function SubTop({ tenantInfo, subscription, totalUsers }) {
    return (
        <div className="subtop">
            <div>
                <div>
                    <OrgNameIcon />
                </div>
                <div>
                    <span>Organisation Name</span>
                    <span className="text-capitalize">{!tenantInfo ? '...' : tenantInfo?.company_name || ''}</span>
                </div>
            </div>

            <div>
                <div>
                    <OrgDomainIcon />
                </div>
                <div>
                    <span>Organisation Domain</span>
                    <span className="text-capitalize">{!tenantInfo ? '...' : tenantInfo?.company_name || ''}</span>
                </div>
            </div>

            <div>
                <div>
                    <CurrentPlanIcon />
                </div>
                <div>
                    <span>Current Plan</span>
                    <span>
                        {`${subscription?.plan?.name} ${
                            getRealCurrency(tenantInfo?.currency || '') === 'NGN'
                                ? getRealCurrency(tenantInfo?.currency || '')
                                : ''
                        }`.trim()}
                    </span>
                    {subscription?.subscription?.end_date && (
                        <span className="f-12">
                            Ends: {dayjs(subscription?.subscription?.end_date).format('MMM DD, YYYY')}
                        </span>
                    )}
                </div>
            </div>

            <div>
                <div>
                    <AccountIdIcon />
                </div>
                <div>
                    <span>No of Users</span>
                    {/* <span>{subscription === null ? '...' : (subscription?.subscription?.no_of_users || 'N/A')}</span> */}
                    <span>
                        {!subscription
                            ? 'N/A'
                            : `${totalUsers} ${
                                  subscription?.plan?.is_trial
                                      ? 'of ∞'
                                      : moment(subscription?.subscription?.end_date).isBefore(new Date())
                                      ? ''
                                      : `of ${subscription?.subscription?.no_of_users || 'N/A'}`
                              }`}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SubTop;
