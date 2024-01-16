import { IItemDrag } from '@/interfaces/common';
import { NumberInputCssVariables } from '@mantine/core';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState<T> {
  itemsTable: T[];
  fieldsHidden: IItemDrag[];
  fieldsDisplay: IItemDrag[];
  isSelectedAllRows: boolean;
  rowsSelected: string[];
}

const initializeState = (): IInitialState<any> => {
  return {
    itemsTable: [],
    fieldsHidden: [],
    fieldsDisplay: [],
    isSelectedAllRows: false,
    rowsSelected: [],
  };
};

const itemSlice = createSlice({
  name: 'item',
  initialState: initializeState(),
  reducers: {
    actionResetAllStateTable(state) {
      state.itemsTable = [];
      state.fieldsHidden = [];
      state.fieldsDisplay = [];
      state.rowsSelected = [];
      state.isSelectedAllRows = false;
    },
    actionSetItemsTable(
      state,
      action: { payload: Pick<IInitialState<any>, 'itemsTable'> }
    ) {
      state.itemsTable = action.payload.itemsTable;
    },
    actionSetFieldsHidden(
      state,
      action: { payload: Pick<IInitialState<any>, 'fieldsHidden'> }
    ) {
      state.fieldsHidden = action.payload.fieldsHidden;
    },
    actionSetFieldsDisplay(
      state,
      action: { payload: Pick<IInitialState<any>, 'fieldsDisplay'> }
    ) {
      state.fieldsDisplay = action.payload.fieldsDisplay;
    },
    actionSetToggleIsSelectedAll(
      state,
      action: { payload: Pick<IInitialState<any>, 'rowsSelected'> }
    ) {
      if (!state.isSelectedAllRows) {
        state.isSelectedAllRows = true;
        state.rowsSelected = action.payload.rowsSelected;
      } else {
        state.isSelectedAllRows = false;
        state.rowsSelected = [];
      }
    },
    actionToggleRowSelected(state, action: { payload: string }) {
      // Push item to row for selected
      if (!state.rowsSelected.includes(action.payload)) {
        state.rowsSelected = [...state.rowsSelected, action.payload];
        if (state.rowsSelected.length === state.itemsTable.length) {
          state.isSelectedAllRows = true;
        }
      } else {
        state.rowsSelected = state.rowsSelected.filter(
          (rowSelected) => rowSelected !== action.payload
        );
        if (!state.rowsSelected.length) {
          state.isSelectedAllRows = false;
        }
      }
    },
  },
});

export default itemSlice.reducer;

export const {
  actionResetAllStateTable,
  actionSetItemsTable,
  actionSetFieldsHidden,
  actionSetFieldsDisplay,
  actionToggleRowSelected,
  actionSetToggleIsSelectedAll,
} = itemSlice.actions;

export const getStateItemsTable = (state: { item: IInitialState<any> }) =>
  state.item.itemsTable;

export const getStateFieldsHidden = (state: { item: IInitialState<any> }) =>
  state.item.fieldsHidden;

export const getStateFieldsDisplay = (state: { item: IInitialState<any> }) =>
  state.item.fieldsDisplay;

export const getStateIsSelectedAllRows = (state: {
  item: IInitialState<any>;
}) => state.item.isSelectedAllRows;

export const getStateRowsSelected = (state: { item: IInitialState<any> }) =>
  state.item.rowsSelected;
