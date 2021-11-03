import {DynamoDB} from 'aws-sdk';
import {APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';

const db = new DynamoDB.DocumentClient();

export async function handler (
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> {
  const resourceType = event.pathParameters?.resourceType;
  const resourceId = event.pathParameters?.resourceId;
  if (!resourceType||!resourceId) {
    return {
      statusCode: 400,
      body: `Error: You are missing the path parameter resource type or id`,
    };
  }
  
  const params = {
    TableName: resourceType,
    Item: {
        id: resourceId,
      },
  };
  
  try {
    await db.put(params).promise();
      return { statusCode: 200, body: JSON.stringify(params.Item) };
    } catch (dbError) {
      return { statusCode: 500, body: JSON.stringify(dbError) };
  }
}