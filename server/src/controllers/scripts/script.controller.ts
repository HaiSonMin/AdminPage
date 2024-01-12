import { Request, Response } from 'express';
import { CREATED, OK } from '@/core/success.response';
import { ScriptService } from '@/services';

export class ScriptController {
  static async createScript(req: Request, res: Response) {
    const payload = req.body as any;
    new CREATED({
      message: 'Tạo kịch bản thành công',
      metadata: await ScriptService.createScript(),
    }).send(res);
  }

  static async searchScript(req: Request, res: Response) {
    return new OK({
      message: 'Tìm kiếm kịch bản thành công',
      metadata: await ScriptService.searchScript(),
    }).send(res);
  }

  static async getAllScripts(req: Request, res: Response) {
    return new OK({
      message: 'Lấy tất cả kịch bản thành công',
      metadata: await ScriptService.getAllScripts(),
    }).send(res);
  }

  static async getScript(req: Request, res: Response) {
    return new OK({
      message: 'Lấy kịch bản thành công',
      metadata: await ScriptService.getScript(),
    }).send(res);
  }

  static async updateScript(req: Request, res: Response) {
    return new OK({
      message: 'Cập nhật kịch bản thành công',
      metadata: await ScriptService.updateScript(),
    }).send(res);
  }

  static async deleteScript(req: Request, res: Response) {
    return new OK({
      message: 'Xóa kịch bản thành công',
      metadata: await ScriptService.deleteScript(),
    }).send(res);
  }
}
