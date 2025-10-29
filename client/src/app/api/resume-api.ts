import type { IResume } from "@/types/resume.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/v1/resume`,
  credentials: "include",
  
});

export const resumeApi = createApi({
  reducerPath: "resumeApi",
  baseQuery,
  tagTypes: ["Resume"],
  endpoints: (builder) => ({
    createResume: builder.mutation<any, any>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Resume"],
    }),

    getUserResumes: builder.query<any, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Resume"],
    }),

    updateResume: builder.mutation<any, any>({
      query: ({ resumeId, formData }) => ({
        url: `/${resumeId}`,
        method: "PUT",
        body: formData, 
      }),
      invalidatesTags: (_result, _error, { resumeId }) => [
        { type: "Resume", id: resumeId },
        "Resume",
      ],
    }),

    // Resume sil
    deleteResume: builder.mutation<IResume, string>({
      query: (resumeId) => ({
        url: `/${resumeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Resume"],
    }),

    // Tek bir resume getir (opsiyonel)
    getResumeById: builder.query<IResume, string>({
      query: (resumeId) => ({
        url: `/${resumeId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Resume", id }],
    }),
  }),
});

export const {
  useCreateResumeMutation,
  useGetUserResumesQuery,
  useUpdateResumeMutation,
  useDeleteResumeMutation,
  useGetResumeByIdQuery,
} = resumeApi;
