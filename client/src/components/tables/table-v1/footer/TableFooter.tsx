import { InputSelectSingle } from '@/components/inputs';
import { PaginationV1 } from '@/components/pagination';
import styled from 'styled-components';

const TableFooterStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 2rem;
  background-color: #fff;
  border-top: 1px solid var(--color-grey-200);
`;

const PageDisplay = styled.div``;

export const TableFooter = () => {
  const onChangeNumberItemsPerPage = (value: string) => {};

  return (
    <TableFooterStyle>
      <PageDisplay>
        <InputSelectSingle
          onChange={onChangeNumberItemsPerPage}
          options={[
            { label: '10/page', value: '10' },
            { label: '20/page', value: '20' },
            { label: '50/page', value: '50' },
          ]}
          defaultValue='10'
        />
      </PageDisplay>
      <PaginationV1 />
    </TableFooterStyle>
  );
};
