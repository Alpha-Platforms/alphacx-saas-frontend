// @ts-nocheck
import VisaLogo from '../../../../../../assets/images/visa.png';
import MasterCardLogo from '../../../../../../assets/images/mastercard.png';

const BillingDetails = () => {

    return (
        <div className="billing-details">
            <h5>Billing Details</h5>

            <div className="card-box">
                <div><img src={VisaLogo} alt=""/></div>
                <div>
                    <div>
                        <span>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                        </span>
                        <span>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                        </span>
                        <span>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                        </span>
                        <span>1648</span>
                    </div>
                    <div>
                        <span>Visa Debit</span>
                        <span>Expires 12/23</span>
                    </div>
                </div>
            </div>

            <div className="card-box">
                <div><img src={MasterCardLogo} alt=""/></div>
                <div>
                    <div>
                        <span>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                        </span>
                        <span>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                        </span>
                        <span>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                            <span className="cardpin-ball"/>
                        </span>
                        <span>1648</span>
                    </div>
                    <div>
                        <span>Mastercard Debit</span>
                        <span>Expires 12/23</span>
                    </div>
                </div>
            </div>

            <div className="billing-address">
                <h6>Billing Address</h6>
                <p>12 Ozumba Mbadiwe Street, Victoria Island, Lagos</p>
            </div>

        </div>
    )
}

export default BillingDetails;