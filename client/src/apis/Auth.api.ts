import { AUTH_API } from '@/constants/paths-apis';
import { LOCAL_STORE_KEYS } from '@/constants/values';
import { IConfirmOtp, ILogin, IResetPassword } from '@/interfaces/auth';
import { IApi, IError } from '@/interfaces/common';
import { IDataLocalUser } from '@/interfaces/common/IDataLocalUser.interface';
import { IEmployee } from '@/interfaces/models';
import { convertToStringToken, httpPublic } from '@/utils';

export class AuthApi {
  static async login(dataLogin: ILogin) {
    try {
      const response = await httpPublic.post(
        `${AUTH_API.ROOT}/${AUTH_API.FEATURE.LOGIN}`,
        dataLogin
      );
      const result: IApi<{
        accessToken: string;
        employee: IEmployee;
      }> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }

  static async logout() {
    const dataStore: IDataLocalUser = JSON.parse(
      `${localStorage.getItem(LOCAL_STORE_KEYS.DATA_USER)}`
    );
    try {
      const response = await httpPublic.post(
        `${AUTH_API.ROOT}/${AUTH_API.FEATURE.LOGOUT}`,
        undefined,
        { headers: { Authorization: convertToStringToken(dataStore.AT_TOKEN) } }
      );
      const result: IApi<string> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }

  static async generateOTP() {
    try {
      const response = await httpPublic.post(
        `${AUTH_API.ROOT}/${AUTH_API.FEATURE.GENERATE_OTP}`
      );
      const result: IApi<string> = response.data;
      return result;
    } catch (error: unknown) {
      throw new Error('Lỗi đăng nhập');
    }
  }

  static async createSessionResetPassword({
    employee_email,
  }: Pick<IEmployee, 'employee_email'>) {
    try {
      console.log(employee_email);
      const response = await httpPublic.post(
        `${AUTH_API.ROOT}/${AUTH_API.FEATURE.CREATE_SESSION_RESET_PASSWORD}`,
        { employee_email }
      );
      const result: IApi<string> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }

  static async confirmOTP({ OTPCode }: IConfirmOtp) {
    try {
      const response = await httpPublic.post(
        `${AUTH_API.ROOT}/${AUTH_API.FEATURE.CONFIRM_OTP}`,
        { OTPCode }
      );
      const result: IApi<string> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }

  static async confirmResetPassword(data: IResetPassword) {
    try {
      const response = await httpPublic.post(
        `${AUTH_API.ROOT}/${AUTH_API.FEATURE.CONFIRM_RESET_PASSWORD}`,
        data
      );
      const result: IApi<string> = response.data;
      return result;
    } catch (error: unknown) {
      const err = error as IError;
      throw new Error(err.message);
    }
  }

  static async refreshToken() {
    const dataStore: IDataLocalUser = JSON.parse(
      `${localStorage.getItem(LOCAL_STORE_KEYS.DATA_USER)}`
    );
    try {
      const response = await httpPublic.post(
        `${AUTH_API.ROOT}/${AUTH_API.FEATURE.REFRESH_TOKEN}`,
        undefined,
        { headers: { Authorization: convertToStringToken(dataStore.AT_TOKEN) } }
      );
      const result: IApi<string> = response.data;
      return result;
    } catch (error: unknown) {
      console.log('error::::', error);
      const err = error as IError;
      throw new Error(err.message);
    }
  }
}
