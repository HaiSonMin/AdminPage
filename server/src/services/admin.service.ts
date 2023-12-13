import { BadRequestError, NotFoundError } from '../core/error.response';
import { EmployeeRepository } from '../repositories';
import { IQuery } from '../interface';
import { employeeModel } from '../models';
import { IEmployeeDto } from '../interface/model/employee';
import { generatorUsername, latinizeStr } from '../utils';

export default class AdminService {
  static async createEmployee(employeeCreateDto: IEmployeeDto) {
    console.log('employeeCreateDto:::', employeeCreateDto);
    if (
      employeeCreateDto.employee_confirmPassword !==
      employeeCreateDto.employee_password
    ) {
      throw new BadRequestError('Xác nhận mật khẩu không đúng');
    }
    const employee_userName = generatorUsername(
      employeeCreateDto.employee_fullName
    );

    employeeCreateDto.employee_userName = latinizeStr(employee_userName);

    const { employee_confirmPassword, ...dataCreate } = employeeCreateDto;

    try {
      const newEmployee = await employeeModel.create(dataCreate);
      return newEmployee;
    } catch (error: any) {
      throw new BadRequestError(error);
    }
  }

  static async getEmployee(employeeId: string) {
    const user = await EmployeeRepository.getById(employeeId);
    if (!user)
      throw new NotFoundError('Người dùng không tồn tại trong hệ thống');
    return user;
  }

  static async getAllEmployees(query: IQuery) {
    const { limit, page } = query;
    const users = await EmployeeRepository.getAll(limit, page);
    console.log(users);
    return users;
  }

  static async updateEmployee(employeeId: string, payload: any) {
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
