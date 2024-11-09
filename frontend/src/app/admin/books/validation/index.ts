import { z } from "zod";

export const BookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  file: z
    .instanceof(File, { message: "Cover image is required" })
    .refine((file) => file.size <= 3 * 1024 * 1024, "Max size file 3MB")
    .refine(
      (file) => ["image/png", "image/jpeg"].includes(file.type),
      "Accepted file png & jpg/jpeg"
    ),
  author_name: z.string().min(1, "Author name is required"),
  publisher_name: z.string().min(1, "Publisher name is required"),
  year_published: z.coerce.number().nonnegative(),
});

export const updateBookSchema = z
  .object({
    file: z
      .instanceof(File, { message: "Cover image is required" })
      .refine((file) => file.size <= 3 * 1024 * 1024, "Max size file 3MB")
      .refine(
        (file) => ["image/png", "image/jpeg"].includes(file.type),
        "Accepted file png & jpg/jpeg"
      )
      .optional(),
  })
  .merge(
    BookSchema.pick({
      title: true,
      author_name: true,
      publisher_name: true,
      year_published: true,
    })
  );

export type TBook = z.infer<typeof BookSchema>;
export type TUpdateBook = z.infer<typeof updateBookSchema>;
