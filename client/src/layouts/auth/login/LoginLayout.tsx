import { ButtonText } from '@/components/buttons';
import { FormBasic } from '@/components/forms';
import { InputAuth } from '@/components/inputs';
import { ILogin } from '@/interfaces/auth';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import LogoWeb from '@/assets/images/image-logo/logo_seadragon_w506-h506.webp';
import {
  useCreateSessionResetPasswordApi,
  useGenerateOTPApi,
  useLoginApi,
} from '@/apis-use';
import { SpinnerPage } from '@/components/loadings';
import { Link, useNavigate } from 'react-router-dom';
import { PATH_ADMIN, PATH_AUTH, PATH_ROOT_ADMIN } from '@/constants/paths';
import { useLocalStorage } from '@mantine/hooks';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { LOCAL_STORE_KEYS } from '@/constants/values';
import { IDataLocalUser } from '@/interfaces/common/IDataLocalUser.interface';

const LoginLayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6rem;
  flex-shrink: 0;
  gap: 1.2rem;
`;

const ImageStyle = styled.div<{ $width?: string; $height?: string }>`
  overflow: hidden;
  /* width: ${(props) => `${props.$width}rem`};
  height: ${(props) => `${props.$height}rem`}; */
  width: 28rem;
  height: 28rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
    object-position: center;
  }
`;

const LinkForgot = styled.p`
  font-size: var(--font-size-14);
  color: var(--color-primary);
  font-weight: 500;
  margin-left: auto;
  text-decoration: underline;
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const LoginLayout = () => {
  const navigate = useNavigate();
  const { login, isLogin } = useLoginApi();

  const { createSessionResetPassword, isCreateSessionResetPassword } =
    useCreateSessionResetPasswordApi();

  const { generateOtp, isGenerateOtp } = useGenerateOTPApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ILogin>();

  const onClickForget = () => {
    if (!watch('employee_userName')) return toast.error('Vui lòng nhập email');
    createSessionResetPassword(watch('employee_userName'), {
      onSuccess: (dataRes) => {
        generateOtp(null, {
          onSuccess: () => {
            navigate(
              `/${PATH_ROOT_ADMIN}/${PATH_AUTH.ROOT}/${PATH_AUTH.FEATURE.CONFIRM_OTP}`
            );
          },
        });
      },
    });
  };

  const onLogin = (dataForm: ILogin) => {
    login(dataForm, {
      onSuccess: (dataRes) => {
        const atToken = `${dataRes?.metadata?.accessToken}`;
        const dataStore: IDataLocalUser = {
          AT_TOKEN: atToken,
          employee_fullName: dataRes?.metadata?.employee?.employee_fullName,
        };
        localStorage.setItem(
          LOCAL_STORE_KEYS.DATA_USER,
          JSON.stringify(dataStore)
        );
        navigate(`/${PATH_ROOT_ADMIN}/${PATH_ADMIN.DASHBOARD.ROOT}`);
      },
    });
  };

  return (
    <LoginLayoutStyle>
      {isCreateSessionResetPassword || (isGenerateOtp && <SpinnerPage />)}
      {isLogin && <SpinnerPage />}
      <ImageStyle>
        <img src={LogoWeb} alt='Logo Web' />
      </ImageStyle>
      <FormBasic onSubmit={handleSubmit(onLogin)}>
        <InputAuth
          label='Tên người dùng/email'
          register={register('employee_userName', {
            required: { message: 'Vui lòng nhập tên người dùng', value: true },
          })}
          type='text'
          hasValue={!!watch('employee_userName')}
          error={errors.employee_userName?.message}
          isRequired
        />
        <InputAuth
          label='Mật khẩu'
          register={register('employee_password', {
            required: { message: 'Vui lòng nhập mật khẩu', value: true },
          })}
          type='password'
          hasValue={!!watch('employee_password')}
          error={errors.employee_password?.message}
          isRequired
        />
        <LinkForgot onClick={onClickForget}>Quên mật khẩu?</LinkForgot>
        <ButtonText type='submit' disabled={isLogin}>
          Đăng nhập
        </ButtonText>
      </FormBasic>
    </LoginLayoutStyle>
  );
};
