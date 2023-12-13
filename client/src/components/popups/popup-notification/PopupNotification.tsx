import styled, { css } from 'styled-components';
import { PopupNotificationHeader } from './header';
import { PopupNotificationBody } from './body';
import { PopupNotificationFooter } from './footer';

const PopupNotificationStyled = styled.div<{ $isDisplay: boolean }>`
  min-width: 50rem;
  max-width: 60rem;
  max-height: 54rem;
  position: absolute;
  left: -40.5rem;
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
    right: 65px;
    top: -20px;
    border: 10px solid transparent;
    border-bottom-color: #fff;
  }
`;

interface IProps {
  isDisplay: boolean;
}

export function PopupNotification({ isDisplay }: IProps) {
  return (
    <PopupNotificationStyled
      $isDisplay={isDisplay}
      onClick={(e) => e.stopPropagation()}
    >
      <PopupNotificationHeader />
      <PopupNotificationBody />
      <PopupNotificationFooter />
    </PopupNotificationStyled>
  );
}
