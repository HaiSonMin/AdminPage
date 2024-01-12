import { IEmployee } from '@/interface/model/employee';

export interface IAuthLogin
  extends Pick<
    IEmployee,
    'employee_userName' | 'employee_email' | 'employee_password'
  > {}
