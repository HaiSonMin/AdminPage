import styled from 'styled-components';
import { SelectFieldsTable } from './select-fields/SelectFieldsTable';
import { FilterTable } from './filter/FilterTable';
import { InputSearchV2 } from '@/components/inputs';
const TableToolbarStyle = styled.div`
  padding: 1rem 2rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const InfoDisplay = styled.p`
  white-space: nowrap;
  width: fit-content;
  font-weight: 400;
  color: var(--color-text-secondary);
`;

interface IProps {
  totalItems?: number;
  numberDisplayOnPage: number;
}

export function TableToolbar({ totalItems, numberDisplayOnPage }: IProps) {
  return (
    <TableToolbarStyle>
      <Left>
        <SelectFieldsTable />
        <FilterTable />
      </Left>
      <Right>
        <InfoDisplay>
          Hiển thị 1-{numberDisplayOnPage} trong số {totalItems} bản ghi
        </InfoDisplay>
        <InputSearchV2 />
      </Right>
    </TableToolbarStyle>
  );
}
