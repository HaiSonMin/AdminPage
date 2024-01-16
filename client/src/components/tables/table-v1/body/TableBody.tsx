import { randomKey } from '@/utils';
import styled, { css } from 'styled-components';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IBodyTable } from '@/interfaces/common/table/ITable.interface';
import { Checkbox } from '@/components/inputs/checkboxs';
import IconEmpty from '@/assets/images/image-icon/empty.webp';
import { LOCAL_STORE_KEYS } from '@/constants/values';
import { IDataLocalUser } from '@/interfaces/common';
import {
  actionToggleRowSelected,
  getStateFieldsDisplay,
  getStateItemsTable,
  getStateRowsSelected,
} from '@/slices/itemSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
const TableBodyStyle = styled.div<{ $isEmpty: boolean }>`
  ${(props) =>
    props.$isEmpty &&
    css`
      display: flex;
      align-items: center;
    `}
  background-color: #fff;
  min-height: 45vh;
  max-height: fit-content;
  min-width: fit-content;
  max-width: 100%;
`;

const TableRowBody = styled.div<{ $numberColumn: number }>`
  display: grid;
  grid-template-columns: min-content ${(props) =>
      `repeat(${props.$numberColumn}, minmax(10rem, 40rem))`} 10rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-200);
  }
`;

const TableDataBody = styled.div`
  letter-spacing: 0.3px;
  font-size: var(--font-size-14);
  padding: 1rem 1.6rem;
  font-weight: 500;
  line-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  /* display: -webkit-box; */
  /* -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  */

  &:first-child {
    display: flex;
  }

  /* &:not(:last-child) {
    border-right: 1px solid var(--color-grey-200);
  } */

  &:last-child {
    gap: 1rem;
  }

  .action {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  }

  .icon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      scale: 1.06;
    }

    &-detail {
      color: var(--color-primary);
    }

    &-edit {
      color: var(--color-text);
    }

    &-delete {
      color: var(--color-danger);
    }
  }
`;

const BoxImg = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 15rem;
    height: 15rem;
  }
`;

interface IProps {
  actionDelete: (id?: string) => void;
  actionUpdate: (id?: string) => void;
}

export const TableBody = ({ actionDelete, actionUpdate }: IProps) => {
  const dispatch = useDispatch();
  const fieldsDisplay = useSelector(getStateFieldsDisplay);
  const itemsTable: Array<IBodyTable> = useSelector(getStateItemsTable);
  const rowsSelected = useSelector(getStateRowsSelected); // ["id1","id2","id3"]

  const onClickSelectRow = (id: string) => {
    dispatch(actionToggleRowSelected(id));
  };

  return (
    <TableBodyStyle $isEmpty={!itemsTable.length}>
      {itemsTable.length ? (
        itemsTable.map((item) => (
          <TableRowBody key={randomKey()} $numberColumn={fieldsDisplay.length}>
            <TableDataBody>
              <Checkbox
                isChose={rowsSelected.includes(`${item.id}`)}
                onClick={() => onClickSelectRow(`${item.id}`)}
              />
            </TableDataBody>
            {item?.dataTable?.map(({ columnVal: value }) => (
              <TableDataBody key={randomKey()}>{value}</TableDataBody>
            ))}
            {(
              JSON.parse(
                `${localStorage.getItem(LOCAL_STORE_KEYS.DATA_USER)}`
              ) as IDataLocalUser
            ).employee_fullName === 'administrator' && (
              <TableDataBody>
                <div className='action'>
                  <BiEditAlt
                    className='icon icon-edit'
                    onClick={() => actionUpdate(item?.id)}
                  />
                  <RiDeleteBinLine
                    className='icon icon-delete'
                    onClick={() => {
                      actionDelete(item?.id);
                    }}
                  />
                </div>
              </TableDataBody>
            )}
          </TableRowBody>
        ))
      ) : (
        <BoxImg>
          <img src={IconEmpty} alt='Empty Icon' />
        </BoxImg>
      )}
    </TableBodyStyle>
  );
};
