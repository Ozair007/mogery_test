// features/orders/ordersSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => "/orders",
        }),
    }),
});

export const { useGetOrdersQuery } = ordersApi;
