import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TbFileExport } from 'react-icons/tb';
import { BsPatchQuestion } from 'react-icons/bs';
import { exportExcel } from '@/helpers';
import { useSelector } from 'react-redux';
import { getStateItemsTable, getStateRowsSelected } from '@/slices/itemSlice';
import { PopupExportFields } from '@/components/popups/popup-export-fields';
import { getStateCollapsedSide } from '@/slices/layoutSlice';
import { IBodyTable } from '@/interfaces/common/table';
const ToolBarStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 1.5rem;
  background-color: #fff;
  border-radius: var(--border-radius-md);
  margin-bottom: 8px;
`;

const BoxAction = styled.div``;
const BoxMoreAction = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  color: var(--color-text-secondary);
  font-weight: 500;
  font-size: var(--font-size-11);
  gap: 1.5rem;
  .item-action {
    position: relative;
    padding: 10px 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    cursor: pointer;
    border-radius: var(--border-radius-md);
    transition: all 0.2s;

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }

    &:hover {
      color: var(--color-primary);
      background-color: var(--color-primary-light);
    }
  }
`;

const PopupExport = styled.div<{ $isColumnSelected: boolean }>`
  position: absolute;
  top: 100%;
  ${(props) => (!props.$isColumnSelected ? 'right: 0px;' : 'left: 0px;')}
  /* right: 0px; */
  padding: 1rem;
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: max-content;
  border-radius: var(--border-radius-sm);
  background-color: white;
  box-shadow: var(--shadow-around);

  .option {
    font-size: var(--font-size-14);
    font-weight: 500;
    cursor: pointer;
    padding: 1rem 1rem;
    color: var(--color-text);
    border-radius: 4px;

    &:hover {
      background-color: var(--color-grey-100);
    }
  }
`;

interface IProps {
  children: React.ReactNode;
  objFields: { [key: string]: string };
}

export function ToolBar({ children, objFields }: IProps) {
  const [isDisplayExport, setIsDisplayExport] = useState<boolean>(false);
  const refPopupExport = useRef<HTMLDivElement>(null);
  const rowsSelected = useSelector(getStateRowsSelected);
  const itemsTable = useSelector(getStateItemsTable) as IBodyTable[];

  const [isDisplaySelectFieldsExport, setIsDisplaySelectFieldsExport] =
    useState<boolean>(false);

  const onDisplayPopExport = () => setIsDisplaySelectFieldsExport(true);
  const onClose = () => setIsDisplaySelectFieldsExport(false);

  const handleDisplayExport = (e: any) => {
    setIsDisplayExport(!isDisplayExport);
    e.stopPropagation();
  };

  const handleExportAll = () => {
    type TypeItemData = { [key: string]: string };
    const listDataExport: TypeItemData[] = [];

    itemsTable.forEach((item) => {
      const itemDataExport: TypeItemData = {};
      item.dataTable?.forEach((col) => {
        itemDataExport[col.columnName] = col.columnVal;
      });
      listDataExport.push(itemDataExport);
    });

    exportExcel({
      csvData: listDataExport,
      fileName: 'file_export_test',
    });
  };

  // Click outside and hidden popup export
  useEffect(() => {
    const eventHandlerClick = (event: MouseEvent) => {
      if (isDisplayExport && refPopupExport.current) {
        setIsDisplayExport(false);
      }
    };

    document.addEventListener('click', eventHandlerClick);

    return () => document.removeEventListener('click', eventHandlerClick);
  }, [isDisplayExport]);

  return (
    <ToolBarStyle>
      {!rowsSelected.length ? <BoxAction>{children}</BoxAction> : <></>}
      <BoxMoreAction>
        <div className='item-action' onClick={handleDisplayExport}>
          <TbFileExport />
          <span>Xuất file</span>
          {isDisplayExport && (
            <PopupExport
              ref={refPopupExport}
              $isColumnSelected={rowsSelected.length > 0} // Set position display of popup export
            >
              <p className='option' onClick={handleExportAll}>
                Xuất tất cả
              </p>
              <p className='option' onClick={onDisplayPopExport}>
                Xuất theo trường dữ liệu
              </p>
            </PopupExport>
          )}
        </div>
        {!rowsSelected.length && (
          <div className='item-action'>
            <BsPatchQuestion />
            <span>HDSD</span>
          </div>
        )}
        {isDisplaySelectFieldsExport && (
          <PopupExportFields
            close={onClose}
            isDisplay={isDisplaySelectFieldsExport}
            onConfirm={() => {}}
            title='Chọn trường export'
            options={objFields}
          />
        )}
      </BoxMoreAction>
    </ToolBarStyle>
  );
}
