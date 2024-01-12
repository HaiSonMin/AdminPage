import express from 'express';
const router = express.Router();

import { router as scriptRouter } from './script.route';
import { router as mailRouter } from './mail';
import { router as facebookRouter } from './facebook';

router.use('/', scriptRouter);
router.use('/mail', mailRouter);
router.use('/facebook', facebookRouter);

export { router };
