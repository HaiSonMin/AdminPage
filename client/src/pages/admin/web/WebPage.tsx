import styled from 'styled-components';
import { formatDate, getQueries } from '@/utils';
import { IWeb } from '@/interfaces/models';
import { useEffect, useState } from 'react';
import { TableV1 } from '@/components/tables';
import { ToolBar } from '@/layouts/admin/toolbar';
import { SpinnerPage } from '@/components/loadings';
import { FeatureCreateWeb, FeatureUpdateWeb } from './feature';
import {
  useWebApiDelete,
  useWebApiGetAll,
  useWebApiSearch,
  useWebApiUpdate,
} from '@/apis-use/UseWebApi';
import { useQueriesString } from '@/hooks/useQueriesString';
import { IDataTable, IResultGetMany } from '@/interfaces/common';
import { PopupDelete } from '@/components/popups/popup-delete/PopupDelete';
import { WEB_FIELD } from '@/constants/fields';

export default function WebPage() {
  const queryString = useQueriesString();
  const query = getQueries(queryString);
  const [headersName, setHeadersName] = useState<string[]>([]);
  const [dataBody, setDataBody] = useState<Array<IDataTable>>([]);
  const [idItemChose, setIdItemChose] = useState<string>('');

  const [isDisplayDelete, setIsDisplayDelete] = useState<boolean>(false);
  const [isDisplayUpdate, setIsDisplayUpdate] = useState<boolean>(false);
  const { isDeletingWeb, deleteWeb } = useWebApiDelete();

  let metadata: IResultGetMany<IWeb> | undefined;
  let isGetting: boolean;

  if (!query.search) {
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
      const columnDisplay = Object.keys(WEB_FIELD);

      const headerDisplay = {};
      columnDisplay.forEach((column) => {
        if (WEB_FIELD[column]) headerDisplay[column] = WEB_FIELD[column];
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
    <>
      {isLoading && <SpinnerPage />}
      <ToolBar>
        <FeatureCreateWeb />
      </ToolBar>
      <TableV1
        totalItems={metadata?.totalItems}
        // actionSeeDetail={() => {}}
        actionUpdate={actionUpdate}
        actionDelete={actionDelete}
        actionSearch={() => (abf: string) => {}}
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
        <FeatureUpdateWeb
          id={idItemChose}
          isDisplay={isDisplayUpdate}
          close={closePopupUpdate}
        />
      )}
    </>
  );
}
