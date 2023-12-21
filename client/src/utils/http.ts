/* eslint-disable react-hooks/rules-of-hooks */
import { AUTH_API } from '@/constants/paths-apis';
import { LOCAL_STORE_KEYS } from '@/constants/values';
import { IError } from '@/interfaces/common';
import { IDataLocalUser } from '@/interfaces/common/IDataLocalUser.interface';
import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
} from 'axios';
import { StatusCodes } from 'http-status-codes';

const convertToStringToken = (token: string) => `Bearer ${token}`;
class Http {
  baseURl: string;
  instancePrivate: AxiosInstance;
  instancePublic: AxiosInstance;
  constructor() {
    // Now convertToStringToken is defined
    const dataStore = JSON.parse(
      `${localStorage.getItem(LOCAL_STORE_KEYS.DATA_USER)}`
    );

    // Bind the class methods to the current instance
    this.handlerSuccessResponse = this.handlerSuccessResponse.bind(this);
    this.handlerErrorResponse = this.handlerErrorResponse.bind(this);

    this.baseURl = import.meta.env.VITE_API_URL || 'http://localhost:9000/api';
    this.instancePrivate = axios.create({
      baseURL: this.baseURl,
      withCredentials: true,
      timeout: 10000, // 10 giây sẽ timeout
      headers: {
        'Content-Type': 'application/json',
        Authorization: convertToStringToken(dataStore?.AT_TOKEN),
      },
    });

    this.instancePublic = axios.create({
      baseURL: this.baseURl,
      withCredentials: true,
      timeout: 10000, // 10 giây sẽ timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.instancePrivate.interceptors.response.use(
      this.handlerSuccessResponse,
      this.handlerErrorResponse
    );
    this.instancePublic.interceptors.response.use(
      this.handlerSuccessResponse,
      this.handlerErrorResponse
    );
  }

  private handlerSuccessResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  private async handlerErrorResponse(error: AxiosError) {
    const errRes = error.response?.data as IError;

    // AT Expired
    const preRequest = error?.config as AxiosRequestConfig<any>;

    if (errRes.status === StatusCodes.UNAUTHORIZED) {
      const res = await this.instancePrivate.post(
        `/${AUTH_API.ROOT}/${AUTH_API.FEATURE.REFRESH_TOKEN}`
      );
      const result = res.data;
      const dataStore: IDataLocalUser = {
        AT_TOKEN: result.metadata.newAccessToken,
        employee_fullName: result.metadata.employee.employeeFullName,
      };
      localStorage.setItem(
        LOCAL_STORE_KEYS.DATA_USER,
        JSON.stringify(dataStore)
      );

      // Send continue pre request
      // Ensure that preRequest is not undefined before using it
      if (preRequest) {
        preRequest.headers['Authorization'] = convertToStringToken(
          result.metadata.newAccessToken
        );
        return this.instancePrivate(preRequest);
      }

      return Promise.reject(errRes);
    }

    // RT Expired
    if (errRes.status === StatusCodes.FORBIDDEN) {
      localStorage.removeItem(LOCAL_STORE_KEYS.DATA_USER);
      setTimeout(() => {
        window.location.reload();
        return Promise.reject(errRes);
      }, 1000);
    }

    return Promise.reject(errRes);
  }
}

export const httpPrivate = new Http().instancePrivate;
export const httpPublic = new Http().instancePublic;
