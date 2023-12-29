import { sortBy, skipPage } from '../utils';
import { customerModel } from '../models';
import { IQuery } from '../interface';
import {
  ICustomer,
  ICustomerAddVoucherDto,
  ICustomerUpdateDto,
} from '../interface/model/customer';

export class CustomerRepository {
  static async getById(customerId: string) {
    return await customerModel.findById(customerId).lean().exec();
  }

  static async getAll({ limit, page, sort }: IQuery) {
    const [totalCustomers, customers] = await Promise.all([
      customerModel.countDocuments(),
      customerModel
        .find()
        .limit(limit)
        .skip(skipPage({ page, limit }))
        .sort(sortBy(sort))
        .select([])
        .lean()
        .exec(),
    ]);
    return { totalCustomers, customers };
  }

  static async search({ limit, page, keySearch }: IQuery) {
    const [totalCustomers, customers] = await Promise.all([
      customerModel.countDocuments({
        $text: { $search: keySearch },
      }),
      customerModel
        .find(
          { $text: { $search: keySearch } },
          { score: { $meta: 'textScore' } }
        )
        .limit(limit)
        .skip(skipPage({ page, limit }))
        .sort({ score: { $meta: 'textScore' } })
        .lean()
        .exec(),
    ]);
    return { totalCustomers, customers };
  }

  static async update(customerId: string, payload: ICustomerUpdateDto) {
    return customerModel
      .findByIdAndUpdate(customerId, payload, { new: true })
      .lean()
      .exec();
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
