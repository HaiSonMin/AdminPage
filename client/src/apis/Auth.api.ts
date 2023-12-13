import { PATH_AUTH } from '@/constants/paths';
import { LOCAL_STORE_KEYS } from '@/constants/values';
import { IConfirmOtp, ILogin, IResetPassword } from '@/interfaces/auth';
import { IApi } from '@/interfaces/common';
import { IDataLocalUser } from '@/interfaces/common/IDataLocalUser.interface';
import { IEmployee } from '@/interfaces/models';
import { convertToStringToken, getErrorRes, http } from '@/utils';

export class AuthApi {
  static async login(dataLogin: ILogin) {
    try {
      const response = await http.post(
        `${PATH_AUTH.ROOT}/${PATH_AUTH.FEATURE.LOGIN}`,
        dataLogin
      );
      const result: IApi = response.data;
      return result;
    } catch (error: unknown) {
      const err = getErrorRes(error);
      throw new Error(err.message);
    }
  }

  static async logout() {
    const dataStore: IDataLocalUser = JSON.parse(
      `${localStorage.getItem(LOCAL_STORE_KEYS.DATA_USER)}`
    );
    try {
      const response = await http.post(
        `${PATH_AUTH.ROOT}/${PATH_AUTH.FEATURE.LOGOUT}`,
        undefined,
        { headers: { Authorization: convertToStringToken(dataStore.AT_TOKEN) } }
      );
      const result: IApi = response.data;
      return result;
    } catch (error: unknown) {
      const err = getErrorRes(error);
      throw new Error(err.message);
    }
  }

  static async generateOTP() {
    try {
      const response = await http.post(
        `${PATH_AUTH.ROOT}/${PATH_AUTH.FEATURE.GENERATE_OTP}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: unknown) {
      throw new Error('Lỗi đăng nhập');
    }
  }

  static async createSessionResetPassword(
    employee_email: Pick<IEmployee, 'employee_email'>
  ) {
    try {
      console.log(employee_email);
      const response = await http.post(
        `${PATH_AUTH.ROOT}/${PATH_AUTH.FEATURE.CREATE_SESSION_RESET_PASSWORD}`,
        { employee_email }
      );
      const result: IApi = response.data;
      return result;
    } catch (error: unknown) {
      const err = getErrorRes(error);
      throw new Error(err.message);
    }
  }

  static async confirmOTP({ OTPCode }: IConfirmOtp) {
    try {
      const response = await http.post(
        `${PATH_AUTH.ROOT}/${PATH_AUTH.FEATURE.CONFIRM_OTP}`,
        { OTPCode }
      );
      const result: IApi = response.data;
      return result;
    } catch (error: unknown) {
      const err = getErrorRes(error);
      throw new Error(err.message);
    }
  }

  static async confirmResetPassword(data: IResetPassword) {
    try {
      const response = await http.post(
        `${PATH_AUTH.ROOT}/${PATH_AUTH.FEATURE.CONFIRM_RESET_PASSWORD}`,
        data
      );
      const result: IApi = response.data;
      return result;
    } catch (error: unknown) {
      const err = getErrorRes(error);
      throw new Error(err.message);
    }
  }

  static async refreshToken() {}
}
