import express, { Application } from 'express';
import cors from 'cors';

import { routes } from './routes';
import { loggerMiddleware } from './middlewares/logger';
import { requestNotFound404 } from './middlewares/404Request';
import { handleErrors } from './middlewares/handleErrors';

export const app: Application = express();

const corsOption = {
  optionsSuccessStatus: 200 
};
app.use(cors(corsOption));
app.use(express.json());
app.use(loggerMiddleware);
routes(app);
app.use(requestNotFound404);
app.use(handleErrors);