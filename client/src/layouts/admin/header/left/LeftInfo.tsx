import styled from 'styled-components';
import { IoSettingsOutline } from 'react-icons/io5';

const LeftInfoStyle = styled.div`
  font-size: var(--font-size-16);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconSetting = styled(IoSettingsOutline)`
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    scale: 1.1;
    transform: rotate(90deg);
    color: var(--color-primary);
  }
`;

export const LeftInfo = () => {
  return (
    <LeftInfoStyle>
      <span>{'Nguyễn Lâm Hải Sơn'.toUpperCase()}</span>
      <IconSetting />
    </LeftInfoStyle>
  );
};
