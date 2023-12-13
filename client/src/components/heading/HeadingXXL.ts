import styled, { css } from 'styled-components';

export const HeadingXXL = styled.h2<{ $isBold?: boolean }>`
  font-size: 3.2rem;
  font-weight: 500;
  ${(props) =>
    props.$isBold &&
    css`
      font-weight: 700;
    `}
`;
