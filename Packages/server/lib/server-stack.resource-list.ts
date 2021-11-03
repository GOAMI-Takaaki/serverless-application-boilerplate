import {DynamoDB} from 'aws-sdk';
import {APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';

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
      };
  
    try {
      const response = await db.query(params).promise();
        return { statusCode: 200, body: JSON.stringify(response.Items) };
      } catch (dbError) {
        return { statusCode: 500, body: JSON.stringify(dbError) };
    }
}