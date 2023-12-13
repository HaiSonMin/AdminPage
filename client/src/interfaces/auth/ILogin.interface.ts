import { IEmployee } from '../models';

export interface ILogin
  extends Pick<IEmployee, 'employee_userName' | 'employee_password'> {}
