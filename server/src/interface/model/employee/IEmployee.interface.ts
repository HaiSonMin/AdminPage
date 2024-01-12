import { IBaseModel } from '@/interface/common';

export interface IEmployee extends IBaseModel {
  employee_userName: string;
  employee_fullName: string;
  employee_gender: string;
  employee_email: string;
  employee_password: string;
  employee_role: string;
  employee_phoneNumber: string;
}
