import { VOUCHER_API } from '@/constants/paths-apis';
import { IApi, IError, IQuery, IResultGetMany } from '@/interfaces/common';
import {
  IVoucher,
  IVoucherCreateDto,
  IVoucherUpdateDto,
} from '@/interfaces/models';
import { httpPrivate } from '@/utils';

export class VoucherApi {
  static async create(voucherCreateDto: IVoucherCreateDto) {
    try {
      const response = await httpPrivate.post(
        `/${VOUCHER_API.ROOT}`,
        voucherCreateDto
      );
      const result: IApi<IVoucher> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      console.log('err:::', err);
      throw new Error(err.message);
    }
  }

  static async search(query: Partial<IQuery>) {
    try {
      const response = await httpPrivate.get(`/${VOUCHER_API.ROOT}/search`, {
        params: query,
      });
      const result: IApi<IResultGetMany<IVoucher>> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      console.log('err:::', err);
      throw new Error(err.message);
    }
  }

  static async getById(voucherId: string) {
    try {
      const response = await httpPrivate.get(
        `/${VOUCHER_API.ROOT}/${voucherId}`
      );
      const result: IApi<IVoucher> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      console.log('err:::', err);
      throw new Error(err.message);
    }
  }

  static async getAll(query: Partial<IQuery>) {
    try {
      const response = await httpPrivate.get(`/${VOUCHER_API.ROOT}`, {
        params: query,
      });
      const result: IApi<IResultGetMany<IVoucher>> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      console.log('err:::', err);
      throw new Error(err.message);
    }
  }

  static async update({
    voucherId,
    voucherUpdateDto,
  }: {
    voucherId: string;
    voucherUpdateDto: IVoucherUpdateDto;
  }) {
    try {
      const response = await httpPrivate.patch(
        `/${VOUCHER_API.ROOT}/${voucherId}`,
        voucherUpdateDto
      );
      const result: IApi<IVoucher> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      console.log('err:::', err);
      throw new Error(err.message);
    }
  }

  static async delete(voucherId: string) {
    try {
      const response = await httpPrivate.delete(
        `/${VOUCHER_API.ROOT}/${voucherId}`
      );

      const result: IApi<IVoucher> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      console.log('err:::', err);
      throw new Error(err.message);
    }
  }
}
