import { z } from "zod";

const bookStatusEnum = z.enum(["READ", "READING", "PLAN_TO_READ"]);

const toNumber = (val: unknown) => {
  if (val === "" || val === undefined || val === null) return undefined;
  const num = Number(val);
  return isNaN(num) ? undefined : num;
};

export const booksFormSchema = z.object({
  title: z.string().min(1, "Title required."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters."),

  authorName: z
    .string()
    .min(2, "Author name required")
    .optional()
    .or(z.literal("")),
  publisher: z
    .string()
    .min(2, "Publisher name required.")
    .optional()
    .or(z.literal("")),

  pageCount: z
    .preprocess(
      toNumber,
      z.number().int().min(1, "Number of pages cannot be less than 1")
    )
    .optional(),
  finishedYear: z.string().optional(),

  // Opsiyonel alanlar
  coverImageUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),

  myRating: z.preprocess(toNumber, z.number().min(0).max(10)).optional(),

  publishYear: z.preprocess(
    toNumber,
    z
      .number()
      .int()
      .min(1400, "The publication year cannot be less than 1400")
      .max(
        new Date().getFullYear(),
        "The publication year cannot be from the future"
      )
      .optional()
  ),

  //(genres)
  genres: z.preprocess((val) => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
    return val;
  }, z.array(z.string()).min(1, "At least one type must be selected")),

  // 3. Status enum default valid
  status: bookStatusEnum.default("READ"),
});

export type BookFormInputs = z.infer<typeof booksFormSchema>;
