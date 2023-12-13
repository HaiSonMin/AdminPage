import { AdminService } from '../services';
import { Request, Response } from 'express';
import { CREATED, OK } from '../core/success.response';
import { IEmployeeDto } from '../interface/model/employee';

export default class AdminController {
  static async createEmployee(req: Request, res: Response) {
    const employee = req.body as IEmployeeDto | unknown;

    new CREATED({
      message: 'Tạo nhân viên thành công',
      metadata: await AdminService.createEmployee(employee as IEmployeeDto),
    }).send(res);
  }

  static async deleteEmployee(req: Request, res: Response) {
    const { employeeId } = req.params;
    new OK({
      message: 'Xóa nân viên thành công',
      metadata: await AdminService.deleteEmployee(employeeId),
    }).send(res);
  }
}
