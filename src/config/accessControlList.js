// @ts-nocheck
const accessControlList = {
    "Supervisor": ["Personal Information", "Settings Menu", "Team Settings", "Reports", "User Settings", "Account", "Automation Settings", "Role Settings", "Fields Settings", "Ticket Settings", "Livechat Settings", "SMS Integration", "Email Integration", "Notification Management", "Integration Settings", "Facebook Integration", "Whatsapp Integration", "Knowledge Base", "Ratings and Feedback", "Email Settings", "Twitter Integration"],
    get Administrator(){ return this.Supervisor},
    "Agent": ["Personal Information", "Settings Menu", "Knowledge Base"],
    "Observer": ["Personal Information", "Settings Menu", "Knowledge Base"]
}

/* 
@Access Control functions
> create_ticket: Can create tickets
> create_customer: Can create customers
> edit_customer: Can edit customers
> edit_ticket: can edit tickets
*/
export const accessControlFunctions = {
    Supervisor: ["create_ticket", "create_customer", "edit_ticket", "edit_customer"],
    get Administrator() { return this.Supervisor},
    Agent: ["create_ticket", "create_customer", "edit_ticket", "edit_customer"],
    Observer: []
}

export default accessControlList;