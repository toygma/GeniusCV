import { z } from "zod";

export const createResumeSchema = z.object({
  title: z.string().min(1, "Resume title is required").max(100, "Title is too long"),
});

export type CreateResumeFormData = z.infer<typeof createResumeSchema>;
