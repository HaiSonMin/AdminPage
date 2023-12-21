import { IEmployee } from '../interface/model/employee';
import { EGender, ERole } from '../enum';
import { env } from 'process';
export const VALUE_CONSTANT = {
  SALT_PASSWORD: 10,
  RT_NAME: 'refreshToken',
};

export const infoAdmin: IEmployee = {
  employee_email: env.ADMIN_EMAIL || '',
  employee_userName: env.ADMIN_USERNAME || '',
  employee_fullName: env.ADMIN_FULLNAME || '',
  employee_password: env.ADMIN_PASSWORD || '',
  employee_gender: EGender.MALE,
  employee_phoneNumber: env.ADMIN_PHONENUMBER || '',
  employee_role: ERole.ADMIN,
};
