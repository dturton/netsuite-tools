/**
 * @NApiVersion 2.x
 * @NScriptType WorkflowActionScript
 * @NModuleScope public
 */

import { EntryPoints } from 'N/types';
import * as record from 'N/record';
import * as log from 'N/log';
import * as https from 'N/https';

/**
 * A workflow action script to post a webhook about the event.
 */

const postWebhook = (url: string, data: object) => {
  const response = https.post({
    url: url,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  log.debug({
    title: 'WEBHOOK RESPONSE',
    details: response.body
  });
};

export const onAction: EntryPoints.WorkflowAction.onAction = (
  context: EntryPoints.WorkflowAction.onActionContext
) => {
  const currentRecord = context.newRecord;
  const recordId = currentRecord.id;
  const recordType = currentRecord.type;
  const eventDate = new Date().toISOString();

  // Define the webhook URL
  const webhookUrl = 'https://example.com/webhook-endpoint';

  // Prepare the data to be sent to the webhook
  const webhookData = {
    event: 'Order Created',
    recordId: recordId,
    recordType: recordType,
    eventDate: eventDate
  };

  // Post the webhook
  postWebhook(webhookUrl, webhookData);

  log.debug({
    title: 'WEBHOOK POSTED',
    details: `Record ID: ${recordId}, Record Type: ${recordType}`
  });

  return true;
};
