import { expect as expectCDK, matchTemplate, MatchStyle, SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Server from '../lib/server-stack';

test('Confirm snapshot', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Server.ServerStack(app, 'TestStack');
  // THEN
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});
