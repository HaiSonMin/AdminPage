import styled from 'styled-components';
import { SelectFieldsTable } from './select-fields/SelectFieldsTable';
import { InputSearchV2 } from '@/components/inputs';
import { useActionParams } from '@/hooks';
import { EQuery } from '@/enums';
import { IItemDrag } from '@/interfaces/common';
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
  totalItems?: number;
  numberDisplayOnPage: number;
  fieldHidden: IItemDrag[];
  fieldDisplay: IItemDrag[];
  setFieldHidden: React.Dispatch<React.SetStateAction<IItemDrag[]>>;
  setFieldDisplay: React.Dispatch<React.SetStateAction<IItemDrag[]>>;
  setHeadersTable: React.Dispatch<React.SetStateAction<IItemDrag[]>>;
  handleAddFieldHidden: (numberDisplay: number) => void;
  handleAddFieldDisplay: (numberHidden: number) => void;
}

export function TableToolbar({
  tableName,
  totalItems,
  numberDisplayOnPage,
  fieldDisplay,
  fieldHidden,
  setFieldHidden,
  setFieldDisplay,
  setHeadersTable,
  handleAddFieldHidden,
  handleAddFieldDisplay,
}: IProps) {
  const { deleteParams, setParams } = useActionParams();

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
        <SelectFieldsTable
          tableName={tableName}
          fieldDisplay={fieldDisplay}
          fieldHidden={fieldHidden}
          setFieldHidden={setFieldHidden}
          setFieldDisplay={setFieldDisplay}
          setHeadersTable={setHeadersTable}
          handleAddFieldHidden={handleAddFieldHidden}
          handleAddFieldDisplay={handleAddFieldDisplay}
        />
      </Left>
      <Right>
        <InfoDisplay>
          Hiển thị 1-{numberDisplayOnPage} trong số {totalItems} bản ghi
        </InfoDisplay>
        <InputSearchV2 actionSearch={actionSearch} />
      </Right>
    </TableToolbarStyle>
  );
}
