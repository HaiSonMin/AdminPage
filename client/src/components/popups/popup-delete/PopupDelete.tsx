import { HeadingMD } from '@/components/heading';
import styled, { css } from 'styled-components';
import { Overlay } from '../Overlay';
import { IoClose } from 'react-icons/io5';
import { ButtonSubmit, ButtonText } from '@/components/buttons';
import DeleteIcon from '@/assets/images/image-icon/delete.png';
import { PopupStyle } from '../common';

const BtnClose = styled(IoClose)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--color-text-secondary);
  &:hover {
    color: var(--color-text);
    scale: 1.1;
  }
`;

const BtnBoxAction = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  padding: 1rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Heading = styled(HeadingMD)`
  margin-top: 1rem;
  color: var(--color-text);
`;

const ImageDelete = styled.img`
  margin-top: 1.2rem;
  width: 8rem;
  height: 8rem;
  object-fit: contain;
  object-position: center;
`;

interface IProp {
  isDisplay: boolean;
  title?: string;
  close: () => void;
  onDelete: () => void;
}

export function PopupDelete({ isDisplay, close, onDelete }: IProp) {
  return (
    <>
      <Overlay $isDisplay={isDisplay} onClick={close} />
      <PopupStyle $isDisplay={isDisplay}>
        <BtnClose onClick={close} />
        <Heading $isBold>{`Xác nhận xóa đối tượng`}</Heading>
        <ImageDelete src={DeleteIcon} alt='Icon-Delete' />
        <BtnBoxAction>
          <ButtonSubmit onClick={onDelete} $isDanger>
            Xóa
          </ButtonSubmit>
          <ButtonText onClick={close}>Cancel</ButtonText>
        </BtnBoxAction>
      </PopupStyle>
    </>
  );
}
