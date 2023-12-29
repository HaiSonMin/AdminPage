import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';

import express from 'express';

// Security
import helmet from 'helmet';
import cors from 'cors';

// Extension
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';

const app = express();
import notFoundMid from './middleware/notfound.middleware';
import errorHandlerMid from './middleware/errorhandler.middleware';
import routerApi from './routes';
import './db/initDB';
// import loggingReq from './middleware/logging.middleware';

app.set('trust proxy', 1);
app.use(
  cors({
    origin: [`${process.env.URL_CLIENT}`, 'http://localhost:5001'],
    credentials: true,
    // origin: `${process.env.URL_CLIENT}`,
  })
);

app.use(helmet());
app.use(compression());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//API Service
// app.use(loggingReq);
app.use('/', routerApi);
app.use(errorHandlerMid);
app.use('/**', notFoundMid);
export default app;
