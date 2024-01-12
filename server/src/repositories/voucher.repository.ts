import { filterBy, selectFields, skipPage, sortBy } from '@/utils';
import { IQuery } from '@/interface';
import { IVoucherDto } from '@/interface/model/voucher';
import { voucherModel } from '@/models';

export class VoucherRepository {
  static async getById(voucherId: string) {
    return await voucherModel.findById(voucherId).exec();
  }
  static async getAll({ limit, page, sort, filters, fields }: IQuery) {
    const [totalVouchers, vouchers] = await Promise.all([
      voucherModel.countDocuments({ $or: [filterBy(filters)] }),
      voucherModel
        .find({ $or: [filterBy(filters)] })
        .limit(limit)
        .skip(skipPage({ limit, page }))
        .sort(sortBy(sort))
        .lean()
        .select(selectFields(fields))
        .populate([{ path: 'voucher_web', select: ['web_name', 'web_url'] }])
        .exec(),
    ]);
    return { totalVouchers, vouchers };
  }

  static async search({ limit, page, keySearch }: IQuery) {
    const regSearch = new RegExp(keySearch + '', 'i');

    const [totalVouchers, vouchers] = await Promise.all([
      voucherModel.countDocuments({ voucher_name: { $regex: regSearch } }),
      voucherModel
        .find({ voucher_name: { $regex: regSearch } })
        .limit(limit)
        .skip(skipPage({ limit, page }))
        .populate([{ path: 'voucher_web', select: ['web_name', 'web_url'] }])
        .lean()
        .exec(),
    ]);
    return { totalVouchers, vouchers };
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
