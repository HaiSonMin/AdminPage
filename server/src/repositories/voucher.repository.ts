import { skipPage } from '../utils';
import { IQuery } from '../interface';
import { IVoucherDto } from '../interface/model/voucher';
import { voucherModel } from '../models';

export class VoucherRepository {
  static async getById(voucherId: string) {
    return await voucherModel.findById(voucherId).exec();
  }
  static async getAll({ limit, page }: IQuery) {
    const [totalVoucher, vouchers] = await Promise.all([
      voucherModel.countDocuments(),
      voucherModel
        .find()
        .limit(limit)
        .skip(skipPage({ limit, page }))
        .lean()
        .exec(),
    ]);
    return { totalVoucher, vouchers };
  }
  static async update(voucherId: string, payload: IVoucherDto) {
    return await voucherModel.findByIdAndUpdate(voucherId, payload, {
      new: true,
    });
  }
  static async delete(voucherId: string) {
    return await voucherModel.findByIdAndDelete(voucherId);
  }
}
