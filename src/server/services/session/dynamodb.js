import AWS from 'aws-sdk';
import { DYNAMO_LIVE, DYNAMO_SESSION_TABLE } from '../../../config/server';

if (!DYNAMO_LIVE) {
  AWS.config.update({
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy',
    region: 'eu-west-2',
    endpoint: 'http://localhost:8000',
  });
}

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const getState = async sessionId => {
  try {
    const param = {
      Key: { sessionId },
      TableName: DYNAMO_SESSION_TABLE,
      ConsistentRead: true,
    };
    const item = await dynamodb.get(param).promise();
    const { state } = item.Item || {};
    if (!state) return null;
    return JSON.parse(state);
  } catch (err) {
    return null;
  }
};

export const saveState = async (sessionId, state) => {
  // Expire record in 24 hours.
  const expire = Math.floor(Date.now() / 1000) + 86400;
  try {
    await dynamodb.put({
      TableName: DYNAMO_SESSION_TABLE,
      ReturnValues: 'NONE',
      ReturnConsumedCapacity: 'NONE',
      ReturnItemCollectionMetrics: 'NONE',
      Item: {
        sessionId,
        state: JSON.stringify(state),
        expire,
      },
    }).promise();
  } catch (e) {
    throw e;
  }
};
