import styled from 'styled-components';
import { TableBody } from './body';
import { TableHeader } from './header';
import { TableFooter } from './footer';
import { TableToolbar } from './toolbar';

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
  actionDelete: (id?: string) => void;
  actionUpdate: (id?: string) => void;
}

export function TableV1({ tableName, actionDelete, actionUpdate }: IProps) {
  return (
    <TableStyle>
      <TableToolbar tableName={tableName} />
      <Overflow>
        <TableHeader />
        <TableBody actionDelete={actionDelete} actionUpdate={actionUpdate} />
      </Overflow>
      <TableFooter />
    </TableStyle>
  );
}
