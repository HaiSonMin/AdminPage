import { TableV1 } from '@/components/tables';
import {
  useCustomerApiDelete,
  useCustomerApiGetAll,
  useCustomerApiSearch,
} from '@/apis-use/UseCustomerApi';
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
import { IBodyTable, IHeaderTable } from '@/interfaces/common/table';
import { LOCAL_STORE_KEYS } from '@/constants/values';

export default function CustomerPage() {
  const [dataBody, setDataBody] = useState<Array<IBodyTable>>([]);
  const queryString = useQueriesString();
  const query = getQueries(queryString);

  const [isDisplayAction, setIsDisplayAction] = useState<boolean>(false);
  const [idItemChose, setIdItemChose] = useState<string>('');

  const { isDeletingCustomer, deleteCustomer } = useCustomerApiDelete();

  const [headersTable, setHeadersTable] = useState<IItemDrag[]>([]);
  const [fieldHiddenTest, setFieldHiddenTest] = useState<IItemDrag[]>([]);
  const [fieldDisplayTest, setFieldDisplayTest] = useState<IItemDrag[]>([]);

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
      if (!headersTable.length) {
        const headerDisplay: IItemDrag[] = [];
        const fieldHidden: IItemDrag[] = [];
        const fieldDisplay: IItemDrag[] = [];
        columnsKey.forEach((columnKey) => {
          if (columnsDisplay.includes(columnKey)) {
            headerDisplay.push({
              fieldKey: columnKey,
              fieldName: CUSTOMER_FIELD[columnKey],
            });
            fieldDisplay.push({
              fieldKey: columnKey,
              fieldName: CUSTOMER_FIELD[columnKey],
            });
          } else {
            fieldHidden.push({
              fieldKey: columnKey,
              fieldName: CUSTOMER_FIELD[columnKey],
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
              (header.fieldKey === 'createdAt' ||
                header.fieldKey === 'updatedAt') &&
              metadata?.items[i][header.fieldKey]
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
        <FeatureCreateCustomer />
      </ToolBar>
      <TableV1
        tableName={LOCAL_STORE_KEYS.DISPLAY_CUSTOMER_FIELDS}
        fieldHidden={fieldHiddenTest}
        fieldDisplay={fieldDisplayTest}
        setHeadersTable={setHeadersTable}
        setFieldHidden={setFieldHiddenTest}
        setFieldDisplay={setFieldDisplayTest}
        handleAddFieldDisplay={handleAddFieldDisplay}
        handleAddFieldHidden={handleAddFieldHidden}
        totalItems={metadata?.totalItems}
        actionDelete={actionDelete}
        actionUpdate={() => {}}
        dataBody={dataBody}
        headersTable={headersTable}
        templateColumns={`min-content  ${Object.values(headersTable)
          .map((_) => 'minmax(10rem, 30rem)')
          .join(' ')} 10rem`}
      />
      <PopupDelete
        close={closePopup}
        isDisplay={isDisplayAction}
        onDelete={onDelete}
      />
    </>
  );
}
