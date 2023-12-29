import { CUSTOMER_API } from '@/constants/paths-apis';
import { IApi, IError, IQuery, IResultGetMany } from '@/interfaces/common';
import {
  ICustomer,
  ICustomerCreateDto,
  ICustomerUpdateDto,
} from '@/interfaces/models';
import { getUserLocalStore, httpPrivate } from '@/utils';

export class CustomerApi {
  static async create(
    customerCreateDto: ICustomerCreateDto
  ): Promise<IApi<ICustomer>> {
    try {
      const response = await httpPrivate.post(
        `/${CUSTOMER_API.ROOT}`,
        customerCreateDto,
        {
          headers: { Authorization: getUserLocalStore() },
        }
      );
      const result: IApi<ICustomer> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }

  static async getById(customerId: string): Promise<IApi<ICustomer>> {
    try {
      const response = await httpPrivate.get(
        `/${CUSTOMER_API.ROOT}/${customerId}`,
        {
          headers: { Authorization: getUserLocalStore() },
        }
      );

      const result: IApi<ICustomer> = response.data;

      return result;
    } catch (error) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }

  static async getAll(
    query: Partial<IQuery>
  ): Promise<IApi<IResultGetMany<ICustomer>>> {
    try {
      const response = await httpPrivate.get(`/${CUSTOMER_API.ROOT}`, {
        params: query,
        headers: { Authorization: getUserLocalStore() },
      });
      const result: IApi<IResultGetMany<ICustomer>> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }

  static async search(
    query: Partial<IQuery>
  ): Promise<IApi<IResultGetMany<ICustomer>>> {
    try {
      const response = await httpPrivate.get(`/${CUSTOMER_API.ROOT}/search`, {
        params: query,
        headers: { Authorization: getUserLocalStore() },
      });
      const result: IApi<IResultGetMany<ICustomer>> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }

  static async update({
    customerId,
    customerUpdateDto,
  }: {
    customerId: string;
    customerUpdateDto: ICustomerUpdateDto;
  }): Promise<IApi<ICustomer>> {
    try {
      const response = await httpPrivate.patch(
        `/${CUSTOMER_API.ROOT}/${customerId}`,
        customerUpdateDto,
        {
          headers: { Authorization: getUserLocalStore() },
        }
      );

      const result: IApi<ICustomer> = response.data;

      return result;
    } catch (error) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }

  static async delete(CustomerId: string): Promise<IApi<ICustomer>> {
    try {
      const response = await httpPrivate.delete(
        `/${CUSTOMER_API.ROOT}/${CustomerId}`,
        {
          headers: { Authorization: getUserLocalStore() },
        }
      );

      const result: IApi<ICustomer> = response.data;

      return result;
    } catch (error) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }
}
