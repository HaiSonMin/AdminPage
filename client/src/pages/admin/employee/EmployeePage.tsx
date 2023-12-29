import {
  useEmployeeApiDelete,
  useEmployeeApiGetAll,
  useEmployeeApiSearch,
} from '@/apis-use';
import { useEffect, useState } from 'react';
import { ToolBar } from '@/layouts/admin/toolbar';
import { FeatureCreateEmployee } from './feature/FeatureCreateEmployee';
import { SpinnerPage } from '@/components/loadings';
import { TableV1 } from '@/components/tables';
import { useQueriesString } from '@/hooks/useQueriesString';
import { formatDate, getQueries } from '@/utils';
import { IEmployee } from '@/interfaces/models';
import { IItemDrag, IResultGetMany } from '@/interfaces/common';
import { PopupDelete } from '@/components/popups/popup-delete/PopupDelete';
import { FeatureUpdateEmployee } from './feature/FeatureUpdateEmployee';
import { EMPLOYEE_FIELD, EMPLOYEE_FIELD_DEF } from '@/constants/fields';
import { IBodyTable, IHeaderTable } from '@/interfaces/common/table';
import { LOCAL_STORE_KEYS } from '@/constants/values';

export default function VoucherPage() {
  const queryString = useQueriesString();
  const query = getQueries(queryString);
  const [idItemChose, setIdItemChose] = useState<string>('');
  const [dataBody, setDataBody] = useState<Array<IBodyTable>>([]);

  const [isDisplayDelete, setIsDisplayDelete] = useState<boolean>(false);
  const [isDisplayUpdate, setIsDisplayUpdate] = useState<boolean>(false);

  const { isDeletingEmployee, deleteEmployee } = useEmployeeApiDelete();

  const [headersTable, setHeadersTable] = useState<IItemDrag[]>([]);
  const [fieldHiddenTest, setFieldHiddenTest] = useState<IItemDrag[]>([]);
  const [fieldDisplayTest, setFieldDisplayTest] = useState<IItemDrag[]>([]);

  let metadata: IResultGetMany<IEmployee> | undefined;
  let isGetting: boolean = false;

  if (!query.keySearch) {
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

  const handleAddFieldDisplay = (indexHidden: number) => {
    // Pop one item when click these
    setFieldHiddenTest((pre) =>
      pre.filter((item) => item.fieldKey !== pre[indexHidden].fieldKey)
    );
    setFieldDisplayTest((pre) => [...pre, fieldHiddenTest[indexHidden]]);
  };

  const handleAddFieldHidden = (indexDisplay: number) => {
    // Pop one item when click these
    if (fieldDisplayTest.length > 1) {
      setFieldDisplayTest((pre) =>
        pre.filter((item) => item.fieldKey !== pre[indexDisplay].fieldKey)
      );
      setFieldHiddenTest((pre) => [...pre, fieldDisplayTest[indexDisplay]]);
    }
  };

  useEffect(() => {
    if (metadata?.items) {
      const columnsKey = Object.keys(EMPLOYEE_FIELD);
      let columnsDisplay: string[];

      if (localStorage.getItem(LOCAL_STORE_KEYS.DISPLAY_EMPLOYEE_FIELDS)) {
        const abc = JSON.parse(
          `${localStorage.getItem(LOCAL_STORE_KEYS.DISPLAY_EMPLOYEE_FIELDS)}`
        ) as IItemDrag[];
        columnsDisplay = abc.map((item) => item.fieldKey);
      } else {
        columnsDisplay = Object.keys(EMPLOYEE_FIELD_DEF);
      }

      if (!headersTable.length) {
        const headerDisplay: IItemDrag[] = [];
        const fieldHidden: IItemDrag[] = [];
        const fieldDisplay: IItemDrag[] = [];
        columnsKey.forEach((columnKey) => {
          if (columnsDisplay.includes(columnKey)) {
            headerDisplay.push({
              fieldKey: columnKey,
              fieldName: EMPLOYEE_FIELD[columnKey],
            });
            fieldDisplay.push({
              fieldKey: columnKey,
              fieldName: EMPLOYEE_FIELD[columnKey],
            });
          } else {
            fieldHidden.push({
              fieldKey: columnKey,
              fieldName: EMPLOYEE_FIELD[columnKey],
            });
          }
        });
        setFieldHiddenTest(fieldHidden);
        setFieldDisplayTest(fieldDisplay);
        setHeadersTable(() => headerDisplay);
      } else {
        const data: IBodyTable[] = [];
        for (let i = 0; i < metadata.items.length; i++) {
          const dataTable: string[] = headersTable.map((header) => {
            if (
              header.fieldKey === 'createdAt' ||
              header.fieldKey === 'updatedAt'
            ) {
              return formatDate(metadata?.items[i][header.fieldKey] as Date);
            } else {
              return metadata?.items[i][header.fieldKey];
            }
          });
          const itemData: IBodyTable = {
            id: metadata.items[i]._id,
            dataTable: dataTable,
          };
          data.push(itemData);
        }

        setDataBody(data);
      }
    }
  }, [isGetting, headersTable, metadata?.items]);

  return (
    <>
      {isLoading && <SpinnerPage />}
      <ToolBar>
        <FeatureCreateEmployee />
      </ToolBar>
      <TableV1
        tableName={LOCAL_STORE_KEYS.DISPLAY_EMPLOYEE_FIELDS}
        fieldHidden={fieldHiddenTest}
        fieldDisplay={fieldDisplayTest}
        setHeadersTable={setHeadersTable}
        setFieldHidden={setFieldHiddenTest}
        setFieldDisplay={setFieldDisplayTest}
        handleAddFieldHidden={handleAddFieldHidden}
        handleAddFieldDisplay={handleAddFieldDisplay}
        totalItems={metadata?.totalItems}
        actionDelete={actionDelete}
        actionUpdate={actionUpdate}
        dataBody={dataBody}
        headersTable={headersTable}
        templateColumns={`min-content  ${Object.values(headersTable)
          .map((_) => 'minmax(10rem, 30rem)')
          .join(' ')} 10rem`}
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
