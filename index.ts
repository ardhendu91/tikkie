import dotenv from 'dotenv';
dotenv.config();
import Service from './service';
const service = new Service();

service.expressApp.listen(8001, () => {
    console.log('Server ready at http://localhost:8001/');
});
