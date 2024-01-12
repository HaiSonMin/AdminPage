import { IEmployee } from '../models';

export interface IChangePassword extends Pick<IEmployee, 'employee_password'> {
  employee_oldPassword: string;
  employee_confirmPassword: string;
}
