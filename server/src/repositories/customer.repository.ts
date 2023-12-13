import { skipPage } from '../utils';
import { customerModel } from '../models';
import { IQuery } from '../interface';
import { ICustomerAddVoucherDto } from '../interface/model/customer';

export class CustomerRepository {
  static async getById(customerId: string) {
    return await customerModel.findById(customerId).lean().exec();
  }

  static async getAll({ limit, page }: IQuery) {
    const [totalCustomers, customers] = await Promise.all([
      customerModel.countDocuments(),
      customerModel
        .find()
        .limit(limit)
        .skip(skipPage({ page, limit }))
        .lean()
        .exec(),
    ]);
    return { totalCustomers, customers };
  }

  static async search({ limit, page, keySearch }: IQuery) {
    const regSearch = new RegExp(keySearch + '', 'i');

    const [totalCustomers, customers] = await Promise.all([
      customerModel.countDocuments(),
      customerModel
        .find({ customer_fullName: { $regex: regSearch } })
        .limit(limit)
        .skip(skipPage({ page, limit }))
        .lean()
        .exec(),
    ]);
    return { totalCustomers, customers };
  }

  static async addVoucher({
    customer_phoneNumber,
    customer_voucher,
  }: ICustomerAddVoucherDto) {
    return await customerModel.findOneAndUpdate(
      { customer_phoneNumber },
      { $set: { customer_voucher } },
      { new: true }
    );
  }
}
