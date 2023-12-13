import { IBaseModel } from '../../common';

export interface ICustomer extends IBaseModel {
  customer_fullName: string;
  customer_phoneNumber: string;
  customer_requirement: string;
  customer_source: string;
  customer_voucher: string;
}
