import { ICustomer } from './ICustomer.interface';

export interface ICustomerDto
  extends Pick<
    ICustomer,
    | 'customer_fullName'
    | 'customer_phoneNumber'
    | 'customer_requirement'
    | 'customer_source'
  > {}

export interface ICustomerAddVoucherDto
  extends Pick<ICustomer, 'customer_voucher' | 'customer_phoneNumber'> {}
