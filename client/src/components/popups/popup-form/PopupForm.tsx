import { Heading3XL, HeadingMD, HeadingSM } from '@/components/heading';
import styled, { css } from 'styled-components';
import { Overlay } from '../Overlay';
import { IoClose } from 'react-icons/io5';
const PopupFormStyle = styled.div<{ $isDisplay: boolean }>`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem;
  border-radius: var(--border-radius-md);
  background-color: #fff;
  box-shadow: var(--shadow-around);
  min-height: fit-content;
  min-width: fit-content;
  z-index: 100;
  transition: all 0.5s;
  ${(props) =>
    !props.$isDisplay
      ? css`
          opacity: 0;
          top: 100%;
          pointer-events: none;
        `
      : css`
          opacity: 1;
          top: 50%;
        `}
`;

const BtnClose = styled(IoClose)`
  position: absolute;
  top: 7px;
  right: 7px;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--color-text-secondary);
  &:hover {
    color: var(--color-text);
    scale: 1.1;
  }
`;

const Heading = styled(HeadingMD)`
  color: var(--color-primary);
`;

interface IProp {
  isDisplay: boolean;
  title: string;
  children: React.ReactNode;
  close: () => void;
}

export function PopupForm({ title, isDisplay, children, close }: IProp) {
  return (
    <>
      <Overlay $isDisplay={isDisplay} onClick={close} />
      <PopupFormStyle $isDisplay={isDisplay}>
        <BtnClose onClick={close} />
        <Heading $isBold>{title.toLocaleUpperCase()}</Heading>
        {children}
      </PopupFormStyle>
    </>
  );
}
