import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const owleryApiSlice = createApi({
  reducerPath: "owleryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_OWLERY_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}), // No endpoints defined initially
});

export const { middleware: owleryApiMiddleware, reducer: owleryApiReducer } =
  owleryApiSlice;
