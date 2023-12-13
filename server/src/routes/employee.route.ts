import express from 'express';
import { EmployeeController } from '../controllers';
import { checkAuth } from '../middleware/auth.middleware';
import { EMPLOYEE_API } from '../constant';

const router = express.Router();

router.use(checkAuth);

router
  .route(EMPLOYEE_API.FEATURE.GET_ALL_CUSTOMER)
  .get(EmployeeController.getAllCustomers);

router
  .route(EMPLOYEE_API.FEATURE.SEARCH_CUSTOMER)
  .get(EmployeeController.searchCustomers);

export default router;
