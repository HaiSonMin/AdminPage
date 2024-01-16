import styled from 'styled-components';
import { IoOptionsOutline } from 'react-icons/io5';
import { PopupFieldsTable } from '@/components/popups/popup-fields-table';
import { useState } from 'react';

const IconFilter = styled(IoOptionsOutline)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  color: var(--color-text-secondary);
`;

interface IProps {
  tableName: string;
}

export function SelectFieldsTable({ tableName }: IProps) {
  const [isDisplayPopup, setIsDisplayPopup] = useState<boolean>(false);

  const onClosePopup = () => setIsDisplayPopup(false);
  const onDisplayPopup = () => setIsDisplayPopup(true);

  return (
    <>
      <IconFilter onClick={onDisplayPopup} />
      <PopupFieldsTable
        tableName={tableName}
        title='Chọn trường'
        close={onClosePopup}
        isDisplay={isDisplayPopup}
      />
    </>
  );
}
