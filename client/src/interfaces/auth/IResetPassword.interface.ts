import { IEmployee } from '../models';

export interface IResetPassword extends Pick<IEmployee, 'employee_password'> {
  employee_confirmPassword: string;
}
