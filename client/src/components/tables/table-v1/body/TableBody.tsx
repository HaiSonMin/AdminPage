import { randomKey } from '@/utils';
import styled from 'styled-components';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IDataTable } from '@/interfaces/common';
import { Checkbox } from '@/components/inputs/checkboxs';
const TableBodyStyle = styled.div`
  display: block;
  background-color: #fff;
  min-height: 50vh;
  max-height: fit-content;
  min-width: fit-content;
  max-width: 100%;
`;

const TableRowBody = styled.div<{ $templateColumns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.$templateColumns};

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-200);
  }
`;

const TableDataBody = styled.div`
  letter-spacing: 0.3px;
  font-size: var(--font-size-14);
  padding: 1rem 1.6rem;
  font-weight: 500;
  line-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  /* display: -webkit-box; */
  /* -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  */

  &:first-child {
    display: flex;
  }

  /* &:not(:last-child) {
    border-right: 1px solid var(--color-grey-200);
  } */

  &:last-child {
    gap: 1rem;
  }

  .action {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  }

  .icon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      scale: 1.06;
    }

    &-detail {
      color: var(--color-primary);
    }

    &-edit {
      color: var(--color-text);
    }

    &-delete {
      color: var(--color-danger);
    }
  }
`;

interface IProps {
  templateColumns: string;
  dataBody: Array<IDataTable>;
  // actionSeeDetail: (id?: string) => void;
  actionDelete: (id?: string) => void;
  actionUpdate: (id?: string) => void;
}

export const TableBody = ({
  templateColumns,
  dataBody,
  // actionSeeDetail,
  actionDelete,
  actionUpdate,
}: IProps) => {
  return (
    <TableBodyStyle>
      {dataBody.map((item) => (
        <TableRowBody key={randomKey()} $templateColumns={templateColumns}>
          <TableDataBody>
            <Checkbox isChose={true} />
          </TableDataBody>
          {item?.dataTable?.map((value) => (
            <TableDataBody key={randomKey()}>{value}</TableDataBody>
          ))}
          <TableDataBody>
            <div className='action'>
              {/* <FaRegEye
                className='icon icon-detail'
                onClick={() => actionSeeDetail(item?.id)}
              /> */}
              <BiEditAlt
                className='icon icon-edit'
                onClick={() => actionUpdate(item?.id)}
              />
              <RiDeleteBinLine
                className='icon icon-delete'
                onClick={() => {
                  actionDelete(item?.id);
                }}
              />
            </div>
          </TableDataBody>
        </TableRowBody>
      ))}
    </TableBodyStyle>
  );
};
