import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import todoReducer from "../slices/todoSlice";
import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["todos"],
};

const rootReducer = combineReducers({
    todos: todoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
                ignoredPaths: ["register"],
            },
        }),
});

export const persistor = persistStore(store);
