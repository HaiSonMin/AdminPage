import { BtnClose, ButtonSubmit, ButtonText } from '@/components/buttons';
import { Overlay } from '../Overlay';
import { PopupStyle } from '../common';
import { HeadingSM } from '@/components/heading';
import styled from 'styled-components';
import { InputSelectMulti } from '@/components/inputs';
import { useEffect, useState } from 'react';
import { IOptionInput } from '@/interfaces/common';
import { useSelector } from 'react-redux';
import { getStateItemsTable } from '@/slices/itemSlice';
import { exportExcel } from '@/helpers';
import { IBodyTable } from '@/interfaces/common/table';

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-grey-200);
  padding: 0 0 1rem;
`;

const BtnBoxAction = styled.div`
  width: 100%;
  padding-top: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;

const Heading = styled(HeadingSM)`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-text);
  svg {
    margin-top: 2px;
  }
`;

interface IProp {
  isDisplay: boolean;
  title: string;
  close: () => void;
  onConfirm: () => void;
  options: { [key: string]: string };
}

export function PopupExportFields({
  close,
  isDisplay,
  onConfirm,
  title,
  options,
}: IProp) {
  const [optionsInput, setOptionsInput] = useState<IOptionInput[]>([]);
  const [valuesSelected, setValuesSelected] = useState<string[]>([]);
  const itemsTable = useSelector(getStateItemsTable) as IBodyTable[];

  const handleChangeSelect = (values: string[]) => {
    setValuesSelected(values);
  };

  const onConfirmExport = () => {
    // const dataExport:;
    type TypeItemData = { [key: string]: string };
    const listDataExport: TypeItemData[] = [];

    itemsTable.forEach((item) => {
      const itemDataExport: TypeItemData = {};
      item.dataTable?.forEach((col) => {
        if (valuesSelected.includes(col.columnKey)) {
          itemDataExport[col.columnName] = col.columnVal;
        }
      });
      listDataExport.push(itemDataExport);
    });

    exportExcel({
      csvData: listDataExport,
      fileName: 'file_export_test',
    });
  };

  useEffect(() => {
    const optionsTmp: IOptionInput[] = [];
    for (const item in options) {
      optionsTmp.push({ label: options[item], value: item });
    }
    setOptionsInput(optionsTmp);
  }, [options]);

  return (
    <>
      <Overlay $isDisplay={isDisplay} onClick={close} />
      <PopupStyle $isDisplay={isDisplay} $width={50}>
        <Header>
          <Heading>{title}</Heading>
          <BtnClose onClick={close} />
        </Header>
        <InputSelectMulti
          placeholder='Chọn trường export'
          options={optionsInput}
          defaultValue={[]}
          handleChangeSelect={handleChangeSelect}
        />
        <BtnBoxAction>
          <ButtonSubmit onClick={onConfirmExport} $isPrimarySolid>
            Xác nhận
          </ButtonSubmit>
          <ButtonText onClick={close}>Cancel</ButtonText>
        </BtnBoxAction>
      </PopupStyle>
    </>
  );
}
