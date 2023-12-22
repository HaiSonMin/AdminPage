import styled from 'styled-components';
import { TableBody } from './body';
import { TableHeader } from './header';
import { TableFooter } from './footer';
import { TableToolbar } from './toolbar';
import { IDataTable } from '@/interfaces/common';

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
  totalItems?: number;
  dataBody: Array<IDataTable>;
  headersName: string[];
  templateColumns: string;
  actionDelete: (id?: string) => void;
  actionUpdate: (id?: string) => void;
  actionSearch: (keySearch: string) => void;
  // actionSeeDetail: (id?: string) => void;
}

export function TableV1({
  dataBody,
  totalItems,
  headersName,
  templateColumns,
  actionDelete,
  actionUpdate,
  actionSearch,
}: // actionSeeDetail,
IProps) {
  return (
    <TableStyle>
      <TableToolbar
        totalItems={totalItems}
        numberDisplayOnPage={dataBody?.length}
        actionSearch={actionSearch}
      />
      <Overflow>
        <TableHeader
          headersName={headersName}
          templateColumns={templateColumns}
        />
        <TableBody
          actionDelete={actionDelete}
          actionUpdate={actionUpdate}
          // actionSeeDetail={actionSeeDetail}
          dataBody={dataBody}
          templateColumns={templateColumns}
        />
      </Overflow>
      <TableFooter totalItems={totalItems} />
    </TableStyle>
  );
}
