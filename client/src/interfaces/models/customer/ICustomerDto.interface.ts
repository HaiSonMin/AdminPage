import { ICustomer } from './ICustomer.interface';

export interface ICustomerCreateDto
  extends Pick<
    ICustomer,
    | 'customer_fullName'
    | 'customer_phoneNumber'
    | 'customer_requirement'
    | 'customer_source'
    | 'customer_voucher'
  > {}

export interface ICustomerUpdateDto extends Partial<ICustomer> {}
