import { IApi, IError, IResultGetMany } from '@/interfaces/common';
import {
  IEmployee,
  IEmployeeCreateDto,
  IEmployeeUpdateDto,
} from '@/interfaces/models';
import { UseMutateFunction } from '@tanstack/react-query';

export interface IEmployeeResultApiGetById extends IApi<IEmployee> {
  isGettingEmployee: boolean;
}

export interface IEmployeeResultApiGetAll
  extends IApi<IResultGetMany<IEmployee>> {
  isGettingEmployees: boolean;
}

export interface IEmployeeResultApiSearch
  extends IApi<IResultGetMany<IEmployee>> {
  isSearchingEmployees: boolean;
}

export interface IEmployeeResultApiCreate extends IApi<IEmployee> {
  createEmployee: UseMutateFunction<
    IApi<IEmployee>,
    IError,
    IEmployeeCreateDto,
    unknown
  >;
  isCreatingEmployee: boolean;
}

export interface IEmployeeResultApiUpdate extends IApi<IEmployee> {
  updateEmployee: UseMutateFunction<
    IApi<IEmployee>,
    IError,
    { employeeId: string; employeeUpdateDto: IEmployeeUpdateDto },
    unknown
  >;
  isUpdatingEmployee: boolean;
}

export interface IEmployeeResultApiDelete extends IApi<IEmployee> {
  deleteEmployee: UseMutateFunction<IApi<IEmployee>, IError, string, unknown>;
  isDeletingEmployee: boolean;
}
