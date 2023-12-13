import { CustomerService } from '../services';
import { Request, Response } from 'express';
import { CREATED, OK } from '../core/success.response';
import {
  ICustomerDto,
  ICustomerAddVoucherDto,
} from '../interface/model/customer';

export default class CustomerController {
  static async createCustomer(req: Request, res: Response) {
    const customer = req.body as ICustomerDto;
    new CREATED({
      message: 'Tạo thành công',
      metadata: await CustomerService.createCustomer(customer),
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
