import { IEmployee } from './IEmployee.interface';

export interface IEmployeeDto
  extends Pick<
    IEmployee,
    | 'employee_userName'
    | 'employee_email'
    | 'employee_fullName'
    | 'employee_password'
    | 'employee_phoneNumber'
    | 'employee_role'
  > {
  employee_confirmPassword: string;
}
