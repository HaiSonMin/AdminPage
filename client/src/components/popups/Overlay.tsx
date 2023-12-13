import styled, { css } from 'styled-components';

export const Overlay = styled.div<{ $isDisplay: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 100;
  transition: all 0.1s;
  ${(props) =>
    props.$isDisplay
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `}
`;
