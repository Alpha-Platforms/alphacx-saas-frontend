// @ts-nocheck
import {ReactComponent as AccountIdIcon} from '../../../../../../assets/icons/accountid.svg';
import {ReactComponent as OrgNameIcon} from '../../../../../../assets/icons/orgname.svg';
import {ReactComponent as OrgDomainIcon} from '../../../../../../assets/icons/orgdomain.svg';
import {ReactComponent as CurrentPlanIcon} from '../../../../../../assets/icons/currentplan.svg';

export const getRealCurrency = currency => {
    switch (currency.toLowerCase()) {
        case "naira":
        case "ngn":
            return "NGN";
        case "usd":
        case "dollar":
            return "USD"
        default:
            return ""
    }
}
const SubTop = ({plan, tenantInfo, subscription, totalUsers}) => {


    return (
        <div className="subtop">
            <div>
                <div><OrgNameIcon/></div>
                <div>
                    <span>Organisation Name</span>
                    <span>{!tenantInfo ? '...' : (tenantInfo?.company_name || '')}</span>
                </div>
            </div>

            <div>
                <div><OrgDomainIcon/></div>
                <div>
                    <span>Organisation Domain</span>
                    <span>{!tenantInfo ? '...' : (tenantInfo?.company_name || '')}</span>
                </div>
            </div>

            <div>
                <div><CurrentPlanIcon/></div>
                <div>
                    <span>Current Plan</span>
                    <span>{subscription?.plan?.name || ""} {getRealCurrency((tenantInfo?.currency || "")) ? `(${getRealCurrency((tenantInfo?.currency || ""))})` : ""}</span>
                </div>
            </div>

            <div>
                <div><AccountIdIcon/></div>
                <div>
                    <span>No of Users</span>
                    {/* <span>{subscription === null ? '...' : (subscription?.subscription?.no_of_users || 'N/A')}</span> */}
                    <span>{subscription === null ? '...' : `${totalUsers?.length} of ${(subscription?.plan?.name === "Alpha Trial" ? "∞" : subscription?.plan?.name === "Free Plan" ? "3" : subscription?.subscription?.no_of_users || 'N/A')}`}</span>
                </div>
            </div>

        </div>
    );
}

export default SubTop;