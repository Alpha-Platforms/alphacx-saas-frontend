import DashboardIcon from '../navigation/icons';
import {connect} from 'react-redux';

const TotalCountCard = ({title, value, icon, color}) => {
    return (
        <div className="tcount-wrapper">
            <div
                className="icon"
                style={{
                backgroundColor: `${color}18`
            }}>
                <DashboardIcon name={"ticket"} color={color}/>
            </div>
            <div className="details">
                <p className="title">{title}</p>
                <p
                    className="value"
                    style={{
                    color: color
                }}>
                    {value}
                </p>
            </div>
        </div>
    )
}

const TicketCount = ({ticketMeta, analytics, newAnalytics}) => {

    return (
        <div className="py-3 pt-4 tcountcard-wrapper">
            {/* <TotalCountCard title="Total Tickets" value={ticketMeta?.totalItems || 0} color={"#662D91"}/> */}
            <TotalCountCard title="Total Tickets" value={newAnalytics?.totalTickets || 0} color={"#662D91"}/>
            <TotalCountCard title="Assigned Tickets" value={analytics?.allTickets?.filter(x => (x.status_id !== "dafcab89-2b7f-4c4f-af76-4a363670d78e" && x.assignee_id)).length} color={"#51B74F"}/>
            <TotalCountCard title="Overdue Tickets" value={newAnalytics?.allStatus?.find((status) => status?.status === 'Overdue')?.__meta__?.ticket_count || 0} color={"#F40D0D"}/>
        </div>
    )
}



const mapStateToProps = (state, ownProps) => ({
    ticketMeta: state.ticket.meta
})

export default connect(mapStateToProps, null)(TicketCount);
