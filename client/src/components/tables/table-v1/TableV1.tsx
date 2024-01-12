import styled from 'styled-components';
import { TableBody } from './body';
import { TableHeader } from './header';
import { TableFooter } from './footer';
import { TableToolbar } from './toolbar';
import { IBodyTable, IHeaderTable } from '@/interfaces/common/table';
import { IItemDrag } from '@/interfaces/common';

const TableStyle = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 70vh;
  width: 100%;
  border-radius: 1rem;
  box-shadow: var(--shadow-around);
`;

const Overflow = styled.div`
  overflow-y: scroll;
  overflow-x: auto;
`;

interface IProps {
  numberColumn: number;
  tableName: string;
  totalItems?: number;
  dataBody: Array<IBodyTable>;
  headersTable: IItemDrag[];
  fieldHidden: IItemDrag[];
  fieldDisplay: IItemDrag[];
  setFieldHidden: React.Dispatch<React.SetStateAction<IItemDrag[]>>;
  setFieldDisplay: React.Dispatch<React.SetStateAction<IItemDrag[]>>;
  setHeadersTable: React.Dispatch<React.SetStateAction<IItemDrag[]>>;
  handleAddFieldHidden: (numberDisplay: number) => void;
  handleAddFieldDisplay: (numberHidden: number) => void;
  actionDelete: (id?: string) => void;
  actionUpdate: (id?: string) => void;
  // actionSeeDetail: (id?: string) => void;
}

export function TableV1({
  numberColumn,
  tableName,
  dataBody,
  totalItems,
  headersTable,
  fieldHidden,
  fieldDisplay,
  setFieldHidden,
  setFieldDisplay,
  setHeadersTable,
  handleAddFieldHidden,
  handleAddFieldDisplay,
  actionDelete,
  actionUpdate,
}: IProps) {
  return (
    <TableStyle>
      <TableToolbar
        tableName={tableName}
        totalItems={totalItems}
        numberDisplayOnPage={dataBody?.length}
        fieldDisplay={fieldDisplay}
        fieldHidden={fieldHidden}
        setFieldHidden={setFieldHidden}
        setFieldDisplay={setFieldDisplay}
        setHeadersTable={setHeadersTable}
        handleAddFieldHidden={handleAddFieldHidden}
        handleAddFieldDisplay={handleAddFieldDisplay}
      />
      <Overflow>
        <TableHeader numberColumn={numberColumn} headersTable={headersTable} />
        <TableBody
          numberColumn={numberColumn}
          actionDelete={actionDelete}
          actionUpdate={actionUpdate}
          dataBody={dataBody}
        />
      </Overflow>
      <TableFooter totalItems={totalItems} />
    </TableStyle>
  );
}
