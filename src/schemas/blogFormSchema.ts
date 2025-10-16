import { z } from "zod";

// To convert "on" or undefined value from FormData to boolean.
const zBoolean = z.preprocess(
  (val) => val === "on" || val === true || val === "true",
  z.boolean()
);

export const blogFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  content: z.string().min(50, "Content must be at least 50 characters."),
  excerpt: z.string().max(250).optional().or(z.literal("")),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  categoryId: z.string().optional().or(z.literal("")), // Accept empty string for Prisma connect
  isPublished: zBoolean.default(false),
  tags: z.string().optional().or(z.literal("")),
  keywords: z.string().optional().or(z.literal("")),
  metaDescription: z
    .string()
    .max(160, "Meta description should not exceed 160 characters.")
    .optional()
    .or(z.literal("")),
});

export type BlogFormInputs = z.infer<typeof blogFormSchema>;
