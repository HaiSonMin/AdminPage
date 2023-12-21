import { sortBy, skipPage, filterBy } from '../utils';
import { employeeModel } from '../models';
import { IEmployeeDto } from '../interface/model/employee';
import { IQuery } from '../interface';

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

  static async getAll({ limit, page, sort, filters }: IQuery) {
    const [totalEmployees, employees] = await Promise.all([
      employeeModel.countDocuments({ $or: [filterBy(filters)] }),
      employeeModel
        .find({ $or: [filterBy(filters)] })
        .skip(skipPage({ limit, page }))
        .limit(limit)
        .sort(sortBy(sort))
        .lean()
        .exec(),
    ]);
    return { totalEmployees, employees };
  }

  static async search({ limit, page, search }: IQuery) {
    const [totalEmployees, employees] = await Promise.all([
      employeeModel.countDocuments({ $text: { $search: search } }),
      employeeModel
        .find({ $text: { $search: search } }, { score: { $meta: 'textScore' } })
        .limit(limit)
        .skip(skipPage({ limit, page }))
        .sort({ score: { $meta: 'textScore' } }) // Assuming you have a convertSortBy function
        .lean()
        .exec(),
    ]);
    return { totalEmployees, employees };
    // const regex = new RegExp(search, 'i');
    // const [totalEmployees, employees] = await Promise.all([
    //   employeeModel.countDocuments({ employee_email: { $regex: regex } }),
    //   employeeModel
    //     .find({ employee_email: { $regex: regex } })
    //     .limit(limit)
    //     .skip(skipPage({ limit, page }))
    //     .sort(sortBy(sort))
    //     .lean()
    //     .exec(),
    // ]);
    // return { totalEmployees, employees };
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
