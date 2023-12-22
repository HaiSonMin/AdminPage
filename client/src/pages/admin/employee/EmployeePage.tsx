import styled from 'styled-components';
import { useEffect, useState } from 'react';
import qs from 'qs';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { ToolBar } from '@/layouts/admin/toolbar';
import { FeatureCreateEmployee } from './feature/FeatureCreateEmployee';
import { SpinnerPage } from '@/components/loadings';
import { TableV1 } from '@/components/tables';
import {
  useEmployeeApiDelete,
  useEmployeeApiGetAll,
  useEmployeeApiSearch,
  useEmployeeApiUpdate,
} from '@/apis-use';
import { useQueriesString } from '@/hooks/useQueriesString';
import { formatDate, getQueries } from '@/utils';
import { IEmployee } from '@/interfaces/models';
import { IDataTable, IResultGetMany } from '@/interfaces/common';
import { PopupDelete } from '@/components/popups/popup-delete/PopupDelete';
import { FeatureUpdateEmployee } from './feature/FeatureUpdateEmployee';
import { EMPLOYEE_FIELD } from '@/constants/fields';

export default function VoucherPage() {
  const queryString = useQueriesString();
  const query = getQueries(queryString);
  const [idItemChose, setIdItemChose] = useState<string>('');
  const [headersName, setHeadersName] = useState<string[]>([]);
  const [dataBody, setDataBody] = useState<Array<IDataTable>>([]);

  const [isDisplayDelete, setIsDisplayDelete] = useState<boolean>(false);
  const [isDisplayUpdate, setIsDisplayUpdate] = useState<boolean>(false);

  const { isDeletingEmployee, deleteEmployee } = useEmployeeApiDelete();

  let metadata: IResultGetMany<IEmployee> | undefined;
  let isGetting: boolean = false;

  if (!query.search) {
    const { isGettingEmployees, metadata: employees } =
      useEmployeeApiGetAll(query);
    metadata = employees;
    isGetting = isGettingEmployees;
  } else {
    const { isSearchingEmployees, metadata: employees } =
      useEmployeeApiSearch(query);
    metadata = employees;
    isGetting = isSearchingEmployees;
  }

  const closePopupDelete = () => setIsDisplayDelete(false);
  const closePopupUpdate = () => setIsDisplayUpdate(false);

  const actionDelete = (id?: string) => {
    setIsDisplayDelete(true);
    setIdItemChose(`${id}`);
  };

  const onDelete = () => {
    deleteEmployee(idItemChose, { onSuccess: () => setIsDisplayDelete(false) });
  };

  const actionUpdate = (id?: string) => {
    setIdItemChose(`${id}`);
    setIsDisplayUpdate(true);
  };

  const isLoading: boolean = isGetting || isDeletingEmployee;

  useEffect(() => {
    if (metadata?.items) {
      const columnDisplay = Object.keys(EMPLOYEE_FIELD);

      const headerDisplay = {};
      columnDisplay.forEach((column) => {
        if (EMPLOYEE_FIELD[column])
          headerDisplay[column] = EMPLOYEE_FIELD[column];
      });

      setHeadersName(Object.values(headerDisplay));

      const data: IDataTable[] = [];
      for (let i = 0; i < metadata.items.length; i++) {
        const dataTable: string[] = Object.keys(headerDisplay).map(
          (headerKey) => {
            if (headerKey === 'createdAt' || headerKey === 'updatedAt') {
              return formatDate(metadata?.items[i][headerKey] as Date);
            } else {
              return metadata?.items[i][headerKey];
            }
          }
        );
        const itemData: IDataTable = {
          id: metadata.items[i]._id,
          dataTable: dataTable,
        };
        console.log('itemData:::');
        data.push(itemData);
      }

      setDataBody(data);
    }
  }, [isGetting, metadata?.items]);

  return (
    <>
      {isLoading && <SpinnerPage />}
      <ToolBar>
        <FeatureCreateEmployee />
      </ToolBar>
      <TableV1
        totalItems={metadata?.totalItems}
        actionDelete={actionDelete}
        actionUpdate={actionUpdate}
        // actionSeeDetail={() => {}}
        actionSearch={() => {}}
        dataBody={dataBody}
        headersName={headersName}
        templateColumns={`min-content  ${headersName
          .map((_) => '20rem')
          .join(' ')} minmax(10rem, 1fr)`}
      />
      <PopupDelete
        close={closePopupDelete}
        isDisplay={isDisplayDelete}
        onDelete={onDelete}
      />
      {isDisplayUpdate && (
        <FeatureUpdateEmployee
          id={idItemChose}
          isDisplay={isDisplayUpdate}
          close={closePopupUpdate}
        />
      )}
    </>
  );
}
