import { IBaseModel } from '@/interfaces/common';

export interface IVoucher extends IBaseModel {
  voucher_name: string;
  voucher_type: string;
  voucher_value: string;
  voucher_web: any;
}
