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

export function SelectFieldsTable() {
  const [isDisplayPopup, setIsDisplayPopup] = useState<boolean>(false);

  const onClosePopup = () => setIsDisplayPopup(false);
  const onDisplayPopup = () => setIsDisplayPopup(true);

  return (
    <>
      <IconFilter onClick={onDisplayPopup} />
      <PopupFieldsTable
        title='Chọn trường'
        onConfirm={() => {}}
        close={onClosePopup}
        isDisplay={isDisplayPopup}
      />
    </>
  );
}
