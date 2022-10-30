import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { itemsSlice } from './CharactersListingSlice';

export const store = configureStore({
  reducer: {
    characterListing: itemsSlice.reducer,
  },
  
  
  // This only concerns Chrome extension: Redux dev tool:
  // https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
  devTools: {
    trace: true,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
