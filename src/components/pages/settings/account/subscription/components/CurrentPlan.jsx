// @ts-nocheck
// import Select from "react-select";

const CurrentPlan = ({plan, planState, setPlanState}) => {
    const handlePlanChange = option => {
        console.log('plan was changed');
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

    return (
        <div className="currentplan-box">
            <div className="cp-top">
                <div>
                    <div>
                        <label>Plan</label>
                        {/* <Select
                            name="plan"
                            className="cptop-plan"
                            options={[
                                {value: 'free', label: 'Free'},
                                {value: 'alpha', label: 'Alpha'},
                                {value: 'enterprise', label: 'Enterprise'}
                                ]}
                            onChange={handlePlanChange}/> */}
                        <input type="text" className="form-control" value={plan?.name || ''} defaultValue={plan?.name || ''} disabled={true} name="agentsNo"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="numOfAgents">Agents</label>
                    <div><input type="number" className="form-control" value={planState.numOfAgents} name="numOfAgents" id="numOfAgents" min={0} onChange={e => setPlanState(prev => ({...prev, numOfAgents: e.target.value }))} disabled={planState.isUpdatingPlan} /></div>
                </div>
                <div>
                    <span>{`${planState.numOfAgents * plan?.monthly_amount} ${plan?.currency || 'NGN'} / month`}</span>
                </div>
            </div>
            <p>
                <small>{plan?.monthly_amount} {plan?.currency || 'NGN'} per agent / month</small>
            </p>

            <div className="updateplan-btn-wrapper">
                <button onClick={handleUpdatePlanBtn} type="button">Update Plan</button>
                {planState.isUpdatingPlan && <button onClick={() => setPlanState(prev => ({...prev, isUpdatingPlan: false}))} type="button">Cancel</button>}
            </div>

        </div>
    )
}

export default CurrentPlan;