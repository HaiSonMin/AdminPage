import { useEffect, useState } from 'react';
import { ToolBar } from '@/layouts/admin/toolbar';
import { FeatureCreateVoucher, FeatureUpdateVoucher } from './feature';
import { TableV1 } from '@/components/tables';
import {
  useVoucherApiDelete,
  useVoucherApiGetAll,
  useVoucherApiSearch,
  useVoucherApiUpdate,
} from '@/apis-use';
import { useQueriesString } from '@/hooks/useQueriesString';
import { formatCurrencyVND, formatDate, getQueries } from '@/utils';
import { IVoucher } from '@/interfaces/models';
import { SpinnerPage } from '@/components/loadings';
import { IDataTable, IResultGetMany } from '@/interfaces/common';
import { PopupDelete } from '@/components/popups/popup-delete/PopupDelete';
import { EVoucherType } from '@/enums';

const headersKeyVoucher: IVoucher = {
  _id: 'Mã voucher',
  voucher_name: 'Tên voucher',
  voucher_type: 'Loại voucher',
  voucher_value: 'Giá trị voucher',
  voucher_web: 'Nguồn sự kiện',
  createdAt: 'Ngày tạo',
  updatedAt: 'Ngày cập nhật',
};

export default function VoucherPage() {
  const queryString = useQueriesString();
  const query = getQueries(queryString);
  const [headersName, setHeadersName] = useState<string[]>([]);
  const [dataBody, setDataBody] = useState<Array<IDataTable>>([]);
  const [idItemChose, setIdItemChose] = useState<string>('');
  const [isDisplayDelete, setIsDisplayDelete] = useState<boolean>(false);
  const [isDisplayUpdate, setIsDisplayUpdate] = useState<boolean>(false);

  const { isDeletingVoucher, deleteVoucher } = useVoucherApiDelete();
  let metadata: IResultGetMany<IVoucher> | undefined;
  let isGetting: boolean = false;

  if (!query.search) {
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
      const { _id, createdAt, ...columnDisplay } = metadata.items[0];

      // headerDisplay = {
      //   voucher_name: '',
      //   voucher_type: '',
      //   voucher_value: '',
      //   voucher_web: '',
      //   createdAt: '',
      //   updatedAt: '',
      // };
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
            if (metadata?.items[i][headerKey] === EVoucherType.FIX_AMOUNT) {
              return 'vnđ';
            }
            if (metadata?.items[i][headerKey] === EVoucherType.PERCENTAGE) {
              return '%';
            }
            if (
              headerKey === 'voucher_value' &&
              metadata?.items[i]['voucher_type'] === EVoucherType.FIX_AMOUNT
            ) {
              return formatCurrencyVND(parseInt(metadata?.items[i][headerKey]));
            }
            if (
              headerKey === 'voucher_value' &&
              metadata?.items[i]['voucher_type'] === EVoucherType.PERCENTAGE
            ) {
              return `${metadata?.items[i][headerKey]}%`;
            }
            if (headerKey === 'createdAt' || headerKey === 'updatedAt') {
              return formatDate(metadata?.items[i][headerKey] as Date);
            } else {
              return metadata?.items[i][headerKey];
            }
          }
        );
        const itemData: IDataTable = {
          id: metadata?.items[i]._id,
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
        <FeatureCreateVoucher />
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
        <FeatureUpdateVoucher
          id={idItemChose}
          isDisplay={isDisplayUpdate}
          close={closePopupUpdate}
        />
      )}
    </>
  );
}
