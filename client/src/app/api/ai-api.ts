import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/v1/ai`,
  credentials: "include",
});

export const aiApi = createApi({
  reducerPath: "aiApi",
  baseQuery,
  tagTypes: ["AIResume"],
  endpoints: (builder) => ({
    uploadResume: builder.mutation<any, any>({
      query: (body) => ({
        url: "/upload-resume",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AIResume"],
    }),
    summaryProfessional: builder.mutation<any, any>({
      query: (body) => ({
        url: "/enhance-summary",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AIResume"],
    }),
  }),
});

export const { useUploadResumeMutation,useSummaryProfessionalMutation } = aiApi;
