import { IConfirmOtp, ILogin, IResetPassword } from '@/interfaces/auth';
import { IApi } from '@/interfaces/common';
import { IEmployee } from '@/interfaces/models';
import { UseMutateFunction } from '@tanstack/react-query';

export interface IAuthResultApiLogin extends IApi {
  login: UseMutateFunction<IApi, any, ILogin, unknown>;
  isLogin: boolean;
}

export interface IAuthResultApiLogout extends IApi {
  logout: UseMutateFunction<IApi, void, any, unknown>;
  isLogout: boolean;
}

export interface IAuthResultApiCreateSessionResetPassword extends IApi {
  createSessionResetPassword: UseMutateFunction<
    IApi,
    Pick<IEmployee, 'employee_email'>,
    any,
    unknown
  >;
  isCreateSessionResetPassword: boolean;
}

export interface IAuthResultApiGenerateOtp extends IApi {
  generateOtp: UseMutateFunction<IApi, void, any, unknown>;
  isGenerateOtp: boolean;
}

export interface IAuthResultApiConfirmOtp extends IApi {
  confirmOtp: UseMutateFunction<IApi, IConfirmOtp, any, unknown>;
  isConfirmOtp: boolean;
}

export interface IAuthResultApiConfirmResetPassword extends IApi {
  confirmResetPassword: UseMutateFunction<IApi, IResetPassword, any, unknown>;
  isConfirmResetPassword: boolean;
}
