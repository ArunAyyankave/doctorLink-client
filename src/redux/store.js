import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import loadingReducer from "./features/loadingSlice";
import userReducer from "./features/userSlice";
import adminReducer from "./features/adminSlice";
// import doctorReducer from "./features/doctorSlice";

const persistConfig = {
    key: 'root',
    storage
}
const reducer = combineReducers({
    loading: loadingReducer,
    user: userReducer,
    admin: adminReducer,
    // doctor: doctorReducer
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);