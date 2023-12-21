import express from 'express';
const router = express.Router();
import authRouter from './auth.route';
import customerRouter from './customer.route';
import employeeRouter from './employee.route';
import voucherRouter from './voucher.route';
import webRouter from './web.route';
import {
  WEB_API,
  AUTH_API,
  VOUCHER_API,
  CUSTOMER_API,
  EMPLOYEE_API,
} from '../constant';

router.use(AUTH_API.ROOT, authRouter);
router.use(WEB_API.ROOT, webRouter);
router.use(VOUCHER_API.ROOT, voucherRouter);
router.use(EMPLOYEE_API.ROOT, employeeRouter);
router.use(CUSTOMER_API.ROOT, customerRouter);

export default router;
