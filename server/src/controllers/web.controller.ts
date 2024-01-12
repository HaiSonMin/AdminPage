import { IQuery } from '@/interface';
import { WebService } from '@/services';
import { Request, Response } from 'express';
import { IWebDto } from '@/interface/model/web';
import { CREATED, OK } from '@/core/success.response';

export class WebController {
  static async createWeb(req: Request, res: Response) {
    const payload = req.body;
    new CREATED({
      message: 'Tạo web thành công',
      metadata: await WebService.createWeb(payload),
    }).send(res);
  }

  static async getAllWebs(req: Request, res: Response) {
    const query = req.query as IQuery | unknown;
    new OK({
      message: 'Lấy tất cả webs thành công',
      metadata: await WebService.getAllWebs(query as IQuery),
    }).send(res);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    new OK({
      message: 'Lấy thông tin web thành công',
      metadata: await WebService.getById(id),
    }).send(res);
  }

  static async searchWebs(req: Request, res: Response) {
    const query = req.query as IQuery | unknown;
    new OK({
      message: 'Tìm kiếm webs thành công',
      metadata: await WebService.searchWebs(query as IQuery),
    }).send(res);
  }

  static async updateWeb(req: Request, res: Response) {
    const { id } = req.params;
    const payload = req.body as IWebDto;
    new OK({
      message: 'Cập nhật thông tin web thành công',
      metadata: await WebService.updateWeb(id, payload),
    }).send(res);
  }

  static async deleteWeb(req: Request, res: Response) {
    const { id } = req.params;
    new OK({
      message: 'Xóa web thành công',
      metadata: await WebService.deleteWeb(id),
    }).send(res);
  }
}
