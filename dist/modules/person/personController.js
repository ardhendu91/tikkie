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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const personService_1 = __importDefault(require("./personService"));
const response_1 = __importDefault(require("../../common/response"));
class personController {
    static trial(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield personService_1.default.trial(req);
                response_1.default.create("ServerData").setData(result).send(res);
                // res.status(200).send( 
                //     result
                //     )
            }
            catch (err) {
                console.error('Some error occurred!', err);
                next(err); // Pass the error to the next error handler middleware
            }
        });
    }
}
exports.default = personController;
