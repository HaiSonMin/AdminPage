import {
  useEmployeeApiDelete,
  useEmployeeApiGetAll,
  useEmployeeApiSearch,
} from '@/apis-use';
import {
  actionResetAllStateTable,
  actionSetFieldsDisplay,
  actionSetFieldsHidden,
  actionSetItemsTable,
  getStateFieldsDisplay,
} from '@/slices/itemSlice';
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
import { IBodyTable, IDataBody } from '@/interfaces/common/table';
import { LOCAL_STORE_KEYS } from '@/constants/values';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function VoucherPage() {
  const dispatch = useDispatch();

  const queryString = useQueriesString();
  const query = getQueries(queryString);
  const [idItemChose, setIdItemChose] = useState<string>('');

  const [isDisplayDelete, setIsDisplayDelete] = useState<boolean>(false);
  const [isDisplayUpdate, setIsDisplayUpdate] = useState<boolean>(false);

  const { isDeletingEmployee, deleteEmployee } = useEmployeeApiDelete();

  const fieldsDisplay = useSelector(getStateFieldsDisplay);

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

      if (
        !fieldsDisplay.length ||
        !columnsKey.includes(fieldsDisplay[0].fieldKey)
      ) {
        dispatch(actionResetAllStateTable());

        const fieldsDisplayTmp: IItemDrag[] = [];
        const fieldsHiddenTmp: IItemDrag[] = [];
        columnsKey.forEach((columnKey) => {
          if (columnsDisplay.includes(columnKey)) {
            fieldsDisplayTmp.push({
              fieldKey: columnKey,
              fieldName: EMPLOYEE_FIELD[columnKey],
            });
          } else {
            fieldsHiddenTmp.push({
              fieldKey: columnKey,
              fieldName: EMPLOYEE_FIELD[columnKey],
            });
          }
        });
        dispatch(actionSetFieldsDisplay({ fieldsDisplay: fieldsDisplayTmp }));
        dispatch(actionSetFieldsHidden({ fieldsHidden: fieldsHiddenTmp }));
      } else {
        const dataBody: IBodyTable[] = [];
        for (let i = 0; i < metadata.items.length; i++) {
          const dataTable: IDataBody[] = fieldsDisplay.map(
            (header): IDataBody => {
              if (
                header.fieldKey === 'createdAt' ||
                header.fieldKey === 'updatedAt'
              ) {
                return {
                  columnKey: header.fieldKey,
                  columnName: EMPLOYEE_FIELD[header.fieldKey] as string,
                  columnVal: formatDate(
                    metadata?.items[i][header.fieldKey] as Date
                  ),
                };
              } else {
                return {
                  columnKey: header.fieldKey,
                  columnName: EMPLOYEE_FIELD[header.fieldKey] as string,
                  columnVal: metadata?.items[i][header.fieldKey],
                };
              }
            }
          );
          const itemData: IBodyTable = {
            id: metadata.items[i]._id,
            dataTable: dataTable,
          };
          dataBody.push(itemData);
        }

        dispatch(actionSetItemsTable({ itemsTable: dataBody }));
      }
    }
  }, [isGetting, fieldsDisplay, metadata?.items, dispatch]);

  return (
    <>
      {isLoading && <SpinnerPage />}
      <ToolBar objFields={EMPLOYEE_FIELD as any}>
        <FeatureCreateEmployee />
      </ToolBar>
      <TableV1
        tableName={LOCAL_STORE_KEYS.DISPLAY_EMPLOYEE_FIELDS}
        actionDelete={actionDelete}
        actionUpdate={actionUpdate}
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
