// @ts-nocheck
import Select from "react-select";
import {getRealCurrency} from './SubTop';

const CurrentPlan = ({plan, planState, tenantInfo, setPlanState}) => {

    const handlePlanChange = option => {
        console.log('Selected option => ', option);
        setPlanState(prev => ({
            ...prev,
            selectedPlan: option
        }));
    }

    /*
    plan options
    > free
    > Alpha
    > Enterprise
     */

    const handleUpdatePlanBtn = () => {
        if (planState.numOfAgents <= 0) {
            window.document.getElementById('numOfAgents')?.focus();
            return;
        };
        setPlanState(prev => ({...prev, isUpdatingPlan: true}))
    }

    const handleBillingChange = option => {
        setPlanState(prev => ({
            ...prev,
            billingCycle: option
        }));
    }

    return (
        <div className="currentplan-box">
            <div className="cp-top">
                <div>
                    <div>
                        <label>Plan</label>
                        <Select
                            name="plan"
                            className="cptop-plan"
                            value={planState?.selectedPlan}
                            options={[
                                {value: 'Alpha Plan', label: 'Alpha Plan'},
                                ]}
                            onChange={handlePlanChange}/>
                    </div>
                </div>

                <div className="sbox-1">
                    <div>
                        <label>Billing Cycle</label>
                    </div>
                    <div>
                        <Select
                            name="plan"
                            className="billing-time-select"
                            value={planState.billingCycle}
                            options={[
                            {
                                value: 'monthly_amount',
                                label: 'Billing Monthly'
                            }, {
                                value: 'yearly_amount',
                                label: 'Billing Yearly'
                            }
                        ]}
                            onChange={handleBillingChange}/>
                    </div>
                </div>
                
                
            </div>

            <p>
                {plan?.monthly_amount || '1000'} {getRealCurrency(tenantInfo?.currency || '')} per agent / month
            </p>

            <div className="agent-count-select">
                <div>
                    <label htmlFor="numOfAgents">Agents</label>
                    <div><input type="number" className="form-control" value={planState.numOfAgents} name="numOfAgents" id="numOfAgents" min={0} onChange={e => setPlanState(prev => ({...prev, numOfAgents: e.target.value }))} disabled={planState.isUpdatingPlan} /></div>
                </div>
                <div>
                    <span>{`${planState.numOfAgents * (plan?.monthly_amount || 1000)} ${plan?.currency || 'NGN'} / month`}</span>
                </div>
            </div>
            
            <div className="updateplan-btn-wrapper">
                <button onClick={handleUpdatePlanBtn} type="button">Update Plan</button>
                {planState.isUpdatingPlan && <button onClick={() => setPlanState(prev => ({...prev, isUpdatingPlan: false}))} type="button">Cancel</button>}
            </div>

        </div>
    )
}

export default CurrentPlan;