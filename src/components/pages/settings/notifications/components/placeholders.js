export const allPlaceholders = {
    agentEmailAutoRespond: [
        {
            title: 'Ticket ID',
            placeHolder: 'ticketId',
        },
        {
            title: 'SLA Duration',
            placeHolder: 'slaDuration',
        },
    ],
    statusAutoResponse: [
        {
            title: 'Ticket ID',
            placeHolder: 'ticketId',
        },
        {
            title: 'Customer',
            placeHolder: 'customerName',
        },
        {
            title: 'Status',
            placeHolder: 'status',
        },
        {
            title: 'Agent',
            placeHolder: 'agentName',
        },
        {
            title: 'Subject',
            placeHolder: 'subject',
        },
    ],
    mentionEmailNotification: [
        {
            title: 'Ticket ID',
            placeHolder: 'ticketId',
        },
        {
            title: 'Name',
            placeHolder: 'name',
        },
    ],
    customerInitiateResponse: [
        {
            title: 'Ticket ID',
            placeHolder: 'ticketId',
        },
        {
            title: 'Customer',
            placeHolder: 'customerName',
        },
        {
            title: 'Status',
            placeHolder: 'status',
        },
        {
            title: 'Subject',
            placeHolder: 'subject',
        },
    ],
    ticketStatusClosed: [
        {
            title: 'Ticket ID',
            placeHolder: 'ticketId',
        },
        {
            title: 'Customer',
            placeHolder: 'customerName',
        },
        {
            title: 'Status',
            placeHolder: 'status',
        },
        {
            title: 'Agent',
            placeHolder: 'agentName',
        },
        {
            title: 'Subject',
            placeHolder: 'subject',
        },
    ],
};

export const templateTypes = [
    { value: 'statusAutoResponse', text: 'Status Auto Response' },
    { value: 'ticketStatusClosed', text: 'Ticket Status Closed' },
    { value: 'agentEmailAutoRespond', text: 'Agent Ticket Assignment' },
    { value: 'mentionEmailNotification', text: 'Mention Email Notification' },
    { value: 'customerInitiateResponse', text: 'Customer Initial Response' },
];
