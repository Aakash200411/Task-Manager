import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import taskReducer from './slices/taskSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    tasks: taskReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'tasks'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store); 