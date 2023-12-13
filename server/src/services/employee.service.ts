import { IQuery } from '../interface';
import { CustomerRepository } from '../repositories';
import { ICustomer } from '../interface/model/customer';

export default class EmployeeService {
  static async getAllCustomers(query: IQuery) {
    const { customers, totalCustomers } = await CustomerRepository.getAll(
      query
    );
    return { totalCustomers, customers };
  }

  static async searchCustomers(query: IQuery) {
    const { totalCustomers, customers } = await CustomerRepository.search(
      query
    );
    return { totalCustomers, customers };
  }
}
