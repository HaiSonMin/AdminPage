import {
  useVoucherApiDelete,
  useVoucherApiGetAll,
  useVoucherApiSearch,
} from '@/apis-use';
import {
  actionResetAllStateTable,
  actionSetFieldsDisplay,
  actionSetFieldsHidden,
  actionSetItemsTable,
  getStateFieldsDisplay,
} from '@/slices/itemSlice';
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
import { IBodyTable, IDataBody } from '@/interfaces/common/table';
import { VOUCHER_FIELD, VOUCHER_FIELD_DEF } from '@/constants/fields';
import { FeatureCreateVoucher, FeatureUpdateVoucher } from './feature';
import { PopupDelete } from '@/components/popups/popup-delete/PopupDelete';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function VoucherPage() {
  const dispatch = useDispatch();
  const queryString = useQueriesString();
  const query = getQueries(queryString);

  const [idItemChose, setIdItemChose] = useState<string>('');
  const [isDisplayDelete, setIsDisplayDelete] = useState<boolean>(false);
  const [isDisplayUpdate, setIsDisplayUpdate] = useState<boolean>(false);

  const fieldsDisplay = useSelector(getStateFieldsDisplay);

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

  useEffect(() => {
    if (metadata?.items) {
      // ['voucher_name', 'voucher_type', 'voucher_value', 'voucher_web'];
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
              fieldName: VOUCHER_FIELD[columnKey],
            });
          } else {
            fieldsHiddenTmp.push({
              fieldKey: columnKey,
              fieldName: VOUCHER_FIELD[columnKey],
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
                metadata?.items[i][header.fieldKey] === EVoucherType.FIX_AMOUNT
              ) {
                return {
                  columnKey: header.fieldKey,
                  columnName: VOUCHER_FIELD[header.fieldKey] as string,
                  columnVal: 'vnđ',
                };
              }
              if (
                metadata?.items[i][header.fieldKey] === EVoucherType.PERCENTAGE
              ) {
                return {
                  columnKey: header.fieldKey,
                  columnName: VOUCHER_FIELD[header.fieldKey] as string,
                  columnVal: '%',
                };
              }
              if (
                header.fieldKey === 'voucher_value' &&
                metadata?.items[i]['voucher_type'] === EVoucherType.FIX_AMOUNT
              ) {
                return {
                  columnKey: header.fieldKey,
                  columnName: VOUCHER_FIELD[header.fieldKey] as string,
                  columnVal: formatCurrencyVND(
                    parseInt(metadata?.items[i][header.fieldKey])
                  ),
                };
              }
              if (
                header.fieldKey === 'voucher_value' &&
                metadata?.items[i]['voucher_type'] === EVoucherType.PERCENTAGE
              ) {
                return {
                  columnKey: header.fieldKey,
                  columnName: VOUCHER_FIELD[header.fieldKey] as string,
                  columnVal: `${metadata?.items[i][header.fieldKey]}%`,
                };
              }
              if (
                header.fieldKey === 'voucher_web' &&
                metadata?.items[i][header.fieldKey]?.web_name
              ) {
                return {
                  columnKey: header.fieldKey,
                  columnName: VOUCHER_FIELD[header.fieldKey] as string,
                  columnVal: `${
                    metadata?.items[i][header.fieldKey]['web_name']
                  }`,
                };
              }
              if (
                header.fieldKey === 'createdAt' ||
                header.fieldKey === 'updatedAt'
              ) {
                return {
                  columnKey: header.fieldKey,
                  columnName: VOUCHER_FIELD[header.fieldKey] as string,
                  columnVal: formatDate(
                    metadata?.items[i][header.fieldKey] as Date
                  ),
                };
              } else {
                return {
                  columnKey: header.fieldKey,
                  columnName: VOUCHER_FIELD[header.fieldKey] as string,
                  columnVal: metadata?.items[i][header.fieldKey],
                };
              }
            }
          );
          const itemData: IBodyTable = {
            id: metadata?.items[i]._id,
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
      <ToolBar objFields={VOUCHER_FIELD as any}>
        <FeatureCreateVoucher />
      </ToolBar>
      <TableV1
        tableName={LOCAL_STORE_KEYS.DISPLAY_VOUCHER_FIELDS}
        actionDelete={actionDelete}
        actionUpdate={actionUpdate}
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
