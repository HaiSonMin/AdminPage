import { EmployeeService } from '../services';
import { Request, Response } from 'express';
import { CREATED, OK } from '../core/success.response';
import { IQuery } from '../interface';
import { IEmployeeDto } from '../interface/model/employee';

export default class EmployeeController {
  static async createEmployee(req: Request, res: Response) {
    const employee = req.body as IEmployeeDto | unknown;
    new CREATED({
      message: 'Tạo nhân viên thành công',
      metadata: await EmployeeService.createEmployee(employee as IEmployeeDto),
    }).send(res);
  }

  static async getEmployee(req: Request, res: Response) {
    const { id } = req.params;
    new OK({
      message: 'Lấy thông tin nhân viên thành công',
      metadata: await EmployeeService.getEmployee(id),
    }).send(res);
  }

  static async getAllEmployees(req: Request, res: Response) {
    const query = req.query as IQuery | unknown;
    new OK({
      message: 'Lấy tất cả nhân viên thành công',
      metadata: await EmployeeService.getAllEmployees(query as IQuery),
    }).send(res);
  }

  static async searchEmployees(req: Request, res: Response) {
    const query = req.query as IQuery | unknown;
    new OK({
      message: 'Tìm kiếm nhân viên thành công',
      metadata: await EmployeeService.searchEmployees(query as IQuery),
    }).send(res);
  }

  static async updateEmployee(req: Request, res: Response) {
    const { id } = req.params;
    const payload = req.body as IEmployeeDto;
    new OK({
      message: 'Tìm kiếm nhân viên thành công',
      metadata: await EmployeeService.updateEmployee(id, payload),
    }).send(res);
  }

  static async deleteEmployee(req: Request, res: Response) {
    const { id } = req.params;
    new OK({
      message: 'Xóa nhân viên thành công',
      metadata: await EmployeeService.deleteEmployee(id),
    }).send(res);
  }
}
