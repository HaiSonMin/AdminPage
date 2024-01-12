import { FacebookScriptController } from '@/controllers';
import express from 'express';
const router = express.Router();

router.route('/login').get(FacebookScriptController.login);

export { router };
