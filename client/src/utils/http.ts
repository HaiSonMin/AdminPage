import { IApi } from '@/interfaces/common';
import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

class Http {
  baseURl: string;
  instance: AxiosInstance;

  constructor() {
    this.baseURl = import.meta.env.VITE_API_URL || 'http://localhost:9000/api';
    this.instance = axios.create({
      baseURL: this.baseURl,
      withCredentials: true,
      timeout: 10000, // 10 giây sẽ timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.response.use(
      this.handlerSuccessResponse,
      this.handlerErrorResponse
    );
  }

  private handlerSuccessResponse(response: AxiosResponse): AxiosResponse {
    const result: IApi = response.data;
    console.log('resultApi:::', result);
    if (result.statusCode !== 401) return response;
    return response;
  }

  private handlerErrorResponse(error: AxiosError) {
    return Promise.reject(error);
  }
}

export const http = new Http().instance;
