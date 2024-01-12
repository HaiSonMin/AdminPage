import { OK } from '@/core/success.response';
import { FacebookScriptService } from '@/services';
import { Request, Response } from 'express';

export class FacebookScriptController {
  static async login(req: Request, res: Response) {
    return new OK({
      message: 'Chạy kịch bản tạo mail thành công',
      metadata: await FacebookScriptService.login(),
    }).send(res);
  }
}
