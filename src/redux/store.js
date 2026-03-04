import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import storage from 'redux-persist/lib/storage'; // Default: localStorage for web

import authSlice from "./slices/authSlice.js";
import adminSlice from "./slices/adminSlice.js";
import bookSlice from "./slices/bookSlice.js";
import trasactionSlice from "./slices/transectionSlice.js";
import studentSlice from "./slices/studentSlice.js";

// 1. Persist Configuration
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    auth: authSlice,
    admin: adminSlice,
    book: bookSlice,
    transaction: trasactionSlice,
    student: studentSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Redux Persist ke actions non-serializable hote hain, isliye inhe ignore karna zaroori hai
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;