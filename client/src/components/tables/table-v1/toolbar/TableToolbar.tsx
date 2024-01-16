import styled from 'styled-components';
import { SelectFieldsTable } from './select-fields/SelectFieldsTable';
import { InputSearchV2 } from '@/components/inputs';
import { useActionParams } from '@/hooks';
import { EQuery } from '@/enums';
import { IItemDrag } from '@/interfaces/common';
import { useSelector } from 'react-redux';
import { getStateItemsTable } from '@/slices/itemSlice';
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
  tableName: string;
}

export function TableToolbar({ tableName }: IProps) {
  const { deleteParams, setParams } = useActionParams();

  const itemsTable = useSelector(getStateItemsTable);

  const actionSearch = (keySearch: string) => {
    if (!keySearch) {
      deleteParams(EQuery.KEY_SEARCH);
    } else {
      setParams(EQuery.KEY_SEARCH, keySearch);
    }
  };

  return (
    <TableToolbarStyle>
      <Left>
        <SelectFieldsTable tableName={tableName} />
      </Left>
      <Right>
        <InfoDisplay>
          Hiển thị 1-{itemsTable.length} trong số {itemsTable.length} bản ghi
        </InfoDisplay>
        <InputSearchV2 actionSearch={actionSearch} />
      </Right>
    </TableToolbarStyle>
  );
}
