import styled from 'styled-components';

export const ButtonText = styled.button<{ $isLoading?: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: fit-content;
  padding: 8px 2.4rem;
  font-size: var(--font-size-14);
  background-color: var(--color-primary);
  border-radius: 5px;
  color: var(--color-white);
  font-weight: 500;
  transition: all 0.3s;
  &:hover {
    scale: 0.98;
    box-shadow: var(--shadow-around);
  }
`;
