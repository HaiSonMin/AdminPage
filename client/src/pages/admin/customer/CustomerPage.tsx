import {
  useCustomerApiDelete,
  useCustomerApiGetAll,
  useCustomerApiSearch,
} from '@/apis-use/UseCustomerApi';
import {
  actionResetAllStateTable,
  actionSetFieldsDisplay,
  actionSetFieldsHidden,
  actionSetItemsTable,
  getStateFieldsDisplay,
} from '@/slices/itemSlice';
import { TableV1 } from '@/components/tables';
import { useQueriesString } from '@/hooks/useQueriesString';
import { formatDate, getQueries } from '@/utils';
import { SpinnerPage } from '@/components/loadings';
import { ICustomer } from '@/interfaces/models';
import { useEffect, useState } from 'react';
import { ToolBar } from '@/layouts/admin/toolbar';
import { FeatureCreateCustomer } from './feature';
import { IItemDrag, IResultGetMany } from '@/interfaces/common';
import { PopupDelete } from '@/components/popups/popup-delete/PopupDelete';
import { CUSTOMER_FIELD, CUSTOMER_FIELD_DEF } from '@/constants/fields';
import { IBodyTable, IDataBody } from '@/interfaces/common/table';
import { LOCAL_STORE_KEYS } from '@/constants/values';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function CustomerPage() {
  const dispatch = useDispatch();

  const queryString = useQueriesString();
  const query = getQueries(queryString);

  const [isDisplayAction, setIsDisplayAction] = useState<boolean>(false);
  const [idItemChose, setIdItemChose] = useState<string>('');

  const { isDeletingCustomer, deleteCustomer } = useCustomerApiDelete();

  const fieldsDisplay = useSelector(getStateFieldsDisplay);

  let metadata: IResultGetMany<ICustomer> | undefined;
  let isGetting: boolean = false;

  if (!query.keySearch) {
    const { isGettingCustomers, metadata: customers } =
      useCustomerApiGetAll(query);
    metadata = customers;
    isGetting = isGettingCustomers;
  } else {
    const { isSearchingCustomers, metadata: customers } =
      useCustomerApiSearch(query);
    metadata = customers;
    isGetting = isSearchingCustomers;
  }

  const closePopup = () => setIsDisplayAction(false);

  const actionDelete = (id?: string) => {
    setIsDisplayAction(true);
    setIdItemChose(`${id}`);
  };

  const onDelete = () => {
    deleteCustomer(idItemChose, { onSuccess: () => setIsDisplayAction(false) });
  };

  const isLoading: boolean = isGetting || isDeletingCustomer;

  useEffect(() => {
    if (metadata?.items) {
      const columnsKey = Object.keys(CUSTOMER_FIELD);
      let columnsDisplay: string[];

      if (localStorage.getItem(LOCAL_STORE_KEYS.DISPLAY_CUSTOMER_FIELDS)) {
        const abc = JSON.parse(
          `${localStorage.getItem(LOCAL_STORE_KEYS.DISPLAY_CUSTOMER_FIELDS)}`
        ) as IItemDrag[];
        columnsDisplay = abc.map((item) => item.fieldKey);
      } else {
        columnsDisplay = Object.keys(CUSTOMER_FIELD_DEF);
      }

      // {
      //   customer_fullName:"Họ và tên"
      //   customer_phoneNumber:"Số điện thoại"
      // }
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
              fieldName: CUSTOMER_FIELD[columnKey],
            });
          } else {
            fieldsHiddenTmp.push({
              fieldKey: columnKey,
              fieldName: CUSTOMER_FIELD[columnKey],
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
                (header.fieldKey === 'createdAt' ||
                  header.fieldKey === 'updatedAt') &&
                metadata?.items[i][header.fieldKey]
              ) {
                return {
                  columnKey: header.fieldKey,
                  columnName: CUSTOMER_FIELD[header.fieldKey] as string,
                  columnVal: formatDate(
                    metadata?.items[i][header.fieldKey] as Date
                  ),
                };
              }
              if (
                header.fieldKey === 'customer_source' &&
                metadata?.items[i][header.fieldKey]?.web_name
              ) {
                return {
                  columnKey: header.fieldKey,
                  columnName: CUSTOMER_FIELD[header.fieldKey] as string,
                  columnVal: `${
                    metadata?.items[i][header.fieldKey]['web_name']
                  }`,
                };
              } else {
                return {
                  columnKey: header.fieldKey,
                  columnName: CUSTOMER_FIELD[header.fieldKey] as string,
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
      <ToolBar objFields={CUSTOMER_FIELD as any}>
        <FeatureCreateCustomer />
      </ToolBar>
      <TableV1
        tableName={LOCAL_STORE_KEYS.DISPLAY_CUSTOMER_FIELDS}
        actionDelete={actionDelete}
        actionUpdate={() => {}}
      />
      <PopupDelete
        close={closePopup}
        isDisplay={isDisplayAction}
        onDelete={onDelete}
      />
    </>
  );
}
