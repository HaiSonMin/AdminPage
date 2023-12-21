import { WEB_API } from '@/constants/paths-apis';
import { LOCAL_STORE_KEYS } from '@/constants/values';
import {
  IApi,
  IDataLocalUser,
  IError,
  IQuery,
  IResultGetMany,
} from '@/interfaces/common';
import { IWeb, IWebCreateDto, IWebUpdateDto } from '@/interfaces/models';
import { convertToStringToken, httpPrivate } from '@/utils';

export class WebApi {
  static async create(webCreateDto: IWebCreateDto) {
    try {
      const dataStore: IDataLocalUser = JSON.parse(
        `${localStorage.getItem(LOCAL_STORE_KEYS.DATA_USER)}`
      );
      const response = await httpPrivate.post(
        `/${WEB_API.ROOT}`,
        webCreateDto,
        {
          headers: { Authorization: convertToStringToken(dataStore.AT_TOKEN) },
        }
      );
      const result: IApi<IWeb> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      console.log('err:::', err);
      throw new Error(err.message);
    }
  }

  static async getById(webId: string) {
    try {
      const response = await httpPrivate.get(`/${WEB_API.ROOT}/${webId}`);

      const result: IApi<IWeb> = response.data;

      return result;
    } catch (error) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }

  static async search(query: Partial<IQuery>) {
    try {
      const dataStore: IDataLocalUser = JSON.parse(
        `${localStorage.getItem(LOCAL_STORE_KEYS.DATA_USER)}`
      );
      const response = await httpPrivate.get(`/${WEB_API.ROOT}/search`, {
        params: query,
        headers: { Authorization: convertToStringToken(dataStore.AT_TOKEN) },
      });
      const result: IApi<IResultGetMany<IWeb>> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      console.log('err:::', err);
      throw new Error(err.message);
    }
  }

  static async getAll(query: Partial<IQuery>) {
    try {
      const dataStore: IDataLocalUser = JSON.parse(
        `${localStorage.getItem(LOCAL_STORE_KEYS.DATA_USER)}`
      );
      const response = await httpPrivate.get(`/${WEB_API.ROOT}`, {
        params: query,
        headers: { Authorization: convertToStringToken(dataStore.AT_TOKEN) },
      });
      const result: IApi<IResultGetMany<IWeb>> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      console.log('err:::', err);
      throw new Error(err.message);
    }
  }

  static async update({
    webId,
    webUpdateDto,
  }: {
    webId: string;
    webUpdateDto: IWebUpdateDto;
  }) {
    try {
      const dataStore: IDataLocalUser = JSON.parse(
        `${localStorage.getItem(LOCAL_STORE_KEYS.DATA_USER)}`
      );
      const response = await httpPrivate.patch(
        `/${WEB_API.ROOT}/${webId}`,
        webUpdateDto,
        {
          headers: { Authorization: convertToStringToken(dataStore.AT_TOKEN) },
        }
      );

      const result: IApi<IWeb> = response.data;

      return result;
    } catch (error) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }

  static async delete(webId: string) {
    try {
      const dataStore: IDataLocalUser = JSON.parse(
        `${localStorage.getItem(LOCAL_STORE_KEYS.DATA_USER)}`
      );
      const response = await httpPrivate.delete(`/${WEB_API.ROOT}/${webId}`, {
        headers: { Authorization: convertToStringToken(dataStore.AT_TOKEN) },
      });

      const result: IApi<IWeb> = response.data;

      return result;
    } catch (error) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }
}
