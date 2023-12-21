import { PopupFieldsTable } from '@/components/popups/popup-fields-table';
import { useState } from 'react';
import { BiFilterAlt } from 'react-icons/bi';
import styled from 'styled-components';

const IconFilter = styled(BiFilterAlt)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  color: var(--color-text-secondary);
`;

export function FilterTable() {
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
