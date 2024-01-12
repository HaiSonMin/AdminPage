import { sortBy, skipPage, selectFields } from '@/utils';
import { customerModel } from '@/models';
import { IQuery } from '@/interface';
import {
  ICustomerAddVoucherDto,
  ICustomerUpdateDto,
} from '@/interface/model/customer';

export class CustomerRepository {
  static async getById(customerId: string) {
    return await customerModel.findById(customerId).lean().exec();
  }

  static async getAll({ limit, page, sort, fields }: IQuery) {
    const [totalCustomers, customers] = await Promise.all([
      customerModel.countDocuments(),
      customerModel
        .find()
        .limit(limit)
        .skip(skipPage({ page, limit }))
        .sort(sortBy(sort))
        .select(selectFields(fields))
        .populate([{ path: 'customer_source', select: ['web_name'] }])
        .lean()
        .exec(),
    ]);
    return { totalCustomers, customers };
  }

  static async search({ limit, page, keySearch, fields }: IQuery) {
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
        .select(selectFields(fields))
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

  static async updateByPhone(
    customerPhone: string,
    payload: ICustomerUpdateDto
  ) {
    return customerModel
      .findOneAndUpdate({ customer_phoneNumber: customerPhone }, payload, {
        new: true,
        upsert: true,
      })
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

  static async deleteByPhone(customerPhone: string) {
    return customerModel
      .findOneAndDelete({ customer_phoneNumber: customerPhone })
      .lean()
      .exec();
  }
}
