import styled from 'styled-components';
import { IoSettingsOutline } from 'react-icons/io5';
import { LOCAL_STORE_KEYS } from '@/constants/values';
import { useEffect, useState } from 'react';
import { IDataLocalUser } from '@/interfaces/common';

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
      <span>
        {`${
          (
            JSON.parse(
              `${localStorage.getItem(LOCAL_STORE_KEYS.DATA_USER)}`
            ) as IDataLocalUser
          ).employee_fullName
        }`.toUpperCase()}
      </span>
      <IconSetting />
    </LeftInfoStyle>
  );
};
