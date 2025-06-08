import { apiSlice } from "../api/apiSlice";

export const epicApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    decomposeEpic: builder.mutation({
      query: (payload) => ({
        url: "/epic/decompose",
        method: "POST",
        body: payload,
      }),
    }),
    createEpic: builder.mutation({
      query: (epicData) => ({
        url: "/epic",
        method: "POST",
        body: epicData,
      }),
    }),
    getEpic: builder.query({
      query: (epicId) => ({
        url: `/epic/${epicId}`,
        method: "GET",
      }),
    }),
    updateEpic: builder.mutation({
      query: ({ epicId, updates }) => ({
        url: `/epic/${epicId}`,
        method: "PUT",
        body: updates,
      }),
    }),
    listEpics: builder.query({
      query: () => ({
        url: "/epic",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useDecomposeEpicMutation,
  useCreateEpicMutation,
  useGetEpicQuery,
  useUpdateEpicMutation,
  useListEpicsQuery,
} = epicApiSlice;
