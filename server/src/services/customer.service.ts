import { customerModel } from '../models';
import { BadRequestError } from '../core/error.response';
import {
  ICustomer,
  ICustomerDto,
  ICustomerAddVoucherDto,
} from '../interface/model/customer';
import { CustomerRepository } from '../repositories';

export default class CustomerService {
  static async createCustomer(
    customer: ICustomerDto
  ): Promise<ICustomer | null> {
    try {
      const newPayment = await customerModel.create(customer);
      return newPayment;
    } catch (error) {
      throw new BadRequestError('Tạo người dùng thất bại, vui lòng thử lại');
    }
  }

  static async addVoucher({
    customer_phoneNumber,
    customer_voucher,
  }: ICustomerAddVoucherDto): Promise<ICustomer | null> {
    const checkVoucher = await customerModel
      .findOne({ customer_phoneNumber })
      .lean()
      .exec();

    if (checkVoucher?.customer_voucher)
      throw new BadRequestError('Mỗi người chỉ có duy nhất 1 lần nhận voucher');

    const customerAddedVoucher = await CustomerRepository.addVoucher({
      customer_phoneNumber,
      customer_voucher,
    });
    if (!customerAddedVoucher)
      throw new BadRequestError('Lấy voucher thất bại');
    return customerAddedVoucher;
  }
}
