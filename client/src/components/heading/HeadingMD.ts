import styled, { css } from 'styled-components';

export const HeadingMD = styled.h5<{ $isBold?: boolean }>`
  font-size: 1.8rem;
  font-weight: 500;
  ${(props) =>
    props.$isBold &&
    css`
      font-weight: 700;
    `}
`;
