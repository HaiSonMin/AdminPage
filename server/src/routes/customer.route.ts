import express from 'express';
import { CustomerController } from '../controllers';
import { CUSTOMER_API } from '../constant';

const router = express.Router();

router
  .route(CUSTOMER_API.FEATURE.CREATE_CUSTOMER)
  .post(CustomerController.createCustomer);

router
  .route(CUSTOMER_API.FEATURE.ADD_VOUCHER)
  .patch(CustomerController.addVoucher);

export default router;
