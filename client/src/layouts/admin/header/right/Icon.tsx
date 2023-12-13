import styled from 'styled-components';

export const Icon = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  &:hover {
    background-color: var(--color-primary-light);

    svg {
      color: var(--color-primary);
      scale: 1.1;
    }
  }
  svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-text-secondary);
    transition: all 0.5s;
  }
`;
