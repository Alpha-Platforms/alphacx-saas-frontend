// @ts-nocheck
import Select from "react-select";

const CurrentPlan = () => {
    const handlePlanChange = option => {
        console.log('plan was changed');
    }

    /*
    plan options
    > free
    > Alpha
    > Enterprise
     */

    return (
        <div className="currentplan-box">
            <div className="cp-top">
                <div>
                    <div>
                        <label>Plan</label>
                        <Select
                            name="plan"
                            className="cptop-plan"
                            options={[
                                {value: 'free', label: 'Free'},
                                {value: 'alpha', label: 'Alpha'},
                                {value: 'enterprise', label: 'Enterprise'}
                                ]}
                            onChange={handlePlanChange}/>
                    </div>
                </div>
                <div>
                    <label>Agents</label>
                    <div><input type="number" name="agentsNo"/></div>
                </div>
                <div>
                    <span>200 USD / month</span>
                </div>
            </div>
            <p><small>50 USD per agent / month</small></p>

            <div className="updateplan-btn-wrapper">
                <button type="button">Update Plan</button>
            </div>

        </div>
    )
}

export default CurrentPlan;