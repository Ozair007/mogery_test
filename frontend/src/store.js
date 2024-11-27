// store.js
import { configureStore } from "@reduxjs/toolkit";
import { ordersApi } from "./features/orders/ordersSlice";

export const store = configureStore({
    reducer: {
        [ordersApi.reducerPath]: ordersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ordersApi.middleware),
});
