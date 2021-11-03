import * as cdk from '@aws-cdk/core';
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb';
import { RestApi, ApiKeySourceType, Cors,LambdaIntegration, Resource } from '@aws-cdk/aws-apigateway';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { IFunction, Runtime } from '@aws-cdk/aws-lambda';


export class ServerStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.createApis();
    this.createTable("items");
  }

  createApis(): void {
    const api = new RestApi(this, "reource-api", {
      restApiName: "reource-api",
      apiKeySourceType: ApiKeySourceType.HEADER,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
        statusCode: 200,
      }
    });
  
    const resourceType = api.root.addResource("{resourceType}");
    this.addResourceMethod(resourceType, "GET", 'resource-list');
    this.addResourceMethod(resourceType, "POST", 'resource-post');

    const resource = resourceType.addResource("{resourceId}");
    this.addResourceMethod(resource, "GET", 'resource-get');
    this.addResourceMethod(resource, "PUT", 'resource-put');
    this.addResourceMethod(resource, "DELETE", 'resource-delete');
  }

  addResourceMethod(resource: Resource, method: string, functionName: string): void {
    const nodejsFunction = new NodejsFunction(this, functionName, {
      functionName: functionName,
      runtime: Runtime.NODEJS_14_X,
      timeout: cdk.Duration.seconds(30),
    });
    resource.addMethod(method, new LambdaIntegration(nodejsFunction), {
      apiKeyRequired: true,
    });
  }

  createTable(resourceType: string): void {
    new Table(this, `table-${resourceType}`, {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      tableName: resourceType,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // TODO swtich by stage
    });
  }
}
