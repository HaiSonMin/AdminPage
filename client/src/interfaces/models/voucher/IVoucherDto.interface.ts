import { IVoucher } from './IVoucher.interface';

export interface IVoucherCreateDto
  extends Pick<
    IVoucher,
    'voucher_name' | 'voucher_type' | 'voucher_value' | 'voucher_web'
  > {}

export interface IVoucherUpdateDto extends Partial<IVoucherCreateDto> {}
