import { Request, Response } from 'express';
import { AuthService } from '@/services';
import { CREATED, OK } from '@/core/success.response';
import { IAuthChangePass, IAuthLogin } from '@/interface';

export class AuthController {
  static async login(req: Request, res: Response) {
    const dataLogin = req.body as IAuthLogin;
    return new OK({
      message: 'Đăng nhập thành công',
      metadata: await AuthService.login(dataLogin, res),
    }).send(res);
  }
  static async logout(req: Request, res: Response) {
    return new OK({
      message: 'Đăng xuất thành công',
      metadata: await AuthService.logout(req, res),
    }).send(res);
  }
  static async refreshAccessToken(req: Request, res: Response) {
    return new OK({
      message: 'Refresh AT successfully',
      metadata: await AuthService.refreshAccessToken(req, res),
    }).send(res);
  }
  static async generateOTP(req: Request, res: Response) {
    return new CREATED({
      message: 'Tạo OTP thành công',
      metadata: await AuthService.generateOTP(req),
    }).send(res);
  }
  static async confirmOTP(req: Request, res: Response) {
    return new OK({
      message: 'Xác nhận OTP thành công',
      metadata: await AuthService.confirmOTP(req),
    }).send(res);
  }
  static async createSessionResetPassword(req: Request, res: Response) {
    return new CREATED({
      message: 'Tạo phiên đặt lại mật khẩu thành công',
      metadata: await AuthService.createSessionResetPassword(req),
    }).send(res);
  }
  static async confirmResetPassword(req: Request, res: Response) {
    return new OK({
      message: 'Đặt lại mật khẩu thành công',
      metadata: await AuthService.confirmResetPassword(req),
    }).send(res);
  }
  static async changePassword(req: Request, res: Response) {
    const dataChangePass = req.body as IAuthChangePass;
    return new OK({
      message: 'Đổi mật khẩu thành công',
      metadata: await AuthService.changePassword(req, dataChangePass),
    }).send(res);
  }
}

// module.exports = AuthController;
