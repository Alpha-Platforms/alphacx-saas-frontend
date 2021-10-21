// @ts-nocheck
import {Table} from 'react-bootstrap';

const PaymentHistory = () => {

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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>May 10, 2020</td>
                        <td>Free</td>
                        <td>15</td>
                        <td>$700</td>
                    </tr>
                    <tr>
                        <td>May 10, 2020</td>
                        <td>Free</td>
                        <td>15</td>
                        <td>$700</td>
                    </tr>
                    <tr>
                        <td>May 10, 2020</td>
                        <td>Free</td>
                        <td>15</td>
                        <td>$700</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default PaymentHistory