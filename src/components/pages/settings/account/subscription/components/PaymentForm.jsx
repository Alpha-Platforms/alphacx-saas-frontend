// @ts-nocheck
import {ReactComponent as BankIcon} from '../../../../../../assets/icons/bankbuilding.svg';
import {ReactComponent as CardIcon} from '../../../../../../assets/icons/creditcard.svg';

const PaymentForm = () => {

    return (
        <div className="payment-form">
            <div className="mt-3 paymnt-detl">
                <h5>Payment Details</h5>
                <div className="mb-3">
                    <label for="p-fullname" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="p-fullname"/>
                </div>
                <div className="mb-3">
                    <label for="p-bill-add" className="form-label">Billing Address</label>
                    <input type="text" className="form-control" id="p-bill-add"/>
                </div>
            </div>

            <div className="paymnt-mthd">
                <h5>Payment Method</h5>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="card-paymnt"
                        id="card-paymnt"/>
                    <label className="form-check-label" htmlFor="card-paymnt">
                        <form autoComplete="off">
                            <h6><span><CardIcon /></span> Debit / Credit Card</h6>

                            <div className="mb-3">
                                <label for="p-card-no" className="form-label">Card Number</label>
                                <input type="text" className="form-control" required autoComplete="off" id="p-card-no"/>
                            </div>
                            <div className="mb-3">
                                <label for="p-card-name" className="form-label">Card Name</label>
                                <input type="text" className="form-control" required autoComplete="off" id="p-card-name"/>
                            </div>

                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label for="p-exp-date" className="form-label">Expiration Date</label>
                                    <input type="text" className="form-control" autoComplete="off" required id="p-exp-date"/>
                                </div>
                                <div className="mb-3 col-6">
                                    <label for="p-cvv" className="form-label">CVV</label>
                                    <input type="text" className="form-control" autoComplete="off" required id="p-cvv"/>
                                </div>
                            </div>

                            <div className="card-paymnt-btn">
                                <button type="submit" className="btn bg-at-blue-light">Confirm Payment</button>
                                <button type="button" className="btn btn-outline">Cancel</button>
                            </div>

                        </form>
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="bank-transfer"
                        id="bank-transfer"/>
                    <label className="form-check-label" htmlFor="bank-transfer">
                        <div>
                            <h6><span><BankIcon/></span> Bank Transfer</h6>

                        </div>
                    </label>
                </div>

            </div>

        </div>
    )
}

export default PaymentForm;