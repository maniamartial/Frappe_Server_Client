frappe.ui.form.on('Journal Entry', {
    refresh: function (frm) {
        // Check if the "entry_type" field is present on the form
        if (frm.doc.docstatus === 0) {
            // Add the "Media" button below the "entry_type" field

            frappe.call({
                method: "voucher_type_journal",
                callback: function (response) {
                    if (response.message) {

                        const single_journal = response.message;
                        const all_journal_entry = [];

                        single_journal.forEach(function (journal) {
                            all_journal_entry.push({
                                company: journal.company, // Use correct field names
                                posting_date: journal.posting_date // Use correct field names
                            });

                        });

                        // Add a custom button
                        frm.add_custom_button(__("Related Journals"), function () {
                            // Create a modal dialog
                            var dialog = new frappe.ui.Dialog({
                                title: __('Other Related Journals'),
                                fields: [
                                    {
                                        label: 'Journals',
                                        fieldtype: 'Table',
                                        fields: [
                                            {
                                                label: 'Company',
                                                fieldname: 'company',
                                                fieldtype: 'Data',
                                                in_list_view: 1
                                            },
                                            {
                                                label: 'Posting Date',
                                                fieldname: 'posting_date',
                                                fieldtype: 'Date',
                                                in_list_view: 1
                                            }
                                        ],
                                        data: all_journal_entry
                                    }
                                ]
                            });

                            // Show the modal dialog
                            dialog.show();
                        })
                    } 
                }
            })

        }
    }
});
  