import { EMPLOYEE_API } from '@/constants/paths-apis';
import { IApi, IError, IQuery, IResultGetMany } from '@/interfaces/common';
import {
  IEmployee,
  IEmployeeCreateDto,
  IEmployeeUpdateDto,
} from '@/interfaces/models';
import { getUserLocalStore, httpPrivate } from '@/utils';

export class EmployeeApi {
  static async create(
    employeeCreateDto: IEmployeeCreateDto
  ): Promise<IApi<IEmployee>> {
    try {
      const response = await httpPrivate.post(
        `/${EMPLOYEE_API.ROOT}`,
        employeeCreateDto,
        {
          headers: { Authorization: getUserLocalStore() },
        }
      );
      const result: IApi<IEmployee> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }

  static async getById(employeeId: string): Promise<IApi<IEmployee>> {
    try {
      const response = await httpPrivate.get(
        `/${EMPLOYEE_API.ROOT}/${employeeId}`,
        {
          headers: { Authorization: getUserLocalStore() },
        }
      );

      const result: IApi<IEmployee> = response.data;

      return result;
    } catch (error) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }

  static async getAll(
    query: Partial<IQuery>
  ): Promise<IApi<IResultGetMany<IEmployee>>> {
    try {
      const response = await httpPrivate.get(`/${EMPLOYEE_API.ROOT}`, {
        params: query,
        headers: { Authorization: getUserLocalStore() },
      });
      const result: IApi<IResultGetMany<IEmployee>> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }

  static async search(
    query: Partial<IQuery>
  ): Promise<IApi<IResultGetMany<IEmployee>>> {
    try {
      const response = await httpPrivate.get(`/${EMPLOYEE_API.ROOT}/search`, {
        params: query,
        headers: { Authorization: getUserLocalStore() },
      });
      const result: IApi<IResultGetMany<IEmployee>> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }

  static async update({
    employeeId,
    employeeUpdateDto,
  }: {
    employeeId: string;
    employeeUpdateDto: IEmployeeUpdateDto;
  }): Promise<IApi<IEmployee>> {
    try {
      const response = await httpPrivate.patch(
        `/${EMPLOYEE_API.ROOT}/${employeeId}`,
        employeeUpdateDto,
        {
          headers: { Authorization: getUserLocalStore() },
        }
      );

      const result: IApi<IEmployee> = response.data;

      return result;
    } catch (error) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }

  static async delete(employeeId: string): Promise<IApi<IEmployee>> {
    try {
      const response = await httpPrivate.delete(
        `/${EMPLOYEE_API.ROOT}/${employeeId}`,
        {
          headers: { Authorization: getUserLocalStore() },
        }
      );

      const result: IApi<IEmployee> = response.data;

      return result;
    } catch (error) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }
}
