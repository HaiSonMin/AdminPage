import { customerModel } from '@/models';
import { BadRequestError, NotFoundError } from '@/core/error.response';
import {
  ICustomer,
  ICustomerAddVoucherDto,
  ICustomerCreateDto,
  ICustomerUpdateDto,
} from '@/interface/model/customer';
import { CustomerRepository } from '@/repositories';
import { IQuery, IResultGetMany } from '@/interface';

export default class CustomerService {
  static async createCustomer(
    payload: ICustomerCreateDto
  ): Promise<ICustomer | null> {
    const newCustomer = await customerModel.create(payload);
    return newCustomer;
  }

  static async getCustomer(id: string) {
    const customer = await CustomerRepository.getById(id);
    if (!customer) throw new NotFoundError('Không tìm thấy khách hàng');
    return customer;
  }

  static async getAllCustomers(
    query: IQuery
  ): Promise<IResultGetMany<ICustomer>> {
    const { customers, totalCustomers } = await CustomerRepository.getAll(
      query
    );
    return { totalItems: totalCustomers, items: customers };
  }

  static async searchCustomers(
    query: IQuery
  ): Promise<IResultGetMany<ICustomer>> {
    const { totalCustomers, customers } = await CustomerRepository.search(
      query
    );
    return { totalItems: totalCustomers, items: customers };
  }

  static async updateCustomer(customerId: string, payload: ICustomerUpdateDto) {
    const customerUpdated = await CustomerRepository.update(
      customerId,
      payload
    );
    if (!customerUpdated)
      throw new BadRequestError('Cập nhật khách hàng thất bại');
    return customerUpdated;
  }

  static async updateCustomerByPhone(payload: ICustomerUpdateDto) {
    const customerUpdated = await CustomerRepository.updateByPhone(
      `${payload.customer_phoneNumber}`,
      payload
    );
    return customerUpdated;
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

  static async deleteByPhone(customerPhone: string) {
    const customerDeleted = await CustomerRepository.deleteByPhone(
      customerPhone
    );

    if (!customerDeleted) {
      throw new BadRequestError('Xóa thất bại');
    }
    return;
  }
}
