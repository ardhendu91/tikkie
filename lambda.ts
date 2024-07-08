import * as awsServerlessExpress from 'aws-serverless-express';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import Service from './service'; 

const service = new Service();
const server = awsServerlessExpress.createServer(service.expressApp);

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const proxyResult : any = await awsServerlessExpress.proxy(server, event, context);

  const statusCode = proxyResult.statusCode || 200;

  const apiGatewayResponse: APIGatewayProxyResult = {
    statusCode: statusCode,
    body: proxyResult.body,
    headers: proxyResult.headers,
  };

  return apiGatewayResponse;
};
