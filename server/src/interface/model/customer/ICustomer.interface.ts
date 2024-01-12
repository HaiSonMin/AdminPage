import { IBaseModel } from '@/interface/common';

export interface ICustomer extends IBaseModel {
  customer_fullName: string;
  customer_phoneNumber: string;
  customer_requirement: string;
  customer_source: any;
  customer_voucher: string;
}
