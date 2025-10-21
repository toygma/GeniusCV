import z from "zod";

export const uploadResumeSchema = z.object({
  title: z.string().min(1, "Resume title is required").max(100, "Title is too long"),
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Please select a file")
    .refine(
      (files) => files[0]?.size <= 5000000,
      "File size must be less than 5MB"
    )
    .refine(
      (files) =>
        ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(
          files[0]?.type
        ),
      "Only PDF and Word documents are allowed"
    ),
});

export type UploadResumeFormData = z.infer<typeof uploadResumeSchema>;
