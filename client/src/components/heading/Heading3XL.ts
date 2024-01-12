import styled, { css } from 'styled-components';

export const Heading3XL = styled.h1<{ $isBold?: boolean }>`
  font-size: 3.4rem;
  font-weight: 500;
  ${(props) =>
    props.$isBold &&
    css`
      font-weight: 700;
    `}
`;
