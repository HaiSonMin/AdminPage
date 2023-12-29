/* eslint-disable react-hooks/exhaustive-deps */
import {
  useWebApiDelete,
  useWebApiSearch,
  useWebApiGetAll,
} from '@/apis-use/UseWebApi';
import { IWeb } from '@/interfaces/models';
import { useEffect, useState } from 'react';
import { TableV1 } from '@/components/tables';
import { WEB_FIELD, WEB_FIELD_DEF } from '@/constants/fields';
import { formatDate, getQueries } from '@/utils';
import { ToolBar } from '@/layouts/admin/toolbar';
import { SpinnerPage } from '@/components/loadings';
import { useQueriesString } from '@/hooks/useQueriesString';
import { FeatureCreateWeb, FeatureUpdateWeb } from './feature';
import { IItemDrag, IResultGetMany } from '@/interfaces/common';
import { IBodyTable } from '@/interfaces/common/table';
import { PopupDelete } from '@/components/popups/popup-delete/PopupDelete';
import { LOCAL_STORE_KEYS } from '@/constants/values';

export default function WebPage() {
  const queryString = useQueriesString();
  const query = getQueries(queryString);
  const [headersTable, setHeadersTable] = useState<IItemDrag[]>([]);
  const [dataBody, setDataBody] = useState<Array<IBodyTable>>([]);
  const [idItemChose, setIdItemChose] = useState<string>('');
  const [isDisplayDelete, setIsDisplayDelete] = useState<boolean>(false);
  const [isDisplayUpdate, setIsDisplayUpdate] = useState<boolean>(false);

  const { isDeletingWeb, deleteWeb } = useWebApiDelete();

  const [fieldHiddenTest, setFieldHiddenTest] = useState<IItemDrag[]>([]);
  const [fieldDisplayTest, setFieldDisplayTest] = useState<IItemDrag[]>([]);

  let metadata: IResultGetMany<IWeb> | undefined;
  let isGetting = false;

  if (!query.keySearch) {
    const { isGettingWebs, metadata: webs } = useWebApiGetAll(query);
    metadata = webs;
    isGetting = isGettingWebs;
  } else {
    const { isSearchingWebs, metadata: webs } = useWebApiSearch(query);
    metadata = webs;
    isGetting = isSearchingWebs;
  }

  const closePopupDelete = () => setIsDisplayDelete(false);
  const closePopupUpdate = () => setIsDisplayUpdate(false);

  const actionDelete = (id?: string) => {
    setIsDisplayDelete(true);
    setIdItemChose(`${id}`);
  };

  const onDelete = () => {
    deleteWeb(idItemChose, { onSuccess: () => setIsDisplayDelete(false) });
  };

  const actionUpdate = (id?: string) => {
    setIdItemChose(`${id}`);
    setIsDisplayUpdate(true);
  };

  const isLoading: boolean = isGetting || isDeletingWeb;

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
      const columnsKey = Object.keys(WEB_FIELD);
      let columnsDisplay: string[];

      if (localStorage.getItem(LOCAL_STORE_KEYS.DISPLAY_WEB_FIELDS)) {
        const abc = JSON.parse(
          `${localStorage.getItem(LOCAL_STORE_KEYS.DISPLAY_WEB_FIELDS)}`
        ) as IItemDrag[];
        columnsDisplay = abc.map((item) => item.fieldKey);
      } else {
        columnsDisplay = Object.keys(WEB_FIELD_DEF);
      }

      if (!headersTable.length) {
        const headerDisplay: IItemDrag[] = [];
        const fieldHidden: IItemDrag[] = [];
        const fieldDisplay: IItemDrag[] = [];
        columnsKey.forEach((columnKey) => {
          if (columnsDisplay.includes(columnKey)) {
            headerDisplay.push({
              fieldKey: columnKey,
              fieldName: WEB_FIELD[columnKey],
            });
            fieldDisplay.push({
              fieldKey: columnKey,
              fieldName: WEB_FIELD[columnKey],
            });
          } else {
            fieldHidden.push({
              fieldKey: columnKey,
              fieldName: WEB_FIELD[columnKey],
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
  }, [isLoading, headersTable, metadata?.items]);

  return (
    <>
      {isLoading && <SpinnerPage />}
      <ToolBar>
        <FeatureCreateWeb />
      </ToolBar>
      <TableV1
        tableName={LOCAL_STORE_KEYS.DISPLAY_WEB_FIELDS}
        fieldHidden={fieldHiddenTest}
        fieldDisplay={fieldDisplayTest}
        setFieldHidden={setFieldHiddenTest}
        setFieldDisplay={setFieldDisplayTest}
        setHeadersTable={setHeadersTable}
        handleAddFieldDisplay={handleAddFieldDisplay}
        handleAddFieldHidden={handleAddFieldHidden}
        totalItems={metadata?.totalItems}
        actionUpdate={actionUpdate}
        actionDelete={actionDelete}
        headersTable={headersTable}
        dataBody={dataBody}
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
        <FeatureUpdateWeb
          id={idItemChose}
          isDisplay={isDisplayUpdate}
          close={closePopupUpdate}
        />
      )}
    </>
  );
}
