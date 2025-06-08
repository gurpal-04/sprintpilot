import { apiSlice } from "../api/apiSlice";

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Task CRUD operations
    getTasks: builder.query({
      query: () => ({
        url: "/tasks/",
        method: "GET",
      }),
    }),
    getTaskById: builder.query({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: "GET",
      }),
    }),
    createTask: builder.mutation({
      query: (taskData) => ({
        url: "/tasks/",
        method: "POST",
        body: taskData,
      }),
    }),
    updateTask: builder.mutation({
      query: ({ taskId, taskData }) => ({
        url: `/tasks/${taskId}`,
        method: "PUT",
        body: taskData,
      }),
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),
    }),

    // Comment operations
    createComment: builder.mutation({
      query: ({ taskId, commentData }) => ({
        url: `/tasks/${taskId}/comments`,
        method: "POST",
        body: commentData,
      }),
    }),
    getTaskComments: builder.query({
      query: (taskId) => ({
        url: `/tasks/${taskId}/comments`,
        method: "GET",
      }),
    }),

    // Activity log operations
    createActivityLog: builder.mutation({
      query: ({ taskId, activityData }) => ({
        url: `/tasks/${taskId}/activity`,
        method: "POST",
        body: activityData,
      }),
    }),
    getTaskActivityLog: builder.query({
      query: (taskId) => ({
        url: `/tasks/${taskId}/activity`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useCreateCommentMutation,
  useGetTaskCommentsQuery,
  useCreateActivityLogMutation,
  useGetTaskActivityLogQuery,
} = tasksApiSlice;
