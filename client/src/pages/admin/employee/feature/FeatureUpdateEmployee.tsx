import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { randomId } from '@mantine/hooks';
import { FormBasic } from '@/components/forms';
import { InputAuth, InputSelectSingle } from '@/components/inputs';
import { ButtonSubmit, ButtonText } from '@/components/buttons';
import { IEmployeeUpdateDto } from '@/interfaces/models';
import { PopupForm } from '@/components/popups/popup-form';
import { SpinnerPage } from '@/components/loadings';
import { useEmployeeApiGetById, useEmployeeApiUpdate } from '@/apis-use';
import { validateEmail, validatePhoneNumber } from '@/utils';
import { EGender, ERole } from '@/enums';

const BoxBtnAction = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

interface IProps {
  id: string;
  close: () => void;
  isDisplay: boolean;
}

export function FeatureUpdateEmployee({ id, isDisplay, close }: IProps) {
  const { metadata: employee, isGettingEmployee } = useEmployeeApiGetById(id);
  const { updateEmployee, isUpdatingEmployee } = useEmployeeApiUpdate();
  const [selectRole, setSelectRole] = useState<string>('');
  const [selectGender, setSelectGender] = useState<string>('');

  const {
    handleSubmit,
    formState: { errors },
    watch,
    register,
    reset,
    setValue,
  } = useForm<IEmployeeUpdateDto>();

  const onSelectRole = (value: string) => {
    setSelectRole(value);
  };
  const onSelectGender = (value: string) => {
    setSelectGender(value);
  };

  const onSubmit = (dataForm: IEmployeeUpdateDto) => {
    const dataUpdate: IEmployeeUpdateDto = {
      ...dataForm,
      employee_role: selectRole,
      employee_gender: selectGender,
    };

    updateEmployee(
      { employeeId: id, employeeUpdateDto: dataUpdate },
      {
        onSuccess: (res) => {
          close();
          reset();
        },
      }
    );
  };

  useEffect(() => {
    if (!isGettingEmployee && employee) {
      Object.keys(employee).forEach((key) => {
        setValue(key as keyof IEmployeeUpdateDto, employee[key]);
      });
      setSelectRole(employee?.employee_role);
      setSelectGender(employee?.employee_gender);
    }
  }, [employee, isGettingEmployee, setValue]);

  const isLoading = isGettingEmployee || isUpdatingEmployee;

  return (
    <>
      {isLoading ? (
        <SpinnerPage />
      ) : (
        <PopupForm
          title='Cập nhật thông tin'
          close={close}
          isDisplay={isDisplay}
          typeAction='update'
        >
          <FormBasic onSubmit={handleSubmit(onSubmit)}>
            <InputAuth
              hasValue={!!watch('employee_fullName')}
              label='Họ và Tên'
              register={register('employee_fullName', {
                required: {
                  message: 'Vui lòng bổ sung họ và tên',
                  value: true,
                },
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
                validate: (emailEntry) => {
                  if (!validateEmail(`${emailEntry}`))
                    return 'Email không hợp lệ';
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
                validate: (phoneNumberEntry) => {
                  if (!validatePhoneNumber(`${phoneNumberEntry}`))
                    return 'Số điện thoại không hợp lệ';
                },
              })}
              type='text'
              error={errors.employee_phoneNumber?.message}
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
              defaultValue={employee?.employee_gender}
            />
            <InputSelectSingle
              placeholder='Chọn phòng ban'
              options={[
                { label: 'Sale', value: ERole.SALE },
                { label: 'Marketing', value: ERole.MKT },
              ]}
              onChange={onSelectRole}
              isRequired
              defaultValue={employee?.employee_role}
            />
            <BoxBtnAction>
              <ButtonSubmit $isPrimarySolid>Cập nhật</ButtonSubmit>
              <ButtonText onClick={close}>Hủy</ButtonText>
            </BoxBtnAction>
          </FormBasic>
        </PopupForm>
      )}
    </>
  );
}
