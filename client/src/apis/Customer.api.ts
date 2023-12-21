import { CUSTOMER_API } from '@/constants/paths-apis';
import { IApi, IError, IQuery, IResultGetMany } from '@/interfaces/common';
import {
  ICustomer,
  ICustomerCreateDto,
  ICustomerUpdateDto,
} from '@/interfaces/models';
import { httpPrivate } from '@/utils';

export class CustomerApi {
  static async create(
    customerCreateDto: ICustomerCreateDto
  ): Promise<IApi<ICustomer>> {
    try {
      const response = await httpPrivate.post(
        `/${CUSTOMER_API.ROOT}`,
        customerCreateDto
      );
      const result: IApi<ICustomer> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      console.log('err:::', err);
      throw new Error(err.message);
    }
  }

  static async getById(customerId: string): Promise<IApi<ICustomer>> {
    try {
      const response = await httpPrivate.get(
        `/${CUSTOMER_API.ROOT}/${customerId}`
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
      console.log('query::::', query);
      const response = await httpPrivate.get(`/${CUSTOMER_API.ROOT}`, {
        params: query,
      });
      const result: IApi<IResultGetMany<ICustomer>> = response.data;
      console.log('result::::', result);
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
      });
      const result: IApi<IResultGetMany<ICustomer>> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      console.log('err:::', err);
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
        customerUpdateDto
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
        `/${CUSTOMER_API.ROOT}/${CustomerId}`
      );

      const result: IApi<ICustomer> = response.data;

      return result;
    } catch (error) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }
}
