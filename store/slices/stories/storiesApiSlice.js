import { apiSlice } from "../api/apiSlice";

export const storiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    decomposeStory: builder.mutation({
      query: (payload) => ({
        url: "/user_story/decompose",
        method: "POST",
        body: payload,
      }),
    }),
    createStory: builder.mutation({
      query: (storyData) => ({
        url: "/user_story",
        method: "POST",
        body: storyData,
      }),
    }),
    getStory: builder.query({
      query: (storyId) => ({
        url: `/user_story/${storyId}`,
        method: "GET",
      }),
    }),
    updateStory: builder.mutation({
      query: ({ storyId, updates }) => ({
        url: `/user_story/${storyId}`,
        method: "PUT",
        body: updates,
      }),
    }),
    deleteStory: builder.mutation({
      query: (storyId) => ({
        url: `/user_story/${storyId}`,
        method: "DELETE",
      }),
    }),
    listStories: builder.query({
      query: () => ({
        url: "/user_story",
        method: "GET",
      }),
    }),
    addStoryComment: builder.mutation({
      query: ({ storyId, comment }) => ({
        url: `/user_story/${storyId}/comments`,
        method: "POST",
        body: comment,
      }),
    }),
    getStoryComments: builder.query({
      query: (storyId) => ({
        url: `/user_story/${storyId}/comments`,
        method: "GET",
      }),
    }),
    logStoryActivity: builder.mutation({
      query: ({ storyId, activity }) => ({
        url: `/user_story/${storyId}/activity`,
        method: "POST",
        body: activity,
      }),
    }),
    getStoryActivityLog: builder.query({
      query: (storyId) => ({
        url: `/user_story/${storyId}/activity`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useDecomposeStoryMutation,
  useCreateStoryMutation,
  useGetStoryQuery,
  useUpdateStoryMutation,
  useDeleteStoryMutation,
  useListStoriesQuery,
  useAddStoryCommentMutation,
  useGetStoryCommentsQuery,
  useLogStoryActivityMutation,
  useGetStoryActivityLogQuery,
} = storiesApiSlice;
