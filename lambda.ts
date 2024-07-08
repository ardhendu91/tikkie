import * as awsServerlessExpress from 'aws-serverless-express';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import Service from './service';  // Assuming './service' is your TypeScript service class

const service = new Service();
const server = awsServerlessExpress.createServer(service.expressApp);

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  // Handle the request using aws-serverless-express
  const proxyResult : any = await awsServerlessExpress.proxy(server, event, context);

  // Check if proxyResult.statusCode is defined, if not provide a default value
  const statusCode = proxyResult.statusCode || 200;

  // Construct the APIGatewayProxyResult object
  const apiGatewayResponse: APIGatewayProxyResult = {
    statusCode: statusCode,
    body: proxyResult.body,
    headers: proxyResult.headers,
    // Add other properties as required by APIGatewayProxyResult
  };

  return apiGatewayResponse;
};
