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
import { IBodyTable, IDataBody } from '@/interfaces/common/table';
import { PopupDelete } from '@/components/popups/popup-delete/PopupDelete';
import { LOCAL_STORE_KEYS } from '@/constants/values';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  actionResetAllStateTable,
  getStateFieldsDisplay,
} from '@/slices/itemSlice';
import {
  actionSetItemsTable,
  actionSetFieldsHidden,
  actionSetFieldsDisplay,
} from '@/slices/itemSlice';
export default function WebPage() {
  const dispatch = useDispatch();
  const queryString = useQueriesString();
  const query = getQueries(queryString);
  const [idItemChose, setIdItemChose] = useState<string>('');
  const [isDisplayDelete, setIsDisplayDelete] = useState<boolean>(false);
  const [isDisplayUpdate, setIsDisplayUpdate] = useState<boolean>(false);
  const { isDeletingWeb, deleteWeb } = useWebApiDelete();

  const fieldsDisplay = useSelector(getStateFieldsDisplay);
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

  useEffect(() => {
    if (metadata?.items) {
      console.log('metadata.items:::', metadata.items);
      // ['web_name', 'web_url'];
      const columnsKey = Object.keys(WEB_FIELD);
      let columnsDisplay: string[];

      if (localStorage.getItem(LOCAL_STORE_KEYS.DISPLAY_WEB_FIELDS)) {
        // Column custom
        const headerDisplay = JSON.parse(
          `${localStorage.getItem(LOCAL_STORE_KEYS.DISPLAY_WEB_FIELDS)}`
        ) as IItemDrag[];
        columnsDisplay = headerDisplay.map((item) => item.fieldKey);
      } else {
        // Column Default
        columnsDisplay = Object.keys(WEB_FIELD_DEF);
      }

      // Set data field for header column
      // Set header then set body
      // Note: If columnsKey not include fieldsDisplay[0].fieldKey => reset header field
      if (
        !fieldsDisplay.length ||
        !columnsKey.includes(fieldsDisplay[0].fieldKey)
      ) {
        dispatch(actionResetAllStateTable());

        // Set data for header
        const fieldsDisplayTmp: IItemDrag[] = [];
        const fieldsHiddenTmp: IItemDrag[] = [];
        columnsKey.forEach((columnKey) => {
          if (columnsDisplay.includes(columnKey)) {
            fieldsDisplayTmp.push({
              fieldKey: columnKey,
              fieldName: WEB_FIELD[columnKey],
            });
          } else {
            fieldsHiddenTmp.push({
              fieldKey: columnKey,
              fieldName: WEB_FIELD[columnKey],
            });
          }
        });
        dispatch(actionSetFieldsDisplay({ fieldsDisplay: fieldsDisplayTmp }));
        dispatch(actionSetFieldsHidden({ fieldsHidden: fieldsHiddenTmp }));
      } else {
        // Set data for body
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
                  columnName: WEB_FIELD[header.fieldKey] as string,
                  columnVal: formatDate(
                    metadata?.items[i][header.fieldKey] as Date
                  ),
                };
              } else {
                return {
                  columnKey: header.fieldKey,
                  columnName: WEB_FIELD[header.fieldKey] as string,
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
  }, [isLoading, dispatch, metadata?.items, fieldsDisplay]);

  return (
    <>
      {isLoading && <SpinnerPage />}
      <ToolBar objFields={WEB_FIELD as any}>
        <FeatureCreateWeb />
      </ToolBar>
      <TableV1
        tableName={LOCAL_STORE_KEYS.DISPLAY_WEB_FIELDS}
        actionUpdate={actionUpdate}
        actionDelete={actionDelete}
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
