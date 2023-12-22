import { randomKey } from '@/utils';
import styled, { css } from 'styled-components';
import {
  TbSortAscendingLetters,
  TbSortDescendingLetters,
} from 'react-icons/tb';
import { Checkbox } from '@/components/inputs/checkboxs';

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
            <TableDataHeaderField>
              <TableDataHeaderFieldContent key={randomKey()}>
                {name} <TbSortAscendingLetters className='icon' />
              </TableDataHeaderFieldContent>
            </TableDataHeaderField>
          ))}
          <TableDataHeader>Hành động</TableDataHeader>
        </>
      </TableRowHeader>
    </TableHeaderStyle>
  );
};
