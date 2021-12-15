const accessControlList = {
    "Supervisor": ["Personal Information", "Settings Menu", "Team Settings", "Reports", "User Settings", "Account", "Automation Settings", "Role Settings", "Fields Settings", "Ticket Settings", "Livechat Settings", "SMS Integration", "Email Integration", "Notification Management", "Integration Settings", "Facebook Integration", "Whatsapp Integration", "Knowledge Base", "Ratings and Feedback"],
    get Administrator(){ return this.Supervisor},
    "Agent": ["Personal Information", "Settings Menu", "Knowledge Base"]
}

export default accessControlList;