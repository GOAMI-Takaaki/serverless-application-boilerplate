import * as cdk from '@aws-cdk/core';
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb';

export class ServerStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.createTable("items");
  }

  createTable(resourceType: string): void {
    new Table(this, `${resourceType}`, {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      tableName: resourceType,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // TODO swtich by stage
    });
  }
}
