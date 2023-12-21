import styled, { css } from 'styled-components';

interface IProps {
  title?: string;
  isCycle?: boolean;
  isChose: boolean;
}

const CheckboxStyle = styled.div<{
  $haveTitle: boolean;
  $isCycle: boolean;
  $isChose: boolean;
}>`
  display: flex;
  align-items: center;
  ${(props) =>
    props.$haveTitle &&
    css`
      gap: 8px;
    `}
  .checkbox {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    content: '';
    width: 1.8rem;
    height: 1.8rem;
    border-radius: ${(props) => (props.$isCycle ? '50%' : '4px')};
    border: 2px solid var(--color-grey-300);
    background-color: #fff;
    cursor: pointer;

    ${(props) =>
      props.$isChose &&
      css`
        border-color: var(--color-primary-light);
        &::before {
          width: 1rem;
          height: 1rem;
          content: '';
          display: inline-block;
          border-radius: ${props.$isCycle ? '50%' : '2px'};
          background-color: var(--color-primary);
        }
      `}
  }
`;

export function Checkbox({ title = '', isCycle = false, isChose }: IProps) {
  return (
    <CheckboxStyle $haveTitle={!!title} $isCycle={isCycle} $isChose={isChose}>
      <div className='checkbox' />
      <span>{title}</span>
    </CheckboxStyle>
  );
}
