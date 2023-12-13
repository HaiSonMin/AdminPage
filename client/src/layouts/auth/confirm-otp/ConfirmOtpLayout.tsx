import { useConfirmOTPApi, useGenerateOTPApi } from '@/apis-use';
import { ButtonText } from '@/components/buttons';
import { Heading3XL } from '@/components/heading';
import { InputOtp } from '@/components/inputs';
import { PATH_AUTH, PATH_ROOT_ADMIN } from '@/constants/paths';
import { IConfirmOtp } from '@/interfaces/auth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import { useMoveBack } from '@/hooks';
import { maskEmail } from '@/utils';
import { SpinnerPage } from '@/components/loadings';

const ConfirmLayoutStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
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

const Title = styled.p`
  font-size: var(--font-size-12);
  color: var(--color-text-secondary);
  .email {
    font-weight: 700;
    cursor: pointer;
  }
`;

const From = styled.form`
  margin: 0 auto;
  padding: 1rem 1rem;
  margin-bottom: 5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  width: 40rem;
`;

const RefreshOtp = styled.p`
  font-size: var(--font-size-14);
  color: var(--color-primary);
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 1rem;
  margin-top: 2rem;
`;

export const ConfirmLayout = () => {
  const [otpValues, setOtpValues] = useState<Array<string>>(Array(6).fill(''));
  const [isDisplayEmail, setIsDisplayEmail] = useState<boolean>(false);
  const goBack = useMoveBack();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IConfirmOtp>();

  const { generateOtp } = useGenerateOTPApi();
  const { confirmOtp, isConfirmOtp } = useConfirmOTPApi();

  const onRefreshOtp = () => {
    generateOtp(null, {
      onSuccess: () => {
        // return toast.success(`Gửi mã OTP thành công, vui lòng kiểm email`);
      },
    });
  };

  const onSubmit = () => {
    const dataForm: IConfirmOtp = {
      OTPCode: otpValues.join(''),
    };
    if (dataForm.OTPCode.length !== 6)
      return toast.error('Mã OTP phải có 6 chữ số');
    confirmOtp(dataForm, {
      onSuccess: () =>
        navigate(
          `/${PATH_ROOT_ADMIN}/${PATH_AUTH.ROOT}/${PATH_AUTH.FEATURE.CONFIRM_RESET_PASSWORD}`
        ),
    });
  };

  useEffect(() => {});
  return (
    <ConfirmLayoutStyle>
      {isConfirmOtp && <SpinnerPage />}
      <HeadingBox>
        <IoReturnDownBackOutline onClick={goBack} />
        <Heading3XL $isBold>Xác nhận OTP</Heading3XL>
      </HeadingBox>
      <Title>
        Nhập mã OTP được gửi qua email{' '}
        <span
          className='email'
          onClick={() => setIsDisplayEmail(!isDisplayEmail)}
        >
          {maskEmail('hson22102000@gmail.com', isDisplayEmail)}
        </span>
      </Title>
      <From onSubmit={handleSubmit(onSubmit)}>
        <InputOtp otpValues={otpValues} setOtpValues={setOtpValues} />
        <RefreshOtp onClick={onRefreshOtp}>Gửi lại mã</RefreshOtp>
        <ButtonText>Xác nhận</ButtonText>
      </From>
    </ConfirmLayoutStyle>
  );
};
