import { Request, Response } from 'express';
import { OK } from '@/core/success.response';
import { MailScriptService } from '@/services';

export class MailScriptController {
  static async createAccount(req: Request, res: Response) {
    return new OK({
      message: 'Chạy kịch bản tạo mail thành công',
      metadata: await MailScriptService.createAccount(),
    }).send(res);
  }

  // One use by admin
  static async scratchAccount(req: Request, res: Response) {
    return new OK({
      message: 'Lấy tất cả account mail thành công',
      metadata: await MailScriptService.scratchAccount(),
    }).send(res);
  }
}
