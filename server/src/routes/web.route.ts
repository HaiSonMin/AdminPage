import express from 'express';
import { WebController } from '../controllers';
import { checkAuth } from '../middleware/auth.middleware';

const router = express.Router();

router.use(checkAuth);
router.route('').post(WebController.createWeb);
router.route('').get(WebController.getAllWebs);
router.route('/search').get(WebController.searchWebs);
router.route('/:id').get(WebController.getById);
router.route('/:id').patch(WebController.updateWeb);
router.route('/:id').delete(WebController.deleteWeb);

export default router;
