import { IBaseModel } from '@/interface/common';

export interface IVoucher extends IBaseModel {
  voucher_name: string;
  voucher_type: string;
  voucher_value: Number;
  voucher_web: any;
}
