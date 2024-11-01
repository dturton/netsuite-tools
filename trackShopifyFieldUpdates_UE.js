/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/record'], function(record) {
    function afterSubmit(context) {
        if (context.type !== context.UserEventType.CREATE && context.type !== context.UserEventType.EDIT) {
            return;
        }
        
        var newRecord = context.newRecord;
        var oldRecord = context.oldRecord;
        
        // List of fields to monitor
        var fieldsToMonitor = ['field1', 'field2', 'field3'];
        
        var shouldUpdateDate = fieldsToMonitor.some(function(fieldId) {
            return newRecord.getValue(fieldId) !== oldRecord.getValue(fieldId);
        });
        
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
