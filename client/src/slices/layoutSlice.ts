import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  isCollapsedSide: boolean;
}

const initializeState = (): IInitialState => {
  return {
    isCollapsedSide: false,
  };
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState: initializeState(),
  reducers: {
    actionCollapsedSide(
      state,
      action: { payload: Pick<IInitialState, 'isCollapsedSide'> }
    ) {
      state.isCollapsedSide = action.payload.isCollapsedSide;
    },
  },
});

export default layoutSlice.reducer;

export const { actionCollapsedSide } = layoutSlice.actions;

export const getStateCollapsedSide = (state: { layout: IInitialState }) =>
  state.layout.isCollapsedSide;
