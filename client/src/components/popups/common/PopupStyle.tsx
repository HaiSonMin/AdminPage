import styled, { css, keyframes } from 'styled-components';

const move = keyframes`
  0% { 
    opacity: 0;
    top: 100%;
    
  }
  100% {
    opacity: 1;
    top: 50%;
  }
`;

export const PopupStyle = styled.div<{ $isDisplay: boolean; $width?: number }>`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: ${(props) => (props.$isDisplay ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem 1rem;
  border-radius: var(--border-radius-md);
  background-color: #fff;
  box-shadow: var(--shadow-around);
  min-height: fit-content;
  min-width: ${(props) => props.$width}rem;
  z-index: 100;
  animation: alternate ease-in-out ${move} 0.3s;
`;

PopupStyle.defaultProps = {
  $isDisplay: false,
  $width: 20,
};
