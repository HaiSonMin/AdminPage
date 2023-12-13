import { IEmployee } from '../models';

export interface IDataLocalUser extends Pick<IEmployee, 'employee_fullName'> {
  AT_TOKEN: string;
}
