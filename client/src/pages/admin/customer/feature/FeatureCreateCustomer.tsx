import { FormBasic } from '@/components/forms';
import { PopupForm } from '@/components/popups/popup-form';
import { IEmployeeCreateDto } from '@/interfaces/models';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { IoAddSharp } from 'react-icons/io5';
import { InputAuth, InputSelectSingle } from '@/components/inputs';
import { randomId } from '@mantine/hooks';
import { validateEmail, validatePhoneNumber } from '@/utils';
import { ButtonSubmit, ButtonText } from '@/components/buttons';
import { useEmployeeApiCreate } from '@/apis-use';
import { EGender, ERole } from '@/enums';
import { SpinnerPage } from '@/components/loadings';
import { CreateIcon } from '../../common';

const BoxBtnAction = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export function FeatureCreateCustomer() {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const { createEmployee, isCreatingEmployee } = useEmployeeApiCreate();
  const [selectRole, setSelectRole] = useState<string>('');
  const [selectGender, setSelectGender] = useState<string>('');

  const {
    handleSubmit,
    formState: { errors },
    watch,
    register,
    reset,
  } = useForm<IEmployeeCreateDto>();

  const onCreating = () => setIsCreating(!isCreating);

  const onClose = () => setIsCreating(false);

  const onSelectRole = (value: string) => {
    setSelectRole(value);
  };
  const onSelectGender = (value: string) => {
    setSelectGender(value);
  };

  const onSubmit = (dataForm: IEmployeeCreateDto) => {
    const dataCreate: IEmployeeCreateDto = {
      ...dataForm,
      employee_role: selectRole,
      employee_gender: selectGender,
    };

    console.log('dataCreate::::', dataCreate);
    createEmployee(dataCreate, {
      onSuccess: (res) => {
        onClose();
        reset();
      },
    });
  };

  return (
    <>
      {isCreatingEmployee && <SpinnerPage />}
      <CreateIcon onClick={onCreating}>
        <IoAddSharp />
      </CreateIcon>
      <PopupForm
        title='Thêm nhân viên'
        close={onClose}
        isDisplay={isCreating}
        typeAction='create'
      >
        <FormBasic onSubmit={handleSubmit(onSubmit)}>
          <InputAuth
            hasValue={!!watch('employee_fullName')}
            label='Họ và Tên'
            register={register('employee_fullName', {
              required: { message: 'Vui lòng bổ sung họ và tên', value: true },
            })}
            type='text'
            error={errors.employee_fullName?.message}
            id={randomId()}
            isRequired
          />
          <InputAuth
            hasValue={!!watch('employee_email')}
            label='Email nhân viên'
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
            hasValue={!!watch('employee_phoneNumber')}
            label='Số điện thoại'
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
          <InputAuth
            hasValue={!!watch('employee_password')}
            label='Mật khẩu'
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
            label='Xác nhận lại mật khẩu'
            register={register('employee_confirmPassword', {
              required: { message: 'Vui lòng nhập lại mật khẩu', value: true },
              validate: (confirmPasswordEntry: string) => {
                if (confirmPasswordEntry !== watch('employee_password'))
                  return 'Mật khẩu xác nhận không khớp';
              },
            })}
            type='password'
            error={errors.employee_confirmPassword?.message}
            id={randomId()}
            isRequired
          />
          <InputSelectSingle
            placeholder='Chọn giới tính'
            options={[
              { label: 'Nam', value: EGender.MALE },
              { label: 'Nữ', value: EGender.FEMALE },
              { label: 'Khác', value: EGender.OTHER },
            ]}
            onChange={onSelectGender}
            isRequired
          />
          <InputSelectSingle
            placeholder='Chọn phòng ban'
            options={[
              { label: 'Sale', value: ERole.SALE },
              { label: 'Marketing', value: ERole.MKT },
            ]}
            onChange={onSelectRole}
            isRequired
          />
          <BoxBtnAction>
            <ButtonSubmit $isPrimarySolid>Tạo mới</ButtonSubmit>
            <ButtonText onClick={close}>Hủy</ButtonText>
          </BoxBtnAction>
        </FormBasic>
      </PopupForm>
    </>
  );
}
