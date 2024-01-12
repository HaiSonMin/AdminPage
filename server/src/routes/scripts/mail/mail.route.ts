import express from 'express';
import { MailScriptController } from '@/controllers/scripts/mail';
import { checkAuthIsAdmin } from '@/middleware/auth.middleware';
const router = express.Router();

router
  .route('/scratchAccount')
  .get(checkAuthIsAdmin, MailScriptController.scratchAccount);

router.get('/createAccount', MailScriptController.createAccount);

export { router };
