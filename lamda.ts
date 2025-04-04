import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import awsServerlessExpress from 'aws-serverless-express';
import Service from './service';

const service = new Service();
const server = awsServerlessExpress.createServer(service.expressApp);

export const handler = async (event: APIGatewayProxyEvent | any, context: Context): Promise<APIGatewayProxyResult | any> => {
  return awsServerlessExpress.proxy(server, event, context);
};
