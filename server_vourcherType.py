try:
    
    journal_type=frappe.db.get_all('Journal Entry',filters={"voucher_type":"Journal Entry"}, fields=["company","posting_date"])
    if journal_type:
        frappe.response['message']=journal_type
    else:
        frappe.msgprint("No journal type fetched")
except Exception as e:
    frappe.log_error(f"Hard to retrieve Voucher Type {e}")
    

    