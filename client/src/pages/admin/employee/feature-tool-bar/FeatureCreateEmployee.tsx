import { FormBasic } from '@/components/forms';
import { PopupForm } from '@/components/popups/popup-form';
import { IEmployeeCreateDto } from '@/interfaces/models';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { FiUserPlus } from 'react-icons/fi';
import { InputAuth } from '@/components/inputs';
import { randomId } from '@mantine/hooks';
import { validateEmail, validatePhoneNumber } from '@/utils';
import { ButtonText } from '@/components/buttons';
const FeatureCreateEmployeeStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--border-radius-md);
  padding: 8px 1.2rem;
  font-weight: 500;
  font-size: var(--font-size-14);
  cursor: pointer;
`;

export function FeatureCreateEmployee() {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    register,
    reset,
  } = useForm<IEmployeeCreateDto>();

  const onCreating = () => setIsCreating(!isCreating);

  const onClose = () => setIsCreating(false);

  const onSubmit = (dataForm: IEmployeeCreateDto) => {};

  return (
    <>
      <FeatureCreateEmployeeStyle onClick={onCreating}>
        <FiUserPlus />
        Thêm nhân viên
      </FeatureCreateEmployeeStyle>
      <PopupForm title='Thêm nhân viên' close={onClose} isDisplay={isCreating}>
        <FormBasic onSubmit={handleSubmit(onSubmit)}>
          <InputAuth
            hasValue={!!watch('employee_fullName')}
            label='Nhập Họ và Tên nhân viên'
            register={register('employee_fullName', {
              required: { message: 'Vui lòng bổ sung họ và tên', value: true },
            })}
            type='text'
            error={errors.employee_fullName?.message}
            id={randomId()}
            isRequired
          />
          <InputAuth
            hasValue={!!watch('employee_userName')}
            label='Nhập tên đăng nhập'
            register={register('employee_userName', {
              required: {
                message: 'Vui lòng bổ sung tên người dùng',
                value: true,
              },
            })}
            type='text'
            error={errors.employee_userName?.message}
            id={randomId()}
            isRequired
          />
          <InputAuth
            hasValue={!!watch('employee_email')}
            label='Nhập email nhân viên'
            register={register('employee_email', {
              required: { message: 'Vui lòng bổ sung email', value: true },
              validate: (emailEntry: string) => {
                if (!validateEmail(emailEntry)) return 'Email không hợp lệ';
              },
            })}
            type='text'
            error={errors.employee_email?.message}
            id={randomId()}
            isRequired
          />
          <InputAuth
            hasValue={!!watch('employee_password')}
            label='Nhập mật khẩu'
            register={register('employee_password', {
              required: { message: 'Vui lòng bổ sung mật khẩu', value: true },
            })}
            type='password'
            error={errors.employee_password?.message}
            id={randomId()}
            isRequired
          />
          <InputAuth
            hasValue={!!watch('employee_confirmPassword')}
            label='Nhập mật khẩu'
            register={register('employee_confirmPassword', {
              required: { message: 'Vui lòng nhập lại mật khẩu', value: true },
              validate: (confirmPasswordEntry: string) => {
                if (confirmPasswordEntry !== watch('employee_password'))
                  return 'Mật khẩu xác nhận không khớp';
              },
            })}
            type='password'
            error={errors.employee_password?.message}
            id={randomId()}
            isRequired
          />
          <InputAuth
            hasValue={!!watch('employee_phoneNumber')}
            label='Nhập số điện thoại'
            register={register('employee_phoneNumber', {
              required: { message: 'Vui lòng bổ số điện thoại', value: true },
              validate: (phoneNumberEntry: string) => {
                if (!validatePhoneNumber(phoneNumberEntry))
                  return 'Số điện thoại không hợp lệ';
              },
            })}
            type='text'
            error={errors.employee_phoneNumber?.message}
            id={randomId()}
            isRequired
          />
          <ButtonText>Tạo nhân viên</ButtonText>
        </FormBasic>
      </PopupForm>
    </>
  );
}
