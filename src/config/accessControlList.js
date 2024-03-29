// @ts-nocheck
const accessControlList = {
    Supervisor: [
        'Personal Information',
        'Settings Menu',
        'Team Settings',
        'Reports',
        'User Settings',
        'Account',
        'Automation Settings',
        'Role Settings',
        'Fields Settings',
        'Ticket Settings',
        'Livechat Settings',
        'SMS Integration',
        'Email Integration',
        'Notification Management',
        'Integration Settings',
        'Facebook Integration',
        'Whatsapp Integration',
        'Knowledge Base',
        'Ratings and Feedback',
        'Email Settings',
        'Twitter Integration',
        'Tenant Accounts',
        'Customer Search',
        'Customer Details',
    ],
    get Administrator() {
        return this.Supervisor;
    },
    Agent: ['Personal Information', 'Settings Menu', 'Knowledge Base', 'Customer Search', 'Customer Details'],
    Observer: ['Personal Information', 'Settings Menu', 'Knowledge Base'],
};

/* 
@Access Control functions
> create_ticket: Can create tickets
> create_customer: Can create customers
> edit_customer: Can edit customers
> edit_ticket: Can edit tickets
> reply_conv: Can reply in conversation
> comment_conv: Can comment in conversation 
> delete_ticket: Can delete tickets
*/
export const accessControlFunctions = {
    Supervisor: [
        'create_ticket',
        'create_customer',
        'edit_ticket',
        'edit_customer',
        'edit_ticket',
        'reply_conv',
        'comment_conv',
        'delete_ticket',
    ],
    get Administrator() {
        return this.Supervisor;
    },
    Agent: [
        'create_ticket',
        'create_customer',
        'edit_ticket',
        'edit_customer',
        'edit_ticket',
        'reply_conv',
        'comment_conv',
        'delete_ticket',
    ],
    Observer: ['comment_conv'],
};

export default accessControlList;
