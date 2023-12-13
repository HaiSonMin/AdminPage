import {
  IAuthResultApiLogin,
  IAuthResultApiLogout,
  IAuthResultApiConfirmOtp,
  IAuthResultApiGenerateOtp,
  IAuthResultApiConfirmResetPassword,
  IAuthResultApiCreateSessionResetPassword,
} from '@/interfaces/result-apis/auth';
import toast from 'react-hot-toast';
import { AuthApi } from '@/apis/Auth.api';
import { useMutation } from '@tanstack/react-query';

export const useLoginApi = (): IAuthResultApiLogin => {
  const {
    data,
    mutate,
    isPending: isLogin,
  } = useMutation({
    mutationFn: AuthApi.login,
    onSuccess: (data) => {
      toast.success(`${data?.message}`);
    },
    onError: (error: any) => {
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

export const useLogoutApi = (): IAuthResultApiLogout => {
  const {
    data,
    mutate,
    isPending: isLogout,
  } = useMutation({
    mutationFn: AuthApi.logout,
    onSuccess: (data) => {
      toast.success(`${data?.message}`);
    },
    onError: (error: any) => {
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

export const useGenerateOTPApi = (): IAuthResultApiGenerateOtp => {
  const {
    data,
    mutate,
    isPending: isGenerateOtp,
  } = useMutation({
    mutationFn: AuthApi.generateOTP,
    onSuccess: (data) => {
      toast.success(`${data?.message}`);
    },
    onError: (error: any) => {
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

export const useCreateSessionResetPasswordApi =
  (): IAuthResultApiCreateSessionResetPassword => {
    const {
      data,
      mutate,
      isPending: isCreateSessionResetPassword,
    } = useMutation({
      mutationFn: AuthApi.createSessionResetPassword,
      // onSuccess: (data) => {
      //   toast.success(`${data?.message}`);
      // },
      onError: (error: any) => {
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

export const useConfirmOTPApi = (): IAuthResultApiConfirmOtp => {
  const {
    data,
    mutate,
    isPending: isConfirmOtp,
  } = useMutation({
    mutationFn: AuthApi.confirmOTP,
    // onSuccess: (data) => {
    //   toast.success(`${data?.message}`);
    // },
    onError: (error: any) => {
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
export const useConfirmResetPassword =
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
      onError: (error: any) => {
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
export const useRefreshToken = () => {};
