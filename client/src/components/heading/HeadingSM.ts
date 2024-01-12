import styled, { css } from 'styled-components';

export const HeadingSM = styled.h6<{ $isBold?: boolean }>`
  font-size: 1.4rem;
  ${(props) =>  
    props.$isBold
      ? css`
          font-weight: 700;
        `
      : css`
          font-weight: 500;
        `}
`;
