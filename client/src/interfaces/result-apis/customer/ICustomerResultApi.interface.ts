import { IApi, IError, IResultGetMany } from '@/interfaces/common';
import {
  ICustomer,
  ICustomerCreateDto,
  ICustomerUpdateDto,
} from '@/interfaces/models';
import { UseMutateFunction } from '@tanstack/react-query';

export interface ICustomerResultApiGetById extends IApi<ICustomer> {
  isGettingCustomer: boolean;
}

export interface ICustomerResultApiGetAll
  extends IApi<IResultGetMany<ICustomer>> {
  isGettingCustomers: boolean;
}

export interface ICustomerResultApiSearch
  extends IApi<IResultGetMany<ICustomer>> {
  isSearchingCustomers: boolean;
}

export interface ICustomerResultApiCreate extends IApi<ICustomer> {
  createCustomer: UseMutateFunction<
    IApi<ICustomer>,
    IError,
    ICustomerCreateDto,
    unknown
  >;
  isCreatingCustomer: boolean;
}

export interface ICustomerResultApiUpdate extends IApi<ICustomer> {
  updateCustomer: UseMutateFunction<
    IApi<ICustomer>,
    IError,
    { customerId: string; customerUpdateDto: ICustomerUpdateDto },
    unknown
  >;
  isUpdatingCustomer: boolean;
}

export interface ICustomerResultApiDelete extends IApi<ICustomer> {
  deleteCustomer: UseMutateFunction<IApi<ICustomer>, IError, string, unknown>;
  isDeletingCustomer: boolean;
}
