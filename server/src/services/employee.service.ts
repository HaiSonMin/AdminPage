import { IQuery, IResultGetMany } from '../interface';
import { EmployeeRepository } from '../repositories';
import { BadRequestError, NotFoundError } from '../core/error.response';
import { employeeModel } from '../models';
import { IEmployee, IEmployeeDto } from '../interface/model/employee';

export default class EmployeeService {
  static async createEmployee(employeeCreateDto: IEmployeeDto) {
    if (
      employeeCreateDto.employee_confirmPassword !==
      employeeCreateDto.employee_password
    ) {
      throw new BadRequestError('Xác nhận mật khẩu không đúng');
    }

    const { employee_confirmPassword, ...dataCreate } = employeeCreateDto;

    const newEmployee = await employeeModel.create(dataCreate);
    return newEmployee;
  }

  static async getEmployee(employeeId: string) {
    const user = await EmployeeRepository.getById(employeeId);
    if (!user)
      throw new NotFoundError('Người dùng không tồn tại trong hệ thống');
    return user;
  }

  static async getAllEmployees(
    query: IQuery
  ): Promise<IResultGetMany<IEmployee>> {
    const { employees, totalEmployees } = await EmployeeRepository.getAll(
      query
    );
    return { totalItems: totalEmployees, items: employees };
  }

  static async searchEmployees(
    query: IQuery
  ): Promise<IResultGetMany<IEmployee>> {
    const { employees, totalEmployees } = await EmployeeRepository.search(
      query
    );
    return { totalItems: totalEmployees, items: employees };
  }

  static async updateEmployee(employeeId: string, payload: IEmployeeDto) {
    const employeeUpdated = await EmployeeRepository.update(
      employeeId,
      payload
    );
    if (!employeeUpdated) throw new BadRequestError('Nhân viên không tồn tại');
    return employeeUpdated;
  }

  static async deleteEmployee(employeeId: string) {
    const employeeDeleted = await EmployeeRepository.delete(employeeId);
    if (!employeeDeleted) throw new BadRequestError('Nhân viên không tồn tại');
    return employeeDeleted;
  }
}
