// @ts-nocheck
import {ReactComponent as AccountIdIcon} from '../../../../../../assets/icons/accountid.svg';
import {ReactComponent as OrgNameIcon} from '../../../../../../assets/icons/orgname.svg';
import {ReactComponent as OrgDomainIcon} from '../../../../../../assets/icons/orgdomain.svg';
import {ReactComponent as CurrentPlanIcon} from '../../../../../../assets/icons/currentplan.svg';

const SubTop = ({plan}) => {

    return (
        <div className="subtop">
            <div>
                <div><AccountIdIcon/></div>
                <div>
                    <span>Account ID</span>
                    <span>01375933</span>
                </div>
            </div>

            <div>
                <div><OrgNameIcon/></div>
                <div>
                    <span>Organisation Name</span>
                    <span>Gillete Group International</span>
                </div>
            </div>

            <div>
                <div><OrgDomainIcon/></div>
                <div>
                    <span>Organisation Domain</span>
                    <span>gilletegroup.alphacx.co</span>
                </div>
            </div>

            <div>
                <div><CurrentPlanIcon/></div>
                <div>
                    <span>Current Plan</span>
                    <span>{plan?.name || ''} ({plan?.currency || "" })</span>
                </div>
            </div>

        </div>
    );
}

export default SubTop;