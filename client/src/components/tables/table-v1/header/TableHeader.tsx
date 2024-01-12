import { randomKey } from '@/utils';
import styled, { css } from 'styled-components';
import {
  TbSortAscendingLetters,
  TbSortDescendingLetters,
} from 'react-icons/tb';
import { Checkbox } from '@/components/inputs/checkboxs';
import { useActionParams } from '@/hooks';
import { EQuery } from '@/enums';
import { IDataLocalUser, IItemDrag } from '@/interfaces/common';
import { LOCAL_STORE_KEYS } from '@/constants/values';

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

interface IProps {
  numberColumn: number;
  headersTable: IItemDrag[];
}

export const TableHeader = ({ numberColumn, headersTable }: IProps) => {
  const { getParams, setParams } = useActionParams();
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
      <TableRowHeader $numberColumn={numberColumn}>
        <>
          <TableDataHeader>
            <Checkbox isChose={false} />
          </TableDataHeader>
          {headersTable.map((headerTable) => (
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
