import express from 'express';
import { VoucherController } from '../controllers';
import { checkAuth } from '../middleware/auth.middleware';

const router = express.Router();

router.use(checkAuth);

router.route('').post(VoucherController.createVoucher);
router.route('').get(VoucherController.getAllVouchers);
router.route('/:id').patch(VoucherController.updateVoucher);
router.route('/:id').delete(VoucherController.deleteVoucher);

export default router;
