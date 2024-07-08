import { Request } from 'express';

class personService {
    static async trial(req: Request): Promise<string | Error> {
        try {
            const message = `Hello! Welcome to the trial!`;
            console.log('Message:', message);
            return message;
        } catch (err) {
            console.error('Some error occurred', err);
            throw err;
        }
    }
}

export default personService;
