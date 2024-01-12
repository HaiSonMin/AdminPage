import styled, { css } from 'styled-components';

export const HeadingXL = styled.h3<{ $isBold?: boolean }>`
  font-size: 2.6rem;
  font-weight: 500;
  ${(props) =>
    props.$isBold &&
    css`
      font-weight: 700;
    `}
`;
