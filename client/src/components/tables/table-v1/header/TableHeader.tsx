import { randomKey } from '@/utils';
import styled, { css } from 'styled-components';
import {
  TbSortAscendingLetters,
  TbSortDescendingLetters,
} from 'react-icons/tb';
import { Checkbox } from '@/components/inputs/checkboxs';
import { useActionParams } from '@/hooks';
import { EQuery } from '@/enums';
import { IHeaderTable } from '@/interfaces/common/table';
import { IItemDrag } from '@/interfaces/common';

const TableHeaderStyle = styled.div`
  display: block;
  background-color: var(--color-grey-100);
  font-weight: 500;
  min-width: fit-content;
`;

const TableRowHeader = styled.div<{ $templateColumns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.$templateColumns};
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
  templateColumns: string;
  headersTable: IItemDrag[];
}

export const TableHeader = ({ templateColumns, headersTable }: IProps) => {
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
      <TableRowHeader $templateColumns={templateColumns}>
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
          <TableDataHeader>Hành động</TableDataHeader>
        </>
      </TableRowHeader>
    </TableHeaderStyle>
  );
};
