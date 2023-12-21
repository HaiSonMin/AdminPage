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

const headersKeyVoucher: Partial<IEmployee> = {
  _id: 'Mã voucher',
  employee_fullName: 'Họ và tên',
  employee_email: 'Email',
  employee_gender: 'Giới tính',
  employee_role: 'Phòng ban',
  employee_userName: 'Tên người dùng',
  employee_phoneNumber: 'Số điện thoại',
  createdAt: 'Ngày tạo',
  updatedAt: 'Ngày cập nhật',
};

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
      const { ...columnDisplay } = metadata.items[0];

      const headerDisplay = {};
      Object.keys(columnDisplay).forEach((column) => {
        if (headersKeyVoucher[column])
          headerDisplay[column] = headersKeyVoucher[column];
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
        dataBody={dataBody}
        headersName={headersName}
        templateColumns={`min-content  ${headersName
          .map((_) => 'minmax(10rem, 1fr)')
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
