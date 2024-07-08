import { Request, Response as ExpressResponse, NextFunction } from 'express';
import personService from './personService';
import Response from '../../common/response';

class personController {
    static async trial(req: Request, res: ExpressResponse, next: NextFunction): Promise<void> {
        try {
            const result = await personService.trial(req);
            Response.create("ServerData").setData(result).send(res);
        } catch (err) {
            console.error('Some error occurred!', err);
            next(err); // Pass the error to the next error handler middleware
        }
    }
}

export default personController;
