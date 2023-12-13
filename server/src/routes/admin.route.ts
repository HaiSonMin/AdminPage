import express from 'express';
import { AdminController } from '../controllers';
import { checkAuthIsAdmin } from '../middleware/auth.middleware';
import { ADMIN_API } from '../constant';

const router = express.Router();

router.use(checkAuthIsAdmin);

router
  .route(ADMIN_API.FEATURE.CREATE_EMPLOYEE)
  .post(AdminController.createEmployee);

export default router;
