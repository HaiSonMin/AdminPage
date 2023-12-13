import styled, { css } from 'styled-components';

export const HeadingXL = styled.h3<{ $isBold?: boolean }>`
  font-size: 2.8rem;
  font-weight: 500;
  ${(props) =>
    props.$isBold &&
    css`
      font-weight: 700;
    `}
`;
