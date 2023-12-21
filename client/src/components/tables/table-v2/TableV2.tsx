import styled from 'styled-components';
import { TableBody } from './body';
import { TableHeader } from './header';
import { TableFooter } from './footer';
import { TableToolbar } from './toolbar';
import { IDataTable } from '@/interfaces/common';

const TableStyle = styled.table`
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  width: 100%;
  border-radius: 1rem;
  box-shadow: var(--shadow-around);
`;

const Overflow = styled.div`
  overflow-y: auto;
  overflow-x: auto;
`;

interface IProps {
  dataBody: Array<IDataTable>;
  headersName: string[];
  templateColumns: string;
  actionDelete: (id?: string) => void;
  actionUpdate: (id?: string) => void;
  actionSeeDetail: (id?: string) => void;
}

export function TableV2({
  actionDelete,
  actionUpdate,
  actionSeeDetail,
  templateColumns,
  dataBody,
  headersName,
}: IProps) {
  return (
    <TableStyle>
      <TableToolbar />
      <Overflow>
        <TableHeader
          headersName={headersName}
          templateColumns={templateColumns}
        />
        <TableBody
          actionDelete={actionDelete}
          actionUpdate={actionSeeDetail}
          actionSeeDetail={actionUpdate}
          dataBody={dataBody}
          templateColumns={templateColumns}
        />
      </Overflow>
      <TableFooter />
    </TableStyle>
  );
}
