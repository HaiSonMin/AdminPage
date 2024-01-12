import { BtnClose, ButtonSubmit, ButtonText } from '@/components/buttons';
import { HeadingSM } from '@/components/heading';
import styled from 'styled-components';
import { PopupStyle } from '../common';
import { Overlay } from '../Overlay';
import { FormBasic } from '@/components/forms';
import { InputInfo } from '@/components/inputs';
import { useForm } from 'react-hook-form';
import { randomKey } from '@/utils';
import { IChangePassword } from '@/interfaces/auth';
import { useAuthApiChangePassword, useAuthApiLogout } from '@/apis-use';
import { SpinnerPage } from '@/components/loadings';
import toast from 'react-hot-toast';

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-grey-200);
  padding: 0 0 1rem;
  margin-bottom: 5px;
`;

const Heading = styled(HeadingSM)`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    margin-top: 2px;
  }
`;

const BoxBtnAction = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

interface IProp {
  isDisplay: boolean;
  title?: string;
  close: () => void;
  onChangePass: () => void;
}

export function PopupChangePass({
  isDisplay,
  title,
  close,
  onChangePass,
}: IProp) {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IChangePassword>();

  const { changePassword, isChangePass } = useAuthApiChangePassword();
  const { logout, isLogout } = useAuthApiLogout();

  const onSubmitChangePass = (dataForm: IChangePassword) => {
    console.log('dataForm:::', dataForm);
    changePassword(dataForm, {
      onSuccess: () => {
        reset();
        close();
        logout(null, {
          onSuccess: () => {
            toast.success('Vui lòng đăng nhập lại với mật khẩu mới');
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          },
        });
      },
    });
  };

  const isLoading = isLogout || isChangePass;

  return (
    <>
      {isLoading && <SpinnerPage />}
      <Overlay $isDisplay={isDisplay} onClick={close} />
      <PopupStyle $isDisplay={isDisplay}>
        <Header>
          <Heading>{title}</Heading>
          <BtnClose onClick={close} />
        </Header>
        <FormBasic onSubmit={handleSubmit(onSubmitChangePass)}>
          <InputInfo
            id={randomKey()}
            type='password'
            label='Nhập mật khẩu củ'
            hasValue={!!watch('employee_oldPassword')}
            error={errors?.employee_oldPassword?.message}
            register={register('employee_oldPassword', {
              required: {
                value: true,
                message: 'Vui lòng nhập đúng mật khẩu củ',
              },
            })}
            isRequired={true}
          />
          <InputInfo
            id={randomKey()}
            type='password'
            label='Nhập mật khẩu mới'
            hasValue={!!watch('employee_password')}
            error={errors?.employee_password?.message}
            register={register('employee_password', {
              required: {
                value: true,
                message: 'Vui lòng bổ sung mật khẩu',
              },
            })}
            isRequired={true}
          />
          <InputInfo
            id={randomKey()}
            type='password'
            label='Xác nhận mật khẩu mới'
            hasValue={!!watch('employee_confirmPassword')}
            error={errors?.employee_confirmPassword?.message}
            register={register('employee_confirmPassword', {
              required: {
                value: true,
                message: 'Vui lòng bổ sung mật khẩu xác nhận',
              },
              validate: (pas: string) => {
                if (pas !== watch('employee_password'))
                  return 'Mật khẩu xác nhận không khớp';
              },
            })}
            isRequired={true}
          />
          <BoxBtnAction>
            <ButtonSubmit $isPrimarySolid>Xác nhận</ButtonSubmit>
            <ButtonText onClick={close}>Hủy</ButtonText>
          </BoxBtnAction>
        </FormBasic>
      </PopupStyle>
    </>
  );
}
