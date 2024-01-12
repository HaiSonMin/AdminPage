import express from 'express';
import { AuthController } from '@/controllers';
import { AUTH_API } from '@/constant';
import { checkAuth } from '@/middleware/auth.middleware';

const router = express.Router();

router.route(AUTH_API.FEATURE.LOGIN).post(AuthController.login);
router.route(AUTH_API.FEATURE.LOGOUT).post(AuthController.logout);
router.route(AUTH_API.FEATURE.GENERATE_OTP).post(AuthController.generateOTP);
router.route(AUTH_API.FEATURE.CONFIRM_OTP).post(AuthController.confirmOTP);
router
  .route(AUTH_API.FEATURE.CREATE_SESSION_RESET_PASSWORD)
  .post(AuthController.createSessionResetPassword);
router
  .route(AUTH_API.FEATURE.CONFIRM_RESET_PASSWORD)
  .post(AuthController.confirmResetPassword);
router
  .route(AUTH_API.FEATURE.REFRESH_TOKEN)
  .post(AuthController.refreshAccessToken);

router
  .route(AUTH_API.FEATURE.CHANGE_PASSWORD)
  .post(checkAuth, AuthController.changePassword);

export { router };
