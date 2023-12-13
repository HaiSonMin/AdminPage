import styled, { css } from 'styled-components';
import { PopupUserHeader } from './header';
import { PopupUserBody } from './body';
import { PopupUserFooter } from './footer';

const PopupUserStyle = styled.div<{ $isDisplay: boolean }>`
  min-width: 30rem;
  max-width: 40rem;
  position: absolute;
  left: -26.2rem;
  top: 5rem;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: var(--border-radius-md);
  z-index: 101;
  min-height: 20rem;
  transition: all 0.3s;
  ${(props) =>
    props.$isDisplay
      ? css`
          opacity: 1;
        `
      : css`
          pointer-events: none;
          opacity: 0;
        `}

  &::after {
    display: block;
    content: '';
    position: absolute;
    right: 8px;
    top: -20px;
    border: 10px solid transparent;
    border-bottom-color: #fff;
  }
`;

interface IProps {
  isDisplay: boolean;
}

export const PopupUser = ({ isDisplay }: IProps) => {
  return (
    <PopupUserStyle $isDisplay={isDisplay} onClick={(e) => e.stopPropagation()}>
      <PopupUserHeader />
      <PopupUserBody />
      <PopupUserFooter />
    </PopupUserStyle>
  );
};
