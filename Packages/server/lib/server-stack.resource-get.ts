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
    Key: {
        id: resourceId,
      },
  };
  
  try {
    const response = await db.get(params).promise();
      return { statusCode: 200, body: JSON.stringify(response.Item) };
    } catch (dbError) {
      return { statusCode: 500, body: JSON.stringify(dbError) };
  }
}