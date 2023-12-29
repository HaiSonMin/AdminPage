import styled from 'styled-components';
import { IoOptionsOutline } from 'react-icons/io5';
import { PopupFieldsTable } from '@/components/popups/popup-fields-table';
import { useState } from 'react';
import { IItemDrag } from '@/interfaces/common';

const IconFilter = styled(IoOptionsOutline)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  color: var(--color-text-secondary);
`;

interface IProps {
  tableName: string;
  fieldHidden: IItemDrag[];
  fieldDisplay: IItemDrag[];
  setFieldHidden: React.Dispatch<React.SetStateAction<IItemDrag[]>>;
  setFieldDisplay: React.Dispatch<React.SetStateAction<IItemDrag[]>>;
  setHeadersTable: React.Dispatch<React.SetStateAction<IItemDrag[]>>;
  handleAddFieldHidden: (numberDisplay: number) => void;
  handleAddFieldDisplay: (numberHidden: number) => void;
}

export function SelectFieldsTable({
  tableName,
  fieldDisplay,
  fieldHidden,
  setFieldHidden,
  setFieldDisplay,
  setHeadersTable,
  handleAddFieldHidden,
  handleAddFieldDisplay,
}: IProps) {
  const [isDisplayPopup, setIsDisplayPopup] = useState<boolean>(false);

  const onClosePopup = () => setIsDisplayPopup(false);
  const onDisplayPopup = () => setIsDisplayPopup(true);

  return (
    <>
      <IconFilter onClick={onDisplayPopup} />
      <PopupFieldsTable
        tableName={tableName}
        fieldHidden={fieldHidden}
        fieldDisplay={fieldDisplay}
        setFieldHidden={setFieldHidden}
        setFieldDisplay={setFieldDisplay}
        handleAddFieldHidden={handleAddFieldHidden}
        handleAddFieldDisplay={handleAddFieldDisplay}
        title='Chọn trường'
        onConfirm={setHeadersTable}
        close={onClosePopup}
        isDisplay={isDisplayPopup}
      />
    </>
  );
}
