/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @Description This script automates the creation of invoices from sales orders. When a sales order 
 *              is created, the script transforms the sales order into an invoice and logs the invoice ID.
 * 
 * Summary:
 * Automating the creation of invoices from sales orders helps businesses save time and reduce manual errors.
 * This SuiteScript listens for the creation of a sales order and automatically creates an invoice from it.
 * The script uses the `record.transform` method to convert the sales order into an invoice, saves the 
 * newly created invoice, and logs its ID for reference.
 */

define(['N/record', 'N/log'], function(record, log) {
    /**
     * Function to be executed after record is submitted.
     *
     * @param {Object} context - The context object containing the new record.
     * @param {Record} context.newRecord - The new sales order record.
     * @param {string} context.type - The trigger type (CREATE/EDIT/DELETE).
     */
    function afterSubmit(context) {
        var salesOrder = context.newRecord;

        // Check if the context type is 'CREATE' to ensure the script runs only when a sales order is created
        if (context.type === context.UserEventType.CREATE) {
            try {
                // Transform the sales order into an invoice
                var invoice = record.transform({
                    fromType: record.Type.SALES_ORDER,
                    fromId: salesOrder.id,
                    toType: record.Type.INVOICE
                });

                // Save the newly created invoice
                var invoiceId = invoice.save();

                // Log the ID of the created invoice for reference
                log.debug('Invoice Created', 'Invoice ID: ' + invoiceId);
            } catch (e) {
                // Log an error message if the invoice creation fails
                log.error('Error Creating Invoice', e.message);
            }
        }
    }

    return {
        afterSubmit: afterSubmit
    };
});
