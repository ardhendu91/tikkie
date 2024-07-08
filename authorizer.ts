import { APIGatewayAuthorizerEvent, APIGatewayAuthorizerResult } from 'aws-lambda';

export const handler = async (event: APIGatewayAuthorizerEvent | any): Promise<APIGatewayAuthorizerResult> => {
    const token = event.authorizationToken;
    const methodArn = event.methodArn;
    let eff: 'Allow' | 'Deny' = 'Deny';

    if (token === process.env.authKey) {
        eff = 'Allow';
    }

    switch (eff) {
        case 'Allow':
            return generateAuthResponse('user', 'Allow', methodArn);
        default:
            return generateAuthResponse('user', 'Deny', methodArn);
    }
};

function generateAuthResponse(principalId: string, effect: string, methodArn: string): APIGatewayAuthorizerResult {
    const policyDocument = generatePolicyDocument(effect, methodArn);
    return {
        principalId,
        policyDocument,
    };
}

function generatePolicyDocument(effect: string, methodArn: string): any {
    if (!effect || !methodArn) {
        return null;
    }

    const policyDocument = {
        Version: '2012-10-17',
        Statement: [{
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: methodArn,
        }],
    };

    return policyDocument;
}
