import dotenv from 'dotenv';
import 'express-async-errors';

import express from 'express';

// Security
import helmet from 'helmet';
import cors from 'cors';
import { env } from 'process';

// Extension
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
import './db/initDB';
import routerApi from './routes';
import notFoundMid from './middleware/notfound.middleware';
import errorHandlerMid from './middleware/errorhandler.middleware';

app.set('trust proxy', 1);
app.use(
  cors({
    credentials: true,
    optionsSuccessStatus: 200,
    origin: [
      `${env.URL_CLIENT}`,
      'http://localhost:3006',
      'https://rungcayhailoc.bacsinguyentuananh.com',
      'https://www.rungcayhailoc.bacsinguyentuananh.com',
      'https://rungcayhailoc.nikolaxflem.com',
      'https://www.rungcayhailoc.nikolaxflem.com',
      'https://bma.nikolaxflem.com',
      'https://www.bma.nikolaxflem.com',
      'https://bma.sicnew.com',
      'https://www.bma.sicnew.com',
    ],
  })
);

app.use(helmet());
app.use(compression());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/', routerApi);
app.use(errorHandlerMid);
app.use('/**', notFoundMid);
export default app;
