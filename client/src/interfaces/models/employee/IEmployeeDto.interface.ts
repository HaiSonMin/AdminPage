import { IEmployee } from './IEmployee.interface';

export interface IEmployeeCreateDto
  extends Pick<
    IEmployee,
    | 'employee_fullName'
    | 'employee_userName'
    | 'employee_email'
    | 'employee_password'
    | 'employee_phoneNumber'
    | 'employee_role'
  > {
  employee_confirmPassword: string;
}
