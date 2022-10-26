import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Item } from '../types/Interface';

// Interfaces
export interface ActionChangeItemId {
  key: number,
  value: string | string[],
}

export interface FormState {
  items: Item[];
  activeItemId: string | null;
}

// Initial state
export const initialState: FormState = {
  items: [],
  activeItemId: null,
}

// Reducer
export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeSelectedItemId: (state, action: PayloadAction<string>) => {
      state.activeItemId = action.payload;
    },
  },
});

// Actions
export const { changeSelectedItemId: changeSelectecChatroomId } = itemsSlice.actions;

// Selectors
export const selectActiveItemId = (state: RootState) => state.items.activeItemId;
