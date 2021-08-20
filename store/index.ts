import { configureStore } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper, MakeStore } from 'next-redux-wrapper';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';
import { combineReducers, Store } from 'redux';
import auth from './auth';
import common from './common';
import registerRoom from './registerRoom';
import user from './user';

const rootReducer = combineReducers({
  user: user.reducer,
  common: common.reducer,
  auth: auth.reducer,
  registerRoom: registerRoom.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      return {
        ...state,
        ...action.payload,
      };
    }
    return state;
  }
  return rootReducer(state, action);
};

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore<Store> = () => {
  const store = configureStore({
    reducer,
    devTools: true,
  });
  initialRootState = store.getState();
  return store;
};

export const wrapper = createWrapper(initStore);
