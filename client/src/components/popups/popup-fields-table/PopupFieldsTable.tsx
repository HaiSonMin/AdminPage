import styled, { css } from 'styled-components';
import { Overlay } from '../Overlay';
import { ButtonText } from '@/components/buttons';
import { HeadingSM } from '@/components/heading';
import { TfiClose } from 'react-icons/tfi';
import { PopupStyle } from '../common';
import {
  DraggableColumn,
  DraggableColumnV2,
} from '@/components/draggable-column';
import { TbArrowsExchange2 } from 'react-icons/tb';
import { randomId } from '@mantine/hooks';

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-grey-200);
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

const BtnBoxAction = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  padding: 1rem 0;
  gap: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const BoxToggleFields = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 4rem 1fr;
  margin-top: 1rem;
`;

const BoxIconToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

interface IProp {
  isDisplay: boolean;
  title?: string;
  close: () => void;
  onConfirm: () => void;
}

export function PopupFieldsTable({
  isDisplay,
  title,
  onConfirm,
  close,
}: IProp) {
  return (
    <>
      <Overlay $isDisplay={isDisplay} onClick={close} />
      <PopupStyle $isDisplay={isDisplay} $width={65}>
        <Header>
          <HeadingSM>{title}</HeadingSM>
          <BtnClose onClick={close} />
        </Header>
        <BoxToggleFields>
          <DraggableColumnV2 items={items1} />
          <BoxIconToggle>
            <TbArrowsExchange2 />
          </BoxIconToggle>
          <DraggableColumnV2 items={items2} />
        </BoxToggleFields>
        <BtnBoxAction>
          <ButtonText onClick={onConfirm}>Xác nhận</ButtonText>
          <ButtonText onClick={close}>Cancel</ButtonText>
        </BtnBoxAction>
      </PopupStyle>
    </>
  );
}

const items1 = [
  {
    id: randomId(),
    name: 'Mã khách hàng',
  },
  {
    id: randomId(),
    name: 'Tên khách hàng',
  },
  {
    id: randomId(),
    name: 'Tao nè',
  },
  {
    id: randomId(),
    name: 'Họ và tên',
  },
  {
    id: randomId(),
    name: 'Số điện thoại',
  },
  {
    id: randomId(),
    name: 'Nguồn sự kiện',
  },
  {
    id: randomId(),
    name: 'Mã giảm giá',
  },
  {
    id: randomId(),
    name: 'Ngày tạo',
  },
  {
    id: randomId(),
    name: 'Ngày cập nhật',
  },
];
const items2 = [
  {
    id: randomId(),
    name: 'Mã khách hàng',
  },
  {
    id: randomId(),
    name: 'Tên khách hàng',
  },
  {
    id: randomId(),
    name: 'Tao nè',
  },
  {
    id: randomId(),
    name: 'Họ và tên',
  },
  {
    id: randomId(),
    name: 'Số điện thoại',
  },
  {
    id: randomId(),
    name: 'Nguồn sự kiện',
  },
  {
    id: randomId(),
    name: 'Mã giảm giá',
  },
  {
    id: randomId(),
    name: 'Ngày tạo',
  },
  {
    id: randomId(),
    name: 'Ngày cập nhật',
  },
];
