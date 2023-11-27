import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import rouletteReducer from './slices/rouletteSlice';
import profileReducer from './slices/profileSlice';
import adminUsersReducer from './slices/adminUsersSlice';
import paymentsReducer from './slices/paymentsSlice';

const persistConfig = {
  key: 'root',
  storage,
};
const persistenceReducerAuth = persistReducer(persistConfig, authReducer);

const reducers = combineReducers({
  auth: persistenceReducerAuth,
  roulette: rouletteReducer,
  profile: profileReducer,
  aUsers: adminUsersReducer,
  payments: paymentsReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
