import express from 'express';
import { WebController } from '@/controllers';
import { checkAuth, checkApiKey } from '@/middleware/auth.middleware';

const router = express.Router();

router.route('').post(checkApiKey, WebController.createWeb);
router.route('/search').get(checkApiKey, WebController.searchWebs);
router.use(checkAuth);
router.route('').get(WebController.getAllWebs);
router.route('/:id').get(WebController.getById);
router.route('/:id').patch(WebController.updateWeb);
router.route('/:id').delete(WebController.deleteWeb);

export { router };
