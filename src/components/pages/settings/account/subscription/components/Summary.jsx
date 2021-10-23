// @ts-nocheck
import Select from 'react-select';

const Summary = ({planState, setPlanState, plan}) => {

    const handleBillingChange = option => {
        console.log('Option => ', option);
        setPlanState(prev => ({...prev, billingCycle: option}))
    }

    return (
        <div className="summary-box">
            <h5>Summary</h5>
            <div className="sbox-1">
                <div>
                    <span>Billing Cycle</span>
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

            <div className="summary-divider"/>

            <div className="sbox-2">
                <div>
                    <span>Alpha</span>
                    <span>{planState.numOfAgents} Agent{planState.numOfAgents > 1 ? 's' : ''}</span>
                </div>
                <div>
                    <span>{`${planState.numOfAgents * plan?.monthly_amount} ${plan?.currency || 'NGN'}`}</span>
                </div>
            </div>

            <div className="summary-divider"/>

            <div className="sbox-3">
                <div><span>Subtotal</span></div>
                <div><span>{`${planState.numOfAgents * plan?.monthly_amount} ${plan?.currency || 'NGN'}`}</span></div>
            </div>

            <div className="sbox-4">
                <label>Coupons</label>
                <div>
                    <input disabled={true} type="text" className="form-control" name="coupoun" placeholder="Enter Coupon Code" />
                    <button disabled={true} >Apply</button>
                </div>
            </div>

            <div className="summary-divider"/>

            <div className="sbox-5">
                <div>
                    <span>Discount</span>
                    <span>0%</span>
                </div>
                <div><span>0 {plan?.currency || 'NGN'}</span></div>
            </div>


            <div className="summary-divider"/>

            <div className="sbox-6">
                <div><span>Total</span></div>
                <div><span>{`${planState.numOfAgents * plan?.monthly_amount} ${plan?.currency || 'NGN'}`}</span></div>
            </div>

            <div className="sbox-7">
                <button>Make Payment</button>
            </div>

        </div>
    )
}

export default Summary;