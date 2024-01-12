import { IEmployee } from '@/interface/model/employee';

export interface IAuthChangePass extends Pick<IEmployee, 'employee_password'> {
  employee_oldPassword: string;
  employee_confirmPassword: string;
}
