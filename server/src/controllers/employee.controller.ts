import { EmployeeService } from '../services';
import { Request, Response } from 'express';
import { OK } from '../core/success.response';
import { IQuery } from '../interface';

export default class EmployeeController {
  static async getAllCustomers(req: Request, res: Response) {
    const query = req.query as IQuery | unknown;
    new OK({
      message: 'Lấy tất cả khách hàng thành công',
      metadata: await EmployeeService.getAllCustomers(query as IQuery),
    }).send(res);
  }

  static async searchCustomers(req: Request, res: Response) {
    const query = req.query as IQuery | unknown;
    new OK({
      message: 'Tìm kiếm khách hàng thành công',
      metadata: await EmployeeService.searchCustomers(query as IQuery),
    }).send(res);
  }
}
