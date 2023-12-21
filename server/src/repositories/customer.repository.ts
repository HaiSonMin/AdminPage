import { sortBy, skipPage } from '../utils';
import { customerModel } from '../models';
import { IQuery, IResultGetMany } from '../interface';
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
        .lean()
        .exec(),
    ]);
    return { totalCustomers, customers };
  }

  static async search({ limit, page, sort, search }: IQuery) {
    const regSearch = new RegExp(search + '', 'i');

    const [totalCustomers, customers] = await Promise.all([
      customerModel.countDocuments({
        $or: [
          { customer_fullName: { $regex: regSearch } },
          { customer_phoneNumber: { $regex: regSearch } },
        ],
      }),
      customerModel
        .find({
          $or: [
            { customer_fullName: { $regex: regSearch } },
            { customer_phoneNumber: { $regex: regSearch } },
          ],
        })
        .limit(limit)
        .skip(skipPage({ page, limit }))
        .sort(sortBy(sort))
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
