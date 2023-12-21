import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { randomId } from '@mantine/hooks';
import { FormBasic } from '@/components/forms';
import { InputAuth } from '@/components/inputs';
import { ButtonSubmit, ButtonText } from '@/components/buttons';
import { IWebCreateDto } from '@/interfaces/models';
import { useWebApiCreate } from '@/apis-use/UseWebApi';
import { PopupForm } from '@/components/popups/popup-form';
import { CreateIcon } from '../../common';
import { IoAddSharp } from 'react-icons/io5';
import { SpinnerPage } from '@/components/loadings';
import styled from 'styled-components';

const BoxBtnAction = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export function FeatureCreateWeb() {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const { createWeb, isCreatingWeb } = useWebApiCreate();

  const {
    handleSubmit,
    formState: { errors },
    watch,
    register,
    reset,
  } = useForm<IWebCreateDto>();

  const onCreating = () => setIsCreating(!isCreating);

  const onClose = () => setIsCreating(false);

  const onSubmit = (dataForm: IWebCreateDto) => {
    createWeb(dataForm, {
      onSuccess: (res) => {
        onClose();
        reset();
      },
    });
  };

  return (
    <>
      {isCreatingWeb && <SpinnerPage />}
      <CreateIcon onClick={onCreating}>
        <IoAddSharp />
      </CreateIcon>
      <PopupForm
        title='Thêm nguồn sự kiện'
        close={onClose}
        isDisplay={isCreating}
        typeAction='create'
      >
        <FormBasic onSubmit={handleSubmit(onSubmit)}>
          <InputAuth
            hasValue={!!watch('web_name')}
            label='Tên web'
            register={register('web_name', {
              required: { message: 'Vui lòng bổ sung tên web', value: true },
            })}
            type='text'
            error={errors.web_name?.message}
            id={randomId()}
            isRequired
          />
          <InputAuth
            hasValue={!!watch('web_url')}
            label='Đường dẫn web'
            register={register('web_url', {
              required: {
                message: 'Vui lòng bổ sung đường dẫn web',
                value: true,
              },
            })}
            type='text'
            error={errors.web_url?.message}
            id={randomId()}
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
