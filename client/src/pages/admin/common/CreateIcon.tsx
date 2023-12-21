import styled from 'styled-components';

export const CreateIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: var(--border-radius-cyc);
  padding: 4px;
  font-weight: 500;
  font-size: var(--font-size-14);
  cursor: pointer;
  transition: all 0.2s;

  svg {
    width: 2rem;
    height: 2rem;
    transition: inherit;
  }

  &:hover {
    background-color: var(--color-primary);
    box-shadow: 0 0 0 5px var(--color-primary-light);
    svg {
      color: #fff;
      transform: rotateZ(90deg);
    }
  }
`;
