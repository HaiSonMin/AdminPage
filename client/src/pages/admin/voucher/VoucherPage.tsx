import {
  useVoucherApiDelete,
  useVoucherApiGetAll,
  useVoucherApiSearch,
} from '@/apis-use';
import { EVoucherType } from '@/enums';
import { useEffect, useState } from 'react';
import { TableV1 } from '@/components/tables';
import { IVoucher } from '@/interfaces/models';
import { ToolBar } from '@/layouts/admin/toolbar';
import { SpinnerPage } from '@/components/loadings';
import { LOCAL_STORE_KEYS } from '@/constants/values';
import { useQueriesString } from '@/hooks/useQueriesString';
import { IItemDrag, IResultGetMany } from '@/interfaces/common';
import { formatCurrencyVND, formatDate, getQueries } from '@/utils';
import { IBodyTable, IHeaderTable } from '@/interfaces/common/table';
import { VOUCHER_FIELD, VOUCHER_FIELD_DEF } from '@/constants/fields';
import { FeatureCreateVoucher, FeatureUpdateVoucher } from './feature';
import { PopupDelete } from '@/components/popups/popup-delete/PopupDelete';

export default function VoucherPage() {
  const queryString = useQueriesString();
  const query = getQueries(queryString);
  const [dataBody, setDataBody] = useState<Array<IBodyTable>>([]);
  const [idItemChose, setIdItemChose] = useState<string>('');
  const [isDisplayDelete, setIsDisplayDelete] = useState<boolean>(false);
  const [isDisplayUpdate, setIsDisplayUpdate] = useState<boolean>(false);

  const [headersTable, setHeadersTable] = useState<IItemDrag[]>([]);
  const [fieldHidden, setFieldHidden] = useState<IItemDrag[]>([]);
  const [fieldDisplay, setFieldDisplay] = useState<IItemDrag[]>([]);

  const { isDeletingVoucher, deleteVoucher } = useVoucherApiDelete();
  let metadata: IResultGetMany<IVoucher> | undefined;
  let isGetting: boolean = false;

  if (!query.keySearch) {
    const { isGettingVouchers, metadata: vouchers } =
      useVoucherApiGetAll(query);
    metadata = vouchers;
    isGetting = isGettingVouchers;
  } else {
    const { isSearchingVouchers, metadata: vouchers } =
      useVoucherApiSearch(query);
    metadata = vouchers;
    isGetting = isSearchingVouchers;
  }

  const closePopupDelete = () => setIsDisplayDelete(false);
  const closePopupUpdate = () => setIsDisplayUpdate(false);

  const actionDelete = (id?: string) => {
    setIsDisplayDelete(true);
    setIdItemChose(`${id}`);
  };

  const onDelete = () => {
    deleteVoucher(idItemChose, { onSuccess: () => setIsDisplayDelete(false) });
  };

  const actionUpdate = (id?: string) => {
    setIdItemChose(`${id}`);
    setIsDisplayUpdate(true);
  };

  const isLoading: boolean = isGetting || isDeletingVoucher;

  const handleAddFieldDisplay = (indexHidden: number) => {
    // Pop one item when click these
    setFieldHidden((pre) =>
      pre.filter((item) => item.fieldKey !== pre[indexHidden].fieldKey)
    );
    setFieldDisplay((pre) => [...pre, fieldHidden[indexHidden]]);
  };

  const handleAddFieldHidden = (indexDisplay: number) => {
    // Pop one item when click these
    if (fieldDisplay.length > 1) {
      setFieldDisplay((pre) =>
        pre.filter((item) => item.fieldKey !== pre[indexDisplay].fieldKey)
      );
      setFieldHidden((pre) => [...pre, fieldDisplay[indexDisplay]]);
    }
  };

  useEffect(() => {
    if (metadata?.items) {
      const columnsKey = Object.keys(VOUCHER_FIELD);
      let columnsDisplay: string[];
      if (localStorage.getItem(LOCAL_STORE_KEYS.DISPLAY_VOUCHER_FIELDS)) {
        const abc = JSON.parse(
          `${localStorage.getItem(LOCAL_STORE_KEYS.DISPLAY_VOUCHER_FIELDS)}`
        ) as IItemDrag[];
        columnsDisplay = abc.map((item) => item.fieldKey);
      } else {
        columnsDisplay = Object.keys(VOUCHER_FIELD_DEF);
      }

      if (!headersTable.length) {
        const headerDisplay: IItemDrag[] = [];
        const fieldHidden: IItemDrag[] = [];
        const fieldDisplay: IItemDrag[] = [];
        columnsKey.forEach((columnKey) => {
          if (columnsDisplay.includes(columnKey)) {
            headerDisplay.push({
              fieldKey: columnKey,
              fieldName: VOUCHER_FIELD[columnKey],
            });
            fieldDisplay.push({
              fieldKey: columnKey,
              fieldName: VOUCHER_FIELD[columnKey],
            });
          } else {
            fieldHidden.push({
              fieldKey: columnKey,
              fieldName: VOUCHER_FIELD[columnKey],
            });
          }
        });
        setFieldHidden(fieldHidden);
        setFieldDisplay(fieldDisplay);
        setHeadersTable(() => headerDisplay);
      } else {
        const data: IBodyTable[] = [];
        for (let i = 0; i < metadata.items.length; i++) {
          const dataTable: string[] = headersTable.map((header) => {
            if (
              metadata?.items[i][header.fieldKey] === EVoucherType.FIX_AMOUNT
            ) {
              return 'vnđ';
            }
            if (
              metadata?.items[i][header.fieldKey] === EVoucherType.PERCENTAGE
            ) {
              return '%';
            }
            if (
              header.fieldKey === 'voucher_value' &&
              metadata?.items[i]['voucher_type'] === EVoucherType.FIX_AMOUNT
            ) {
              return formatCurrencyVND(
                parseInt(metadata?.items[i][header.fieldKey])
              );
            }
            if (
              header.fieldKey === 'voucher_value' &&
              metadata?.items[i]['voucher_type'] === EVoucherType.PERCENTAGE
            ) {
              return `${metadata?.items[i][header.fieldKey]}%`;
            }
            if (
              header.fieldKey === 'voucher_web' &&
              metadata?.items[i][header.fieldKey]?.web_name
            ) {
              return `${metadata?.items[i][header.fieldKey]['web_name']}`;
            }
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
            id: metadata?.items[i]._id,
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
        <FeatureCreateVoucher />
      </ToolBar>
      <TableV1
        tableName={LOCAL_STORE_KEYS.DISPLAY_VOUCHER_FIELDS}
        fieldHidden={fieldHidden}
        fieldDisplay={fieldDisplay}
        setFieldHidden={setFieldHidden}
        setFieldDisplay={setFieldDisplay}
        setHeadersTable={setHeadersTable}
        handleAddFieldHidden={handleAddFieldHidden}
        handleAddFieldDisplay={handleAddFieldDisplay}
        totalItems={metadata?.totalItems}
        actionDelete={actionDelete}
        actionUpdate={actionUpdate}
        dataBody={dataBody}
        headersTable={headersTable}
        numberColumn={headersTable.length}
      />
      <PopupDelete
        close={closePopupDelete}
        isDisplay={isDisplayDelete}
        onDelete={onDelete}
      />
      {isDisplayUpdate && (
        <FeatureUpdateVoucher
          id={idItemChose}
          isDisplay={isDisplayUpdate}
          close={closePopupUpdate}
        />
      )}
    </>
  );
}
