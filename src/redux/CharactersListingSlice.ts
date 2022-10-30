import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Character } from '../types/Interface';

// Interfaces
export interface ActionChangeItemId {
  key: number,
  value: string | string[],
}

export interface InitialCharactersListingState {
  characters: Character[];
  searchStatus: string;
  searchName: string;
  nextPageUrl: string | null;
}

// Initial state
export const initialState: InitialCharactersListingState = {
  characters: [],
  searchStatus: '',
  searchName: '',
  nextPageUrl: null,
}

// Reducer
export const itemsSlice = createSlice({
  name: 'charactersListing',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    replaceCharactersList: (state, action: PayloadAction<Character[]>) => {
      state.characters = action.payload;
    },
    addCharactersToList: (state, action: PayloadAction<Character[]>) => {
      state.characters = [...state.characters, ...action.payload];
    },
    changeSearchStatus: (state, action: PayloadAction<string>) => {
      state.searchStatus = action.payload;
    },
    changeSarchName: (state, action: PayloadAction<string>) => {
      state.searchName = action.payload;
    },
    changeNextPageUrl: (state, action: PayloadAction<string | null>) => {
      state.nextPageUrl = action.payload;
    },
  },
});

// Actions
export const { replaceCharactersList, addCharactersToList, changeSearchStatus, changeSarchName, changeNextPageUrl } = itemsSlice.actions;

// Selectors
export const selectCharacters = (state: RootState) => state.characterListing.characters;
export const selectSearchStatus = (state: RootState) => state.characterListing.searchStatus;
export const selectSearchName = (state: RootState) => state.characterListing.searchName;
export const selectNextPageUrl = (state: RootState) => state.characterListing.nextPageUrl;
