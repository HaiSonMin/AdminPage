import React from 'react';
import styled from 'styled-components';
import { TbFileExport } from 'react-icons/tb';
import { BsPatchQuestion } from 'react-icons/bs';
const ToolBarStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 1.5rem;
  background-color: #fff;
  border-radius: var(--border-radius-md);
  margin-bottom: 8px;
`;

const BoxAction = styled.div``;
const BoxMoreAction = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  color: var(--color-text-secondary);
  font-weight: 500;
  font-size: var(--font-size-10);
  gap:1.5rem;
  .item-action {
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    cursor: pointer;
    border-radius: var(--border-radius-md);
    transition: all 0.2s;

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }

    &:hover {
      color: var(--color-primary);
      background-color: var(--color-primary-light);
    }
  }
`;

interface IProps {
  children: React.ReactNode;
}

export function ToolBar({ children }: IProps) {
  return (
    <ToolBarStyle>
      <BoxAction>{children}</BoxAction>
      <BoxMoreAction>
        <div className='item-action'>
          <TbFileExport />
          <span>Export</span>
        </div>
        <div className='item-action'>
          <BsPatchQuestion />
          <span>HDSD</span>
        </div>
      </BoxMoreAction>
    </ToolBarStyle>
  );
}
