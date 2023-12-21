import styled, { css } from 'styled-components';

export const ButtonText = styled.div<{
  $isDanger?: boolean;
  $isPrimary?: boolean;
  $isPrimarySolid?: boolean;
}>`
  text-align: center;
  display: inline-block;
  min-width: 10rem;
  padding: 8px 2.4rem;
  font-size: var(--font-size-14);
  font-weight: 500;
  transition: all 0.3s;
  border-radius: var(--border-radius-md);
  background-color: transparent;
  border: 1px solid var(--color-grey-300);
  color: var(--color-text);
  cursor: pointer;

  ${(props) =>
    props.$isPrimary &&
    css`
      color: var(--color-primary);
      border-color: 1px solid var(--color-primary);
    `}
  ${(props) =>
    props.$isPrimarySolid &&
    css`
      color: var(--color-white);
      background-color: var(--color-primary);
      border-color: 1px solid var(--color-primary);
    `}

  ${(props) =>
    props.$isDanger &&
    css`
      border-color: var(--color-danger);
      background-color: var(--color-danger);
      color: var(--color-white);
    `}
  
  &:hover {
    scale: 0.97;
    box-shadow: var(--shadow-around);
  }

  &:focus,
  &:active {
    outline: none;
    border: none;
  }
`;
