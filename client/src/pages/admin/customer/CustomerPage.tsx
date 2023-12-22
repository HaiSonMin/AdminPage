import styled from 'styled-components';
import { TableV1 } from '@/components/tables';
import {
  useCustomerApiDelete,
  useCustomerApiGetAll,
  useCustomerApiSearch,
  useCustomerApiUpdate,
} from '@/apis-use/UseCustomerApi';
import { useQueriesString } from '@/hooks/useQueriesString';
import { formatDate, getQueries } from '@/utils';
import { SpinnerPage } from '@/components/loadings';
import { ICustomer } from '@/interfaces/models';
import { useEffect, useState } from 'react';
import { ToolBar } from '@/layouts/admin/toolbar';
import { FeatureCreateCustomer } from './feature';
import { IDataTable, IResultGetMany } from '@/interfaces/common';
import { PopupDelete } from '@/components/popups/popup-delete/PopupDelete';
import { CUSTOMER_FIELD } from '@/constants/fields';

const CustomerPageStyle = styled.div``;

export default function CustomerPage() {
  const [headersName, setHeadersName] = useState<string[]>([]);
  const [dataBody, setDataBody] = useState<Array<IDataTable>>([]);
  const queryString = useQueriesString();
  const query = getQueries(queryString);

  const [isDisplayAction, setIsDisplayAction] = useState<boolean>(false);
  const [idItemChose, setIdItemChose] = useState<string>('');

  const { isDeletingCustomer, deleteCustomer } = useCustomerApiDelete();
  const { isUpdatingCustomer, updateCustomer } = useCustomerApiUpdate();

  let metadata: IResultGetMany<ICustomer> | undefined;
  let isGetting: boolean = false;

  if (!query.search) {
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
      const columnDisplay = Object.keys(CUSTOMER_FIELD);

      // {
      //   customer_fullName:"Họ và tên"
      //   customer_phoneNumber:"Số điện thoại"
      // }
      const headerDisplay = {};
      columnDisplay.forEach((column) => {
        if (CUSTOMER_FIELD[column]) {
          headerDisplay[column] = CUSTOMER_FIELD[column];
        }
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
    <CustomerPageStyle>
      {isLoading && <SpinnerPage />}
      <ToolBar>
        <FeatureCreateCustomer />
      </ToolBar>
      <TableV1
        totalItems={metadata?.totalItems}
        actionDelete={actionDelete}
        actionUpdate={() => {}}
        // actionSeeDetail={() => {}}
        actionSearch={() => (abf: string) => {}}
        dataBody={dataBody}
        headersName={headersName}
        templateColumns={`min-content  ${headersName
          .map((_) => '20rem')
          .join(' ')} minmax(10rem, 1fr)`}
      />
      <PopupDelete
        close={closePopup}
        isDisplay={isDisplayAction}
        onDelete={onDelete}
      />
    </CustomerPageStyle>
  );
}
