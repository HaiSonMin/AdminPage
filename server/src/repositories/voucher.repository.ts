import { filterBy, skipPage, sortBy } from '../utils';
import { IQuery } from '../interface';
import { IVoucherDto } from '../interface/model/voucher';
import { voucherModel } from '../models';

export class VoucherRepository {
  static async getById(voucherId: string) {
    return await voucherModel.findById(voucherId).exec();
  }
  static async getAll({ limit, page, sort, filters }: IQuery) {
    const [totalVoucher, vouchers] = await Promise.all([
      voucherModel.countDocuments({ $or: [filterBy(filters)] }),
      voucherModel
        .find({ $or: [filterBy(filters)] })
        .limit(limit)
        .skip(skipPage({ limit, page }))
        .sort(sortBy(sort))
        .lean()
        .exec(),
    ]);
    return { totalVoucher, vouchers };
  }

  static async search({ limit, page, search }: IQuery) {
    const [totalWebs, webs] = await Promise.all([
      voucherModel.countDocuments({ $text: { $search: search } }),
      voucherModel
        .find({ $text: { $search: search } }, { score: { $meta: 'textScore' } })
        .limit(limit)
        .skip(skipPage({ limit, page }))
        .sort({ score: { $meta: 'textScore' } }) // Assuming you have a convertSortBy function
        .lean()
        .exec(),
    ]);
    return { totalWebs, webs };
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
