import { IQuery } from '@/interface';
import { VoucherService } from '@/services';
import { Request, Response } from 'express';
import { CREATED, OK } from '@/core/success.response';
import { IVoucherDto } from '@/interface/model/voucher';

export class VoucherController {
  static async createVoucher(req: Request, res: Response) {
    const payload = req.body;
    new CREATED({
      message: 'Tạo voucher thành công',
      metadata: await VoucherService.createVoucher(payload),
    }).send(res);
  }

  static async getVoucherById(req: Request, res: Response) {
    const { id } = req.params;
    new OK({
      message: 'Lấy voucher thành công',
      metadata: await VoucherService.getVoucherById(id),
    }).send(res);
  }

  static async getAllVouchers(req: Request, res: Response) {
    const query = req.query as IQuery | unknown;
    new OK({
      message: 'Lấy tất cả voucher thành công',
      metadata: await VoucherService.getAllVouchers(query as IQuery),
    }).send(res);
  }

  static async searchVouchers(req: Request, res: Response) {
    const query = req.query as IQuery | unknown;
    new OK({
      message: 'Tìm kiếm voucher thành công',
      metadata: await VoucherService.searchVouchers(query as IQuery),
    }).send(res);
  }

  static async updateVoucher(req: Request, res: Response) {
    const { id } = req.params;
    const payload = req.body as IVoucherDto;
    new OK({
      message: 'Cập nhật voucher thành công',
      metadata: await VoucherService.updateVoucher(id, payload),
    }).send(res);
  }

  static async deleteVoucher(req: Request, res: Response) {
    const { id } = req.params;
    new OK({
      message: 'Xóa voucher thành công',
      metadata: await VoucherService.deleteVoucher(id),
    }).send(res);
  }
}
