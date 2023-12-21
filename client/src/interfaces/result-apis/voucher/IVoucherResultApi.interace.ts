import { IApi, IError, IResultGetMany } from '@/interfaces/common';
import {
  IVoucher,
  IVoucherCreateDto,
  IVoucherUpdateDto,
} from '@/interfaces/models';
import { UseMutateFunction } from '@tanstack/react-query';

export interface IVoucherResultApiGet extends IApi<IVoucher> {
  isGettingVoucher: boolean;
}

export interface IVoucherResultApiGetAll
  extends IApi<IResultGetMany<IVoucher>> {
  isGettingVouchers: boolean;
}

export interface IVoucherResultApiSearch
  extends IApi<IResultGetMany<IVoucher>> {
  isSearchingVouchers: boolean;
}

export interface IVoucherResultApiCreate extends IApi<IVoucher> {
  createVoucher: UseMutateFunction<
    IApi<IVoucher>,
    IError,
    IVoucherCreateDto,
    unknown
  >;
  isCreatingVoucher: boolean;
}

export interface IVoucherResultApiUpdate extends IApi<IVoucher> {
  updateVoucher: UseMutateFunction<
    IApi<IVoucher>,
    IError,
    { voucherId: string; voucherUpdateDto: IVoucherUpdateDto },
    unknown
  >;
  isUpdatingVoucher: boolean;
}

export interface IVoucherResultApiDelete extends IApi<IVoucher> {
  deleteVoucher: UseMutateFunction<IApi<IVoucher>, IError, string, unknown>;
  isDeletingVoucher: boolean;
}
