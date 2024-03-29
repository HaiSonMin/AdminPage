import {
  IChangePassword,
  IConfirmOtp,
  ILogin,
  IResetPassword,
} from '@/interfaces/auth';
import { IApi, IError } from '@/interfaces/common';
import { IEmployee } from '@/interfaces/models';
import { UseMutateFunction } from '@tanstack/react-query';

export interface IAuthResultApiLogin extends IApi<any> {
  login: UseMutateFunction<
    IApi<{
      accessToken: string;
      employee: IEmployee;
    }>,
    IError,
    ILogin,
    unknown
  >;
  isLogin: boolean;
}

export interface IAuthResultApiLogout extends IApi<any> {
  logout: UseMutateFunction<IApi<any>, IError, any, unknown>;
  isLogout: boolean;
}

export interface IAuthResultApiCreateSessionResetPassword extends IApi<any> {
  createSessionResetPassword: UseMutateFunction<
    IApi<string>,
    IError,
    Pick<IEmployee, 'employee_email'>,
    unknown
  >;
  isCreateSessionResetPassword: boolean;
}

export interface IAuthResultApiGenerateOtp extends IApi<any> {
  generateOtp: UseMutateFunction<IApi<string>, IError, any, unknown>;
  isGenerateOtp: boolean;
}

export interface IAuthResultApiConfirmOtp extends IApi<any> {
  confirmOtp: UseMutateFunction<IApi<string>, IError, IConfirmOtp, unknown>;
  isConfirmOtp: boolean;
}

export interface IAuthResultApiConfirmResetPassword extends IApi<any> {
  confirmResetPassword: UseMutateFunction<
    IApi<string>,
    IError,
    IResetPassword,
    unknown
  >;
  isConfirmResetPassword: boolean;
}

export interface IAuthResultApiRefreshAT extends IApi<any> {
  refreshAT: UseMutateFunction<IApi<string>, IError, void, unknown>;
  isRefreshAT: boolean;
}

export interface IAuthResultApiChangePass extends IApi<any> {
  changePassword: UseMutateFunction<
    IApi<any>,
    IError,
    IChangePassword,
    unknown
  >;
  isChangePass: boolean;
}
