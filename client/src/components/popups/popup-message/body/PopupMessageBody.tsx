import { InputSearch } from '@/components/inputs';
import { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineHistory } from 'react-icons/md';
import { ItemChat } from './item-chat';
const PopupMessageBodyStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
`;

const BoxInput = styled.div`
  padding: 0 2.2rem;
`;

const Title = styled.p`
  padding: 0 2.2rem;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-secondary);
  font-weight: 500;
  svg {
    color: inherit !important;
  }
`;

const ListItemChat = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const PopupMessageBody = () => {
  const [changeInput, setChangeInput] = useState<string>('');

  return (
    <PopupMessageBodyStyle>
      <BoxInput>
        <InputSearch />
      </BoxInput>
      <Title>
        <MdOutlineHistory /> Trò chuyện gần đây
      </Title>
      <ListItemChat>
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
      </ListItemChat>
    </PopupMessageBodyStyle>
  );
};
