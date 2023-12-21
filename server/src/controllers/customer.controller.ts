import { CustomerService } from '../services';
import { Request, Response } from 'express';
import { CREATED, OK } from '../core/success.response';
import { IQuery } from '../interface';
import {
  ICustomerCreateDto,
  ICustomerAddVoucherDto,
  ICustomerUpdateDto,
} from '../interface/model/customer';

export default class CustomerController {
  static async createCustomer(req: Request, res: Response) {
    const payload = req.body as ICustomerCreateDto;
    new CREATED({
      message: 'Tạo thành công',
      metadata: await CustomerService.createCustomer(payload),
    }).send(res);
  }

  static async getCustomer(req: Request, res: Response) {
    const { id } = req.params;
    new OK({
      message: 'Lấy thông tin khách hàng thành công',
      metadata: await CustomerService.getCustomer(id),
    }).send(res);
  }

  static async getAllCustomers(req: Request, res: Response) {
    const query = req.query as IQuery | unknown;
    new OK({
      message: 'Lấy tất cả khách hàng thành công',
      metadata: await CustomerService.getAllCustomers(query as IQuery),
    }).send(res);
  }

  static async searchCustomers(req: Request, res: Response) {
    const query = req.query as IQuery | unknown;
    new OK({
      message: 'Tìm kiếm khách hàng thành công',
      metadata: await CustomerService.searchCustomers(query as IQuery),
    }).send(res);
  }

  static async updateCustomer(req: Request, res: Response) {
    const { id } = req.params;
    const payload = req.body as ICustomerUpdateDto | unknown;
    new OK({
      message: 'Cập nhật khách hàng thành công',
      metadata: await CustomerService.updateCustomer(
        id,
        payload as ICustomerUpdateDto
      ),
    }).send(res);
  }

  static async addVoucher(req: Request, res: Response) {
    const addVoucherData = req.body as ICustomerAddVoucherDto;
    new OK({
      message: 'Nhận voucher thành công',
      metadata: await CustomerService.addVoucher(addVoucherData),
    }).send(res);
  }
}
