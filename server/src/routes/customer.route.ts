import express from 'express';
import { CustomerController } from '../controllers';
import { CUSTOMER_API } from '../constant';
import { checkAuth } from '../middleware/auth.middleware';

const router = express.Router();

router.route('').post(CustomerController.createCustomer);
router.use(checkAuth);
router.route('/search').get(CustomerController.searchCustomers);
router.route('').get(CustomerController.getAllCustomers);
router.route('/:id').get(CustomerController.getCustomer);
router.route('/:id').patch(CustomerController.updateCustomer);

router
  .route(CUSTOMER_API.FEATURE.ADD_VOUCHER)
  .patch(CustomerController.addVoucher);

export default router;
