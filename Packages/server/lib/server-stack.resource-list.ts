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

  // TOODO
  const params = {
    TableName: resourceType,
    ExpressionAttributeValues: {
      ':s': {N: '2'},
      ':e' : {N: '09'},
      ':topic' : {S: 'PHRASE'}
    },
    ProjectionExpression: 'Episode, Title, Subtitle',
    KeyConditionExpression: 'Season = :s and Episode > :e',
    FilterExpression: 'contains (Subtitle, :topic)',
  };
  
  // const params2 = {
  //   TableName: resourceType,
  //   ExpressionAttributeValues: {
  //     ":topic": {S: "SubTitle2"},
  //     ":s": {N: 1},
  //     ":e": {N: 2},
  //   },
  //   ProjectionExpression: "Season, Episode, Title, Subtitle",
  //   FilterExpression: "Subtitle = :topic AND Season = :s AND Episode = :e",
  // };

  try {
    const response = await db.query(params).promise();
      return { statusCode: 200, body: JSON.stringify(response.Items) };
    } catch (dbError) {
      return { statusCode: 500, body: JSON.stringify(dbError) };
  }
}