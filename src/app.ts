import 'express-async-errors';
import express, {Router} from 'express';
import { routes } from './routes';
import { errorInterceptor } from './errors/errorInterceptor';

const app = express();
app.use(express.json());
app.use(routes);
app.use(errorInterceptor);

export{app};