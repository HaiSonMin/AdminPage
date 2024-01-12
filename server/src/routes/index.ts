import {
  WEB_API,
  AUTH_API,
  VOUCHER_API,
  CUSTOMER_API,
  EMPLOYEE_API,
  SCRIPT_API,
} from '../constant';

import express from 'express';
const router = express.Router();

import { router as authRouter } from './auth.route';
import { router as customerRouter } from './customer.route';
import { router as employeeRouter } from './employee.route';
import { router as voucherRouter } from './voucher.route';
import { router as webRouter } from './web.route';
import { router as scriptRouter } from './scripts';

router.use(WEB_API.ROOT, webRouter);
router.use(AUTH_API.ROOT, authRouter);
router.use(SCRIPT_API.ROOT, scriptRouter);
router.use(VOUCHER_API.ROOT, voucherRouter);
router.use(EMPLOYEE_API.ROOT, employeeRouter);
router.use(CUSTOMER_API.ROOT, customerRouter);

export default router;
