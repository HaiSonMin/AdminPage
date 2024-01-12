import { TfiClose } from 'react-icons/tfi';
import styled from 'styled-components';

export const BtnClose = styled(TfiClose)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--color-primary);
  &:hover {
    color: var(--color-text);
    scale: 1.1;
  }
`;
