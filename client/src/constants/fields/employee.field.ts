import { IEmployee } from '@/interfaces/models';
import { baseField } from './base.field';

export const EMPLOYEE_FIELD: Partial<IEmployee> = {
  employee_fullName: 'Họ và tên',
  employee_email: 'Email',
  employee_gender: 'Giới tính',
  employee_role: 'Phòng ban',
  employee_userName: 'Tên người dùng',
  employee_phoneNumber: 'Số điện thoại',
  ...baseField
};
