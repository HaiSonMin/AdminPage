import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { randomId } from '@mantine/hooks';
import { FormBasic } from '@/components/forms';
import { InputAuth, InputSelectSingle } from '@/components/inputs';
import { ButtonSubmit, ButtonText } from '@/components/buttons';
import { IVoucherUpdateDto, IWebUpdateDto } from '@/interfaces/models';
import { PopupForm } from '@/components/popups/popup-form';
import { SpinnerPage } from '@/components/loadings';
import { useVoucherApiGetById, useVoucherApiUpdate } from '@/apis-use';
import { EVoucherType } from '@/enums';
import { useWebApiGetAll } from '@/apis-use/UseWebApi';
import { getMaxItems, getQueries } from '@/utils';
import { useQueriesString } from '@/hooks';

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

export function FeatureUpdateVoucher({ id, isDisplay, close }: IProps) {
  const { metadata: voucher, isGettingVoucher } = useVoucherApiGetById(id);
  const { updateVoucher, isUpdatingVoucher } = useVoucherApiUpdate();
  const queryString = useQueriesString();
  const query = getQueries(queryString);
  const { isGettingWebs, metadata: webs } = useWebApiGetAll({
    ...query,
    limit: getMaxItems(),
  });

  const [selectType, setSelectType] = useState<string>();
  const [selectSource, setSelectSource] = useState<string>();

  const {
    handleSubmit,
    formState: { errors },
    watch,
    register,
    reset,
    setValue,
  } = useForm<IVoucherUpdateDto>();

  const onSelectType = (value: string) => {
    setSelectType(value);
  };

  const onSelectSource = (value: string) => {
    setSelectSource(value);
  };

  const onSubmit = (dataForm: IVoucherUpdateDto) => {
    const dataUpdate: IVoucherUpdateDto = {
      ...dataForm,
      voucher_type: selectType,
      voucher_web: selectSource,
    };
    updateVoucher(
      { voucherId: id, voucherUpdateDto: dataUpdate },
      {
        onSuccess: (res) => {
          close();
          reset();
        },
      }
    );
  };

  const isLoading = isGettingVoucher || isUpdatingVoucher;

  useEffect(() => {
    if (!isGettingVoucher && voucher) {
      Object.keys(voucher).forEach((key) => {
        setValue(key as keyof IVoucherUpdateDto, voucher[key]);
      });
      setSelectType(voucher.voucher_type);
      setSelectSource(voucher.voucher_web);
    }
  }, [voucher, isGettingVoucher, setValue]);

  return (
    <>
      {isLoading ? (
        <SpinnerPage />
      ) : (
        <PopupForm
          title='Cập nhật voucher'
          close={close}
          isDisplay={isDisplay}
          typeAction='update'
        >
          <FormBasic onSubmit={handleSubmit(onSubmit)}>
            <InputAuth
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
                { label: 'Đơn vị (vnđ)', value: EVoucherType.FIX_AMOUNT },
                { label: 'Phần trăm (%)', value: EVoucherType.PERCENTAGE },
              ]}
              onChange={onSelectType}
              placeholder='Chọn loại voucher'
              isRequired
              defaultValue={`${voucher?.voucher_type}`}
            />
            <InputAuth
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
                    parseInt(`${valueEntry}`) < 50_000
                  )
                    return 'Giá trị voucher phải >= 50000vnđ';
                  if (
                    watch('voucher_type') === EVoucherType.PERCENTAGE &&
                    (parseInt(`${valueEntry}`) <= 0 ||
                      parseInt(`${valueEntry}`) > 100)
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
              // defaultValue={`${voucher?.voucher_web}`}
              options={webs?.items.map((web) => {
                return { label: web.web_name, value: web._id };
              })}
              onChange={onSelectSource}
              placeholder='Nguồn sự kiện'
              isLoading={isGettingWebs}
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
