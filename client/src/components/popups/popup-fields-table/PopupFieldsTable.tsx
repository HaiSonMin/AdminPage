import styled from 'styled-components';
import { Overlay } from '../Overlay';
import { PopupStyle } from '../common';
import { TfiClose } from 'react-icons/tfi';
import { IItemDrag } from '@/interfaces/common';
import { HeadingSM } from '@/components/heading';
import { ButtonText } from '@/components/buttons';
import { TbArrowsExchange2 } from 'react-icons/tb';
import { DraggableColumn } from '@/components/draggable-column';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {
  actionSetFieldsHidden,
  actionSetFieldsDisplay,
  getStateFieldsHidden,
  getStateFieldsDisplay,
} from '@/slices/itemSlice';
import { useDispatch } from 'react-redux';
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
  padding-top: 1rem;
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

const BoxToggleField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
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

const Heading = styled(HeadingSM)`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    margin-top: 2px;
  }
`;

interface IProp {
  tableName: string;
  isDisplay: boolean;
  title?: string;
  close: () => void;
}

export function PopupFieldsTable({
  tableName,
  isDisplay,
  title,
  close,
}: IProp) {
  const dispatch = useDispatch();
  const fieldsHidden = useSelector(getStateFieldsHidden);
  const fieldsDisplay = useSelector(getStateFieldsDisplay);

  const handleConfirm = () => {
    dispatch(actionSetFieldsDisplay({ fieldsDisplay }));
    localStorage.setItem(tableName, JSON.stringify(fieldsDisplay));
    close();
  };

  const actionSetItemsFieldsHidden = (fieldsHidden: IItemDrag[]) => {
    dispatch(actionSetFieldsHidden({ fieldsHidden }));
  };

  const actionSetItemsFieldsDisplay = (fieldsDisplay: IItemDrag[]) => {
    dispatch(actionSetFieldsDisplay({ fieldsDisplay }));
  };

  const handleAddFieldDisplay = (indexHidden: number) => {
    // Pop one item when click these
    const lastItemHidden = fieldsHidden.filter(
      (item) => item.fieldKey !== fieldsHidden[indexHidden].fieldKey
    );
    dispatch(actionSetFieldsHidden({ fieldsHidden: lastItemHidden }));

    const lastItemDisplay = [...fieldsDisplay, fieldsHidden[indexHidden]];
    dispatch(actionSetFieldsDisplay({ fieldsDisplay: lastItemDisplay }));
  };

  const handleAddFieldHidden = (indexDisplay: number) => {
    // Pop one item when click these
    const lastItemDisplay = fieldsDisplay.filter(
      (item) => item.fieldKey !== fieldsDisplay[indexDisplay].fieldKey
    );
    dispatch(actionSetFieldsDisplay({ fieldsDisplay: lastItemDisplay }));

    const lastItemHidden = [...fieldsHidden, fieldsDisplay[indexDisplay]];
    dispatch(actionSetFieldsHidden({ fieldsHidden: lastItemHidden }));
  };

  return (
    <>
      <Overlay $isDisplay={isDisplay} onClick={close} />
      <PopupStyle $isDisplay={isDisplay} $width={65}>
        <Header>
          <Heading>{title}</Heading>
          <BtnClose onClick={close} />
        </Header>
        <BoxToggleFields>
          <BoxToggleField>
            <Heading>
              Cột ẩn <FaRegEye />
            </Heading>
            <DraggableColumn
              handleToggleField={handleAddFieldDisplay}
              items={fieldsHidden}
              setItems={actionSetItemsFieldsHidden}
            />
          </BoxToggleField>
          <BoxIconToggle>
            <TbArrowsExchange2 />
          </BoxIconToggle>
          <BoxToggleField>
            <Heading>
              Cột đang hiển thị <FaRegEyeSlash />
            </Heading>
            <DraggableColumn
              handleToggleField={handleAddFieldHidden}
              items={fieldsDisplay}
              setItems={actionSetItemsFieldsDisplay}
            />
          </BoxToggleField>
        </BoxToggleFields>
        <BtnBoxAction>
          <ButtonText onClick={handleConfirm} $isPrimarySolid>
            Xác nhận
          </ButtonText>
          <ButtonText onClick={close}>Cancel</ButtonText>
        </BtnBoxAction>
      </PopupStyle>
    </>
  );
}
