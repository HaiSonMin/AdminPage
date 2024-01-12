import styled, { css } from 'styled-components';

export const HeadingLarge = styled.h4<{ $isBold?: boolean }>`
  font-size: 2.2rem;
  font-weight: 500;
  ${(props) =>
    props.$isBold &&
    css`
      font-weight: 700;
    `}
`;
