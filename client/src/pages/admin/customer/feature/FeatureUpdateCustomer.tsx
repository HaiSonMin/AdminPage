import { useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { randomId } from '@mantine/hooks';
import { FormBasic } from '@/components/forms';
import { InputAuth } from '@/components/inputs';
import { ButtonSubmit, ButtonText } from '@/components/buttons';
import { IWebUpdateDto } from '@/interfaces/models';
import { useWebApiGetById, useWebApiUpdate } from '@/apis-use/UseWebApi';
import { PopupForm } from '@/components/popups/popup-form';
import { SpinnerPage } from '@/components/loadings';

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

export function FeatureUpdateWeb({ id, isDisplay, close }: IProps) {
  const { metadata, isGettingWeb } = useWebApiGetById(id);

  const { updateWeb, isUpdatingWeb } = useWebApiUpdate();

  const {
    handleSubmit,
    formState: { errors },
    watch,
    register,
    reset,
    setValue,
  } = useForm<IWebUpdateDto>();

  const onSubmit = (dataForm: IWebUpdateDto) => {
    updateWeb(
      { webId: id, webUpdateDto: dataForm },
      {
        onSuccess: (res) => {
          close();
          reset();
        },
      }
    );
  };

  const isLoading = isGettingWeb || isUpdatingWeb;

  useEffect(() => {
    if (!isGettingWeb && metadata) {
      Object.keys(metadata).forEach((key) => {
        setValue(key as keyof IWebUpdateDto, metadata[key]);
      });
    }
  }, [metadata, isGettingWeb, setValue]);

  return (
    <>
      {isLoading && <SpinnerPage />}
      <PopupForm
        title='Chỉnh sửa sự kiện'
        close={close}
        isDisplay={isDisplay}
        typeAction='update'
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
            <ButtonSubmit $isPrimarySolid>Cập nhật</ButtonSubmit>
            <ButtonText onClick={close}>Hủy</ButtonText>
          </BoxBtnAction>
        </FormBasic>
      </PopupForm>
    </>
  );
}
