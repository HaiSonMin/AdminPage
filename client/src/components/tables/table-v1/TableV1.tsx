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
  tableName: string;
  totalItems?: number;
  dataBody: Array<IBodyTable>;
  templateColumns: string;
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
  tableName,
  dataBody,
  totalItems,
  headersTable,
  templateColumns,
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
        <TableHeader
          headersTable={headersTable}
          templateColumns={templateColumns}
        />
        <TableBody
          actionDelete={actionDelete}
          actionUpdate={actionUpdate}
          dataBody={dataBody}
          templateColumns={templateColumns}
        />
      </Overflow>
      <TableFooter totalItems={totalItems} />
    </TableStyle>
  );
}
