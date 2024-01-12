import express from 'express';
import { CustomerController } from '@/controllers';
import { CUSTOMER_API } from '@/constant';
import { checkApiKey, checkAuth } from '@/middleware/auth.middleware';

const router = express.Router();

router.route('').post(checkApiKey, CustomerController.createCustomer);
router
  .route('/by-phone')
  .patch(checkApiKey, CustomerController.updateCustomerByPhone);

router.use(checkAuth);
router.route('/search').get(CustomerController.searchCustomers);
router.route('').get(CustomerController.getAllCustomers);
router.route('/:id').get(CustomerController.getCustomer);

// -------- Update --------
router.route('/:id').patch(CustomerController.updateCustomer);
router
  .route(CUSTOMER_API.FEATURE.ADD_VOUCHER)
  .patch(CustomerController.addVoucher);

router.route('/by-phone').delete(CustomerController.deleteCustomer);

export { router };
