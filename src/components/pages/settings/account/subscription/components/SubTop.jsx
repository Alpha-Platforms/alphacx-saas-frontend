/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
// @ts-nocheck
import dayjs from 'dayjs';
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
                        {subscription?.plan?.name || ''}{' '}
                        {getRealCurrency(tenantInfo?.currency || '')
                            ? `(${getRealCurrency(tenantInfo?.currency || '')})`
                            : ''}
                    </span>
                    {subscription?.subscription?.end_date && (
                        <span className="f-12">
                            Exp: {dayjs(subscription?.subscription?.end_date).format('DD/MM/YYYY')}
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
                            : `${totalUsers?.length} of ${
                                  subscription?.plan?.name === 'Alpha Trial'
                                      ? '∞'
                                      : subscription?.plan?.name === 'Free Plan'
                                      ? '3'
                                      : subscription?.subscription?.no_of_users || 'N/A'
                              } paid users.`}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SubTop;
