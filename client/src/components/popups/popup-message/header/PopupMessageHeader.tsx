import { HeadingMD, HeadingSM } from '@/components/heading';
import styled from 'styled-components';
import { MdOutlineGroupAdd } from 'react-icons/md';
const PopupMessageHeaderStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.8rem 2.2rem;
  line-height: 1;
`;

const IConAddUser = styled(MdOutlineGroupAdd)`
  cursor: pointer;
  color: var(--color-text-secondary) !important;
`;

export const PopupMessageHeader = () => {
  const handleAddUser = () => {};

  return (
    <PopupMessageHeaderStyle>
      <HeadingMD $isBold>Chat</HeadingMD>
      <IConAddUser onClick={handleAddUser} />
    </PopupMessageHeaderStyle>
  );
};
