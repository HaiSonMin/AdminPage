import styled, { css } from 'styled-components';
import { PopupMessageHeader } from './header';
import { PopupMessageBody } from './body';
import { PopupMessageFooter } from './footer';

const PopupMessageStyled = styled.div<{ $isDisplay: boolean }>`
  width: 37rem;
  max-height: 54rem;
  /* height: 54rem; */
  position: absolute;
  left: -22.5rem;
  top: 5rem;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: var(--border-radius-md);
  z-index: 101;
  transition: all 0.3s;
  cursor: auto;
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
    right: 115px;
    top: -20px;
    border: 10px solid transparent;
    border-bottom-color: #fff;
  }
`;

interface IProps {
  isDisplay: boolean;
}

export function PopupMessage({ isDisplay }: IProps) {
  return (
    <PopupMessageStyled
      $isDisplay={isDisplay}
      onClick={(e) => e.stopPropagation()}
    >
      <PopupMessageHeader />
      <PopupMessageBody />
      <PopupMessageFooter />
    </PopupMessageStyled>
  );
}
