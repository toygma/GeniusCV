import { z } from "zod";

export const personalInfoSchema = z.object({
  fullname: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long." })
    .max(100, { message: "Full name cannot exceed 100 characters." }),

  profession: z
    .string()
    .min(2, { message: "Profession is required." })
    .max(80, { message: "Profession cannot exceed 80 characters." }),

  email: z.string().email({ message: "Please enter a valid email address." }),

  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long." })
    .max(20, { message: "Phone number cannot exceed 20 characters." })
    .regex(/^[0-9+\s()-]+$/, { message: "Invalid phone number format." }),

  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters long." })
    .max(100, { message: "Location cannot exceed 100 characters." }),

  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(100, { message: "Title cannot exceed 100 characters." }),

  summary: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(100, { message: "Title cannot exceed 100 characters." }).optional(),

  linkedin: z
    .url({ message: "Please enter a valid LinkedIn URL." })
    .optional()
    .or(z.literal("")),

  website: z
    .url({ message: "Please enter a valid website URL." })
    .optional()
    .or(z.literal("")),

  image: z
    .union([z.url({ message: "Invalid image URL." }), z.instanceof(File)])
    .optional(),

  _id: z.string().optional(),
  userId: z.string().optional(),
});

export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;
