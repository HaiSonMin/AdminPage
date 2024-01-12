import { FormBasic } from '@/components/forms';
import { PopupForm } from '@/components/popups/popup-form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ButtonSubmit, ButtonText } from '@/components/buttons';
import { useVoucherApiCreate } from '@/apis-use';
import { IVoucherCreateDto } from '@/interfaces/models/voucher';
import { InputInfo, InputSelectSingle } from '@/components/inputs';
import { randomId } from '@mantine/hooks';
import { EVoucherType } from '@/enums';
import { useWebApiGetAll } from '@/apis-use/UseWebApi';
import { useQueriesString } from '@/hooks/useQueriesString';
import { getMaxItems, getQueries } from '@/utils';
import { CreateIcon } from '../../common';
import { IoAddSharp } from 'react-icons/io5';
import { SpinnerPage } from '@/components/loadings';

const BoxBtnAction = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export function FeatureCreateVoucher() {
  const [isDisplayPop, setIsDisplayPop] = useState<boolean>(false);
  const { createVoucher, isCreatingVoucher } = useVoucherApiCreate();
  const queryString = useQueriesString();
  const query = getQueries(queryString);
  const { isGettingWebs, metadata } = useWebApiGetAll({
    ...query,
    limit: getMaxItems(),
  });

  const [selectType, setSelectType] = useState<string>(EVoucherType.FIX_AMOUNT);
  const [selectSource, setSelectSource] = useState<string>();

  const {
    handleSubmit,
    formState: { errors },
    watch,
    register,
    reset,
  } = useForm<IVoucherCreateDto>();

  const onCreating = () => setIsDisplayPop(!isDisplayPop);

  const onClose = () => setIsDisplayPop(false);

  const onSelectType = (value: string) => {
    setSelectType(value);
  };

  const onSelectSource = (value: string) => {
    setSelectSource(value);
  };

  const onSubmit = (dataForm: IVoucherCreateDto) => {
    const dataCreate: IVoucherCreateDto = {
      ...dataForm,
      voucher_type: selectType,
      voucher_web: selectSource,
    };

    createVoucher(dataCreate, {
      onSuccess: (res) => {
        reset();
        onClose();
      },
    });
  };

  return (
    <>
      {isCreatingVoucher && <SpinnerPage />}
      <CreateIcon onClick={onCreating}>
        <IoAddSharp />
      </CreateIcon>
      <PopupForm
        title='Thêm voucher'
        close={onClose}
        isDisplay={isDisplayPop}
        typeAction='create'
      >
        <FormBasic onSubmit={handleSubmit(onSubmit)}>
          <InputInfo
            hasValue={!!watch('voucher_name')}
            label='Tên voucher'
            register={register('voucher_name', {
              required: {
                message: 'Vui lòng bổ sung tên voucher',
                value: true,
              },
            })}
            type='text'
            error={errors.voucher_name?.message}
            id={randomId()}
            isRequired
          />
          <InputSelectSingle
            options={[
              { label: 'Tiền mặt (vnđ)', value: EVoucherType.FIX_AMOUNT },
              { label: 'Phần trăm (%)', value: EVoucherType.PERCENTAGE },
            ]}
            onChange={onSelectType}
            placeholder='Chọn loại voucher'
            isRequired
            defaultValue={EVoucherType.FIX_AMOUNT}
          />
          <InputInfo
            hasValue={!!watch('voucher_value')}
            label='Giá trị voucher'
            register={register('voucher_value', {
              required: {
                message: 'Vui lòng bổ sung giá trị voucher',
                value: true,
              },
              validate: (valueEntry) => {
                if (
                  watch('voucher_type') === EVoucherType.FIX_AMOUNT &&
                  parseInt(valueEntry) < 50_000
                )
                  return 'Giá trị voucher phải >= 50000vnđ';
                if (
                  watch('voucher_type') === EVoucherType.PERCENTAGE &&
                  (parseInt(valueEntry) <= 0 || parseInt(valueEntry) > 100)
                )
                  return 'Giá trị phải "lớn hơn" 0 và "nhỏ hơn" 100';
              },
            })}
            type='text'
            error={errors.voucher_name?.message}
            id={randomId()}
            isRequired
          />
          <InputSelectSingle
            options={metadata?.items?.map((web) => {
              return { label: web.web_name, value: web._id };
            })}
            onChange={onSelectSource}
            placeholder='Nguồn sự kiện'
            isLoading={isGettingWebs}
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
