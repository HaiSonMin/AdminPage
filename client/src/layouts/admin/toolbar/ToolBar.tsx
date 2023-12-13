import { InputSearchV2 } from '@/components/inputs';
import React from 'react';
import styled from 'styled-components';

const ToolBarStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: #fff;
  border-radius: var(--border-radius-md);
  margin-bottom: 8px;
`;

const BoxBtnFeature = styled.div``;
const BoxSearch = styled.div``;

interface IProps {
  children: React.ReactNode;
}

export function ToolBar({ children }: IProps) {
  return (
    <ToolBarStyle>
      <BoxBtnFeature>{children}</BoxBtnFeature>
      <BoxSearch>
        <InputSearchV2 />
      </BoxSearch>
    </ToolBarStyle>
  );
}
