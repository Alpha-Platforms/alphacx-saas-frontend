// @ts-nocheck
import Select from 'react-select';

const Summary = () => {

    const handlePlanChange = () => {}

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
                        options={[
                        {
                            value: 'billing-monthly',
                            label: 'Billing Monthly'
                        }, {
                            value: 'billing-yearly',
                            label: 'Billing Yearly'
                        }
                    ]}
                        onChange={handlePlanChange}/>
                </div>
            </div>

            <div className="summary-divider"/>

            <div className="sbox-2">
                <div>
                    <span>Alpha</span>
                    <span>5 Agents</span>
                </div>
                <div>
                    <span>200 USD</span>
                </div>
            </div>

            <div className="summary-divider"/>

            <div className="sbox-3">
                <div><span>Subtotal</span></div>
                <div><span>200 USD</span></div>
            </div>

            <div className="sbox-4">
                <label>Coupons</label>
                <div>
                    <input type="text" name="coupoun" placeholder="Enter Coupon Code" />
                    <button>Apply</button>
                </div>
            </div>

            <div className="summary-divider"/>

            <div className="sbox-5">
                <div>
                    <span>Discount</span>
                    <span>0%</span>
                </div>
                <div><span>0 USD</span></div>
            </div>


            <div className="summary-divider"/>

            <div className="sbox-6">
                <div><span>Total</span></div>
                <div><span>200 USD</span></div>
            </div>

            <div className="sbox-7">
                <button>Update Subscription</button>
            </div>

        </div>
    )
}

export default Summary;