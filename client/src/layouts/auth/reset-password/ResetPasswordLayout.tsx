import { useAuthApiConfirmResetPassword } from '@/apis-use';
import { ButtonText } from '@/components/buttons';
import { FormBasic } from '@/components/forms';
import { Heading3XL } from '@/components/heading';
import { InputAuth } from '@/components/inputs';
import { PATH_AUTH, PATH_ROOT_ADMIN } from '@/constants/paths';
import { IResetPassword } from '@/interfaces/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import { useMoveBack } from '@/hooks';
import { SpinnerPage } from '@/components/loadings';
const ResetPasswordLayoutStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const HeadingBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  svg {
    width: 3rem;
    height: 3rem;
    opacity: 0.5;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
`;

const FormResetPassword = styled(FormBasic)`
  margin-top: -2rem;
`;

export const ResetPasswordLayout = () => {
  const goBack = useMoveBack();
  const navigate = useNavigate();

  const { confirmResetPassword, isConfirmResetPassword } =
    useAuthApiConfirmResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IResetPassword>();

  const onResetPassword = (dataForm: IResetPassword) => {
    console.log('dataForm:::', dataForm);
    confirmResetPassword(dataForm, {
      onSuccess: () => {
        navigate(
          `/${PATH_ROOT_ADMIN}/${PATH_AUTH.ROOT}/${PATH_AUTH.FEATURE.LOGIN}`
        );
      },
    });
  };

  return (
    <ResetPasswordLayoutStyle>
      {isConfirmResetPassword && <SpinnerPage />}
      <HeadingBox>
        <IoReturnDownBackOutline
          onClick={() =>
            navigate(
              `/${PATH_ROOT_ADMIN}/${PATH_AUTH.ROOT}/${PATH_AUTH.FEATURE.LOGIN}`
            )
          }
        />
        <Heading3XL $isBold>Đổi mật khẩu</Heading3XL>
      </HeadingBox>
      <FormResetPassword onSubmit={handleSubmit(onResetPassword)}>
        <InputAuth
          label='Mật khẩu mới'
          register={register('employee_password', {
            required: { message: 'Vui lòng nhập tên người dùng', value: true },
          })}
          type='text'
          hasValue={!!watch('employee_password')}
          error={errors.employee_password?.message}
          isRequired
        />
        <InputAuth
          label='Mật khẩu'
          register={register('employee_confirmPassword', {
            required: { message: 'Vui lòng nhập mật khẩu', value: true },
          })}
          type='password'
          hasValue={!!watch('employee_confirmPassword')}
          error={errors.employee_confirmPassword?.message}
          isRequired
        />
        <ButtonText type='submit' disabled={isConfirmResetPassword}>
          Xác nhận
        </ButtonText>
      </FormResetPassword>
    </ResetPasswordLayoutStyle>
  );
};
