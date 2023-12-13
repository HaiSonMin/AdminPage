import { voucherModel } from '../models';
import { IQuery } from '../interface';
import { VoucherRepository, WebRepository } from '../repositories';
import { BadRequestError, NotFoundError } from '../core/error.response';
import { IVoucher, IVoucherDto } from '../interface/model/voucher';
import WebService from './web.service';

export default class VoucherService {
  static async createVoucher(payload: IVoucherDto) {
    // Check web have exist
    await WebService.getById(payload.voucher_web);

    const newVoucher = await voucherModel.create(payload);
    return newVoucher;
  }

  static async getVoucherById(voucherId: string) {
    const voucher = await VoucherRepository.getById(voucherId);
    if (!voucher) throw new NotFoundError('Voucher không tồn tại');
    return voucher;
  }

  static async getAllVouchers(query: IQuery) {
    const { totalVoucher, vouchers } = await VoucherRepository.getAll(query);
    return { totalVoucher, vouchers };
  }

  static async updateVoucher(
    voucherId: string,
    payload: IVoucherDto
  ): Promise<IVoucher> {
    // Check web have exist
    await WebService.getById(payload.voucher_web);

    const voucherUpdated = await VoucherRepository.update(voucherId, payload);
    if (!voucherUpdated) throw new BadRequestError('Cập nhật voucher thất bại');
    await voucherUpdated.save(); // For validate
    return voucherUpdated;
  }

  static async deleteVoucher(voucherId: string) {
    const voucherDeleted = await VoucherRepository.delete(voucherId);
    if (!voucherDeleted) throw new BadRequestError('Xóa voucher thất bại');
    return voucherDeleted;
  }
}
