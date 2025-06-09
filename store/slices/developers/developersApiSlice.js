import { apiSlice } from "../api/apiSlice";

const transformDeveloperToSnakeCase = (developer) => ({
  name: developer.name,
  email: developer.email,
  designation: developer.designation,
  experience_level: developer.experienceLevel,
  skills: developer.skills,
  status: developer.availabilityStatus,
  current_tasks: developer.currentTasks,
  joined_date: developer.joinedDate,
});

const transformDeveloperToCamelCase = (developer) => ({
  id: developer.id,
  name: developer.name,
  email: developer.email,
  designation: developer.designation,
  experienceLevel: developer.experience_level,
  skills: developer.skills,
  availabilityStatus: developer.status,
  currentTasks: developer.current_tasks,
  joinedDate: developer.joined_date,
});

export const developersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDevelopers: builder.query({
      query: () => "/developers",
      transformResponse: (response) =>
        response.map(transformDeveloperToCamelCase),
    }),

    getDeveloperById: builder.query({
      query: (id) => `/developers/${id}`,
      transformResponse: transformDeveloperToCamelCase,
    }),

    createDeveloper: builder.mutation({
      query: (developer) => ({
        url: "/developers",
        method: "POST",
        body: transformDeveloperToSnakeCase(developer),
      }),
    }),

    updateDeveloper: builder.mutation({
      query: ({ id, ...update }) => ({
        url: `/developers/${id}`,
        method: "PUT",
        body: transformDeveloperToSnakeCase(update),
      }),
    }),

    deleteDeveloper: builder.mutation({
      query: (id) => ({
        url: `/developers/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllDevelopersQuery,
  useGetDeveloperByIdQuery,
  useCreateDeveloperMutation,
  useUpdateDeveloperMutation,
  useDeleteDeveloperMutation,
} = developersApiSlice;
