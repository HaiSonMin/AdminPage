import express from 'express';
import { EmployeeController } from '../controllers';
import { checkAuth, checkAuthIsAdmin } from '../middleware/auth.middleware';

const router = express.Router();

router.use(checkAuth);

router.use(checkAuthIsAdmin);

router.route(`/search`).get(EmployeeController.searchEmployees);

router.route(`/:id`).get(EmployeeController.getEmployee);

router.route(``).get(EmployeeController.getAllEmployees);

router.route(``).post(EmployeeController.createEmployee);

router.route(`/:id`).patch(EmployeeController.updateEmployee);

router.route(`/:id`).delete(EmployeeController.deleteEmployee);

export default router;
