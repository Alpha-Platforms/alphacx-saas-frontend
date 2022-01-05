// @ts-nocheck
import {Table} from 'react-bootstrap';
import moment from 'moment';

const PaymentHistory = ({paymentHistory}) => {

    return (
        <div className="paymnt-hist">
            <h5>Payment History</h5>

            <Table responsive="sm" className="pyhist-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Plan</th>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(paymentHistory) && paymentHistory.map(payment => <tr>
                        <td>{moment(payment?.created_at || '').format("DD MMM, YYYY")}</td>
                        <td>Alpha Plan</td>
                        <td>{payment?.no_of_users}</td>
                        <td>{payment?.amount} {payment?.currency}</td>
                        <td>{payment?.status}</td>
                    </tr>) }
                </tbody>
            </Table>
        </div>
    )
}

export default PaymentHistory