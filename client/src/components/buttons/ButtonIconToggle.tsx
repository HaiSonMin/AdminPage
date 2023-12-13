/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { useState } from 'react';
interface IProps {
  iconBase: React.ReactNode;
  iconChange: React.ReactNode;
  onClick?: any;
  isClicked: boolean;
  width?: number;
  height?: number;
  size?: number;
}

const ButtonIconToggleStyle = styled.div`
  display: inline-block;
  border-radius: '4px';
  background-color: '#fff';
  padding: '1rem';
  cursor: pointer;
  font-size: var(--font-size-20);
`;

export const ButtonIconToggle = ({
  iconBase,
  iconChange,
  onClick,
  isClicked,
  width,
  height,
  size,
}: IProps) => {
  return (
    <ButtonIconToggleStyle onClick={onClick}>
      {!isClicked ? iconBase : iconChange}
    </ButtonIconToggleStyle>
  );
};
