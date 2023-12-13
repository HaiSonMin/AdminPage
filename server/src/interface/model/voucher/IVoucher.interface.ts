import { IBaseModel } from 'src/interface/common';

export interface IVoucher extends IBaseModel {
  voucher_name: string;
  voucher_type: string;
  voucher_value: number;
  voucher_web: any;
}
