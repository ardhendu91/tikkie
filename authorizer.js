"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const token = event.authorizationToken;
    const methodArn = event.methodArn;
    let eff = 'Deny';
    if (token === process.env.authKey) {
        eff = 'Allow';
    }
    switch (eff) {
        case 'Allow':
            return generateAuthResponse('user', 'Allow', methodArn);
        default:
            return generateAuthResponse('user', 'Deny', methodArn);
    }
});
exports.handler = handler;
function generateAuthResponse(principalId, effect, methodArn) {
    const policyDocument = generatePolicyDocument(effect, methodArn);
    return {
        principalId,
        policyDocument,
    };
}
function generatePolicyDocument(effect, methodArn) {
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
