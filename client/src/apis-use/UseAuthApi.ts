import toast from 'react-hot-toast';
import { AuthApi } from '@/apis/Auth.api';
import { useMutation } from '@tanstack/react-query';
import {
  IAuthResultApiLogin,
  IAuthResultApiLogout,
  IAuthResultApiConfirmOtp,
  IAuthResultApiGenerateOtp,
  IAuthResultApiConfirmResetPassword,
  IAuthResultApiCreateSessionResetPassword,
  IAuthResultApiRefreshAT,
  IAuthResultApiChangePass,
} from '@/interfaces/result-apis/auth';
import { IError } from '@/interfaces/common';
import { LOCAL_STORE_KEYS } from '@/constants/values';

export const useAuthApiLogin = (): IAuthResultApiLogin => {
  const {
    data,
    mutate,
    isPending: isLogin,
  } = useMutation({
    mutationFn: AuthApi.login,
    onSuccess: (data) => {
      toast.success(`${data?.message}`);
    },
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  return {
    login: mutate,
    isLogin,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useAuthApiLogout = (): IAuthResultApiLogout => {
  const {
    data,
    mutate,
    isPending: isLogout,
  } = useMutation({
    mutationFn: AuthApi.logout,
    onSuccess: () => {
      localStorage.removeItem(LOCAL_STORE_KEYS.DATA_USER);
    },
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  return {
    logout: mutate,
    isLogout,
    message: data?.message,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useAuthApiGenerateOTP = (): IAuthResultApiGenerateOtp => {
  const {
    data,
    mutate,
    isPending: isGenerateOtp,
  } = useMutation({
    mutationFn: AuthApi.generateOTP,
    onSuccess: (data) => {
      toast.success(`${data?.message}`);
    },
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  return {
    generateOtp: mutate,
    isGenerateOtp,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useAuthApiCreateSessionResetPassword =
  (): IAuthResultApiCreateSessionResetPassword => {
    const {
      data,
      mutate,
      isPending: isCreateSessionResetPassword,
    } = useMutation({
      mutationFn: AuthApi.createSessionResetPassword,
      onError: (error: IError) => {
        toast.error(error.message);
      },
    });

    return {
      createSessionResetPassword: mutate,
      isCreateSessionResetPassword,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  };

export const useAuthApiConfirmOTP = (): IAuthResultApiConfirmOtp => {
  const {
    data,
    mutate,
    isPending: isConfirmOtp,
  } = useMutation({
    mutationFn: AuthApi.confirmOTP,
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  return {
    confirmOtp: mutate,
    isConfirmOtp,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};
export const useAuthApiConfirmResetPassword =
  (): IAuthResultApiConfirmResetPassword => {
    const {
      data,
      mutate,
      isPending: isConfirmResetPassword,
    } = useMutation({
      mutationFn: AuthApi.confirmResetPassword,
      onSuccess: (data) => {
        toast.success(`${data?.message}`);
      },
      onError: (error: IError) => {
        toast.error(error.message);
      },
    });

    return {
      confirmResetPassword: mutate,
      isConfirmResetPassword,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  };

export const useAuthApiRefreshToken = (): IAuthResultApiRefreshAT => {
  const {
    data,
    mutate,
    isPending: isRefreshAT,
  } = useMutation({
    mutationFn: AuthApi.refreshToken,
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  return {
    refreshAT: mutate,
    isRefreshAT,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useAuthApiChangePassword = (): IAuthResultApiChangePass => {
  const {
    data,
    mutate,
    isPending: isChangePass,
  } = useMutation({
    mutationFn: AuthApi.changePassword,
    // onSuccess: (data) => {
    //   toast.success(`${data?.message}`);
    // },
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  return {
    changePassword: mutate,
    isChangePass,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};
