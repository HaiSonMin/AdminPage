import styled, { css } from 'styled-components';

export const HeadingMD = styled.h5<{ $isBold?: boolean }>`
  font-size: 2rem;
  font-weight: 500;
  ${(props) =>
    props.$isBold &&
    css`
      font-weight: 700;
    `}
`;
