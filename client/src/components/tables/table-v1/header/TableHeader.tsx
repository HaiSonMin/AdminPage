import { randomKey } from '@/utils';
import styled, { css } from 'styled-components';
import {
  TbSortAscendingLetters,
  TbSortDescendingLetters,
} from 'react-icons/tb';
import { Checkbox } from '@/components/inputs/checkboxs';
import { useActionParams } from '@/hooks';
import { EQuery } from '@/enums';
import { IDataLocalUser } from '@/interfaces/common';
import { LOCAL_STORE_KEYS } from '@/constants/values';
import { useSelector } from 'react-redux';
import {
  actionSetToggleIsSelectedAll,
  getStateFieldsDisplay,
  getStateIsSelectedAllRows,
  getStateItemsTable,
} from '@/slices/itemSlice';
import { useDispatch } from 'react-redux';
import { IBodyTable } from '@/interfaces/common/table';

const TableHeaderStyle = styled.div`
  display: block;
  background-color: var(--color-grey-100);
  font-weight: 500;
  min-width: fit-content;
`;

const TableRowHeader = styled.div<{
  $numberColumn: number;
}>`
  display: grid;
  grid-template-columns: min-content ${(props) =>
      `repeat(${props.$numberColumn},minmax(10rem, 40rem))`} 10rem;
`;

const TableDataHeaderCss = css`
  padding: 1.4rem 1.6rem;
  font-weight: 500;
  font-size: var(--font-size-12);
  color: var(--color-text-secondary);
  min-width: max-content;
  white-space: nowrap;
`;

const TableDataHeader = styled.div`
  ${TableDataHeaderCss}
`;

const TableDataHeaderField = styled.div`
  ${TableDataHeaderCss}
`;

const TableDataHeaderFieldContent = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  cursor: pointer;
  .icon {
    width: 1.4rem;
    height: 1.4rem;
    color: var(--color-primary);
    transition: all 0.3s;
  }
  &:hover {
    .icon {
      scale: 1.1;
    }
  }
`;

export const TableHeader = () => {
  const dispatch = useDispatch();
  const { getParams, setParams } = useActionParams();
  const fieldDisplay = useSelector(getStateFieldsDisplay);
  const isSelectedAllRows = useSelector(getStateIsSelectedAllRows);
  const itemsTable: IBodyTable[] = useSelector(getStateItemsTable);

  const listIdsAllRows: string[] = itemsTable.map(
    (item) => item.id
  ) as string[];

  const onClickSelectAll = (listIdsAllRows: string[]) => {
    dispatch(actionSetToggleIsSelectedAll({ rowsSelected: listIdsAllRows }));
  };

  const actionSort = (fieldSort: string) => {
    if (!getParams(EQuery.SORT)) {
      setParams(EQuery.SORT, `${fieldSort}-asc`);
    } else if (
      getParams(EQuery.SORT) &&
      getParams(EQuery.SORT)?.includes('asc')
    ) {
      setParams(EQuery.SORT, `${fieldSort}-desc`);
    } else if (
      getParams(EQuery.SORT) &&
      getParams(EQuery.SORT)?.includes('desc')
    ) {
      setParams(EQuery.SORT, `${fieldSort}-asc`);
    }
  };

  return (
    <TableHeaderStyle>
      <TableRowHeader $numberColumn={fieldDisplay.length}>
        <>
          <TableDataHeader>
            <Checkbox
              isChose={isSelectedAllRows}
              onClick={() => onClickSelectAll(listIdsAllRows)}
            />
          </TableDataHeader>
          {fieldDisplay.map((headerTable) => (
            <TableDataHeaderField
              key={randomKey()}
              onClick={() => actionSort(headerTable.fieldKey)}
            >
              <TableDataHeaderFieldContent key={randomKey()}>
                {headerTable.fieldName}
                <TbSortAscendingLetters className='icon' />
              </TableDataHeaderFieldContent>
            </TableDataHeaderField>
          ))}
          {(
            JSON.parse(
              `${localStorage.getItem(LOCAL_STORE_KEYS.DATA_USER)}`
            ) as IDataLocalUser
          ).employee_fullName === 'administrator' && (
            <TableDataHeader>Hành động</TableDataHeader>
          )}
        </>
      </TableRowHeader>
    </TableHeaderStyle>
  );
};
