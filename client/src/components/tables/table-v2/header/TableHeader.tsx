import { randomKey } from '@/utils';
import styled from 'styled-components';
import {
  TbSortAscendingLetters,
  TbSortDescendingLetters,
} from 'react-icons/tb';
import { Checkbox } from '@/components/inputs/checkboxs';

const TableHeaderStyle = styled.thead`
  display: block;
  background-color: var(--color-grey-100);
  font-weight: 500;
`;

const TableRowHeader = styled.tr<{ $templateColumns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.$templateColumns};
`;

const TableDataHeader = styled.td`
  padding: 1.4rem 1.6rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  font-weight: 500;
  font-size: var(--font-size-12);
  color: var(--color-text-secondary);

  &:first-child {
    gap: 0;
  }

  /* &:not(:last-child) {
    border-right: 1px solid var(--color-grey-300);
  } */

  svg {
    width: 1.4rem;
    height: 1.4rem;
    cursor: pointer;
    transition: all 0.3s;
    color: var(--color-primary);

    &:hover {
      scale: 1.1;
    }
  }
`;

interface IProps {
  templateColumns: string;
  headersName: Array<string>;
}

export const TableHeader = ({ templateColumns, headersName }: IProps) => {
  return (
    <TableHeaderStyle>
      <TableRowHeader $templateColumns={templateColumns}>
        <>
          <TableDataHeader>
            <Checkbox isChose={false} />
          </TableDataHeader>
          {headersName.map((name) => (
            <TableDataHeader key={randomKey()}>
              {name} <TbSortAscendingLetters />
            </TableDataHeader>
          ))}
          <TableDataHeader>Action</TableDataHeader>
        </>
      </TableRowHeader>
    </TableHeaderStyle>
  );
};
