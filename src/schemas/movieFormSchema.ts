import { z } from "zod";

const movieStatusEnum = z.enum(["WATCHED", "PLAN_TO_WATCH"]);

const toNumber = (val: unknown) => {
  if (val === "" || val === undefined || val === null) return undefined;
  const num = Number(val);
  return isNaN(num) ? undefined : num;
};

export const movieFormSchema = z.object({
  title: z.string().min(1, "Title is required."), // title required
  description: z
    .string()
    .min(20, "Description must be at least 20 characters."),

  posterUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  backgroundUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  trailerUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),

  rating: z.preprocess(toNumber, z.number().min(0).max(10)).optional(),

  releaseYear: z.preprocess(
    toNumber,
    z
      .number()
      .min(1800, "Year is invalid")
      .max(new Date().getFullYear(), "Year cannot be in the future")
      .optional()
  ),

  // genres: z.array(z.string()).min(1, "At least one genre must be selected"),
  genres: z.preprocess((val) => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
    return val;
  }, z.array(z.string()).min(1, "At least one genre must be selected")),

  status: movieStatusEnum.default("PLAN_TO_WATCH"),
});

export type MovieFormInputs = z.infer<typeof movieFormSchema>;
