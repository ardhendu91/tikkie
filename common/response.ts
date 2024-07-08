import cls from 'express-http-context';
import { Response as ExpressResponse } from 'express';

class Response {
    requestId: string | undefined;
    message: string;
    data: any;

    constructor(msg: string) {
        this.requestId = cls.get('requestId');
        this.message = msg;
    }

    static create(msg: string): Response {
        return new Response(msg);
    }

    setData(data: any): this {
        this.data = data;
        return this;
    }

    send(res: ExpressResponse, status?: number): void {
        res.status(status || 200).json(this);
    }
}

export default Response;