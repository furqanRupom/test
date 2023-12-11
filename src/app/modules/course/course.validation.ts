import z from "zod"

const tagsSchemaValidation = z.object({
  name: z.string(),
  isDeleted: z.boolean().default(false),
});

const detailsSchemaValidation = z.object({
  level: z.string(),
  description: z.string(),
});

const courseSchemaValidation = z.object({
  title: z.string(),
  instructor: z.string(),
  categoryId: z.string(), // Assuming categoryId is a string
  price: z.number(),
  tags: z.array(tagsSchemaValidation),
  startDate: z.string(),
  endDate: z.string(),
  language: z.string(),
  provider: z.string(),
  durationWeeks: z.number(),
  details: detailsSchemaValidation,
});

const categorySchemaValidation = z.object({
  name: z.string(),
});


export const courseValidations = {
 courseSchemaValidation,
 categorySchemaValidation
}