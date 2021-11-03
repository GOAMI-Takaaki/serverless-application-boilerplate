import {DynamoDB} from 'aws-sdk';
import {APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import { randomUUID } from 'crypto';

const db = new DynamoDB.DocumentClient();

export async function handler (
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> {
    const resourceType = event.pathParameters?.resourceType;
      if (!resourceType) {
        return {
          statusCode: 400,
          body: `Error: You are missing the path parameter resource type`,
        };
      }
  
    const params = {
      TableName: resourceType,
      Item: {
          id: randomUUID(),
        },
    };
  
    try {
      await db.put(params).promise();
        return { statusCode: 200, body: JSON.stringify(params.Item) };
      } catch (dbError) {
        return { statusCode: 500, body: JSON.stringify(dbError) };
    }
}