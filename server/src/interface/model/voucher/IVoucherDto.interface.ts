import { IVoucher } from './IVoucher.interface';

export interface IVoucherDto
  extends Pick<
    IVoucher,
    'voucher_name' | 'voucher_type' | 'voucher_value' | 'voucher_web'
  > {}
