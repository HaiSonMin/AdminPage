import { skipPage } from '../utils';
import { employeeModel } from '../models';
import { IEmployeeDto } from '../interface/model/employee';

export class EmployeeRepository {
  static async getById(employeeId: string) {
    return await employeeModel.findById(employeeId).lean().exec();
  }

  static async getByEmail(employeeEmail: string) {
    return await employeeModel
      .findOne({ employee_email: employeeEmail })
      .select(['+employee_password'])
      .exec();
  }

  static async getByUserName(employeeName: string) {
    return await employeeModel
      .findOne({ employee_userName: employeeName })
      .select(['+employee_password'])
      .lean()
      .exec();
  }

  static async getAll(limit: number, page: number) {
    return await employeeModel
      .find()
      .limit(limit)
      .skip(skipPage({ limit, page }))
      .lean()
      .exec();
  }
  static async search(limit: number, page: number, keySearch: string) {
    const regex = new RegExp(keySearch, 'i');
    return await employeeModel
      .find({ $text: { $search: keySearch } })
      .limit(limit)
      .skip(skipPage({ limit, page }))
      .lean()
      .exec();
  }
  static async update(employeeId: string, payload: IEmployeeDto) {
    return await employeeModel
      .findByIdAndUpdate(employeeId, payload, {
        new: true,
      })
      .lean()
      .exec();
  }
  static async delete(employeeId: string) {
    return await employeeModel.findByIdAndDelete(employeeId).lean().exec();
  }
}
