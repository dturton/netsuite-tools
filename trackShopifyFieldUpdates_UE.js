/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * 
 * Description:
 * This script updates a custom date field, 'custrecord_last_product_info_updated', on an item record whenever specified fields are changed. It is triggered during the 'afterSubmit' event of record creation or editing.
 * 
 * Purpose:
 * To maintain an accurate timestamp of when critical product information was last updated, facilitating efficient data synchronization with external systems.
 *
 * Modules Required:
 * - N/record: Used to interact with NetSuite records and perform updates.
 *
 * Trigger:
 * - After Submit: Executes after a record is created or edited.
 *
 * Fields Monitored:
 * - field1
 * - field2
 * - field3
 *
 * Logic:
 * 1. The script checks if the current operation is a record creation or edit.
 * 2. It compares the new and old values of specified fields.
 * 3. If any monitored field has changed, it updates the 'custrecord_last_product_info_updated' field with the current date and time.
 */
define(['N/record'], function(record) {
    function afterSubmit(context) {
        // Exit if not a create or edit operation
        if (context.type !== context.UserEventType.CREATE && context.type !== context.UserEventType.EDIT) {
            return;
        }
        
        var newRecord = context.newRecord;
        var oldRecord = context.oldRecord;
        
        // List of fields to monitor for changes
        var fieldsToMonitor = ['field1', 'field2', 'field3'];
        
        // Check if any monitored field has changed
        var shouldUpdateDate = fieldsToMonitor.some(function(fieldId) {
            return newRecord.getValue(fieldId) !== oldRecord.getValue(fieldId);
        });
        
        // Update the custom date field if changes are detected
        if (shouldUpdateDate) {
            record.submitFields({
                type: newRecord.type,
                id: newRecord.id,
                values: {
                    custrecord_last_product_info_updated: new Date()
                }
            });
        }
    }
    
    return {
        afterSubmit: afterSubmit
    };
});
