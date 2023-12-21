import { HeadingSM } from '@/components/heading';
import styled, { css } from 'styled-components';
import { Overlay } from '../Overlay';
import { PopupStyle } from '../common';
import { TfiClose } from 'react-icons/tfi';
import { CiEdit } from 'react-icons/ci';
import { MdOutlinePostAdd } from 'react-icons/md';
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 1rem;
`;

const BtnClose = styled(TfiClose)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--color-primary);
  &:hover {
    color: var(--color-text);
    scale: 1.1;
  }
`;

const Heading = styled(HeadingSM)`
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--color-primary);
`;

type typeAction = 'update' | 'create';

interface IProp {
  isDisplay: boolean;
  title: string;
  children: React.ReactNode;
  close: () => void;
  typeAction: typeAction;
}

export function PopupForm({
  title,
  isDisplay,
  children,
  close,
  typeAction,
}: IProp) {
  return (
    <>
      <Overlay $isDisplay={isDisplay} onClick={close} />
      <PopupStyle $isDisplay={isDisplay}>
        <Header>
          <Heading>
            {typeAction === 'update' ? <CiEdit /> : <MdOutlinePostAdd />}
            <span>{title.toLocaleUpperCase()}</span>
          </Heading>
          <BtnClose onClick={close} />
        </Header>
        {children}
      </PopupStyle>
    </>
  );
}
