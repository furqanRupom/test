import z from 'zod';

/* course and category schema validation  */

const tagsSchemaValidation = z.object({
  name: z.string(),
  isDeleted: z.boolean().default(false),
});

const detailsSchemaValidation = z.object({
  level: z.string(),
  description: z.string(),
});

const courseSchemaValidation = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(tagsSchemaValidation),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    durationWeeks: z.number(),
    details: detailsSchemaValidation,
  }),
});

const categorySchemaValidation = z.object({
  body: z.object({ name: z.string() }),
});

/* update schema validation */

const tagsSchemaUpdateValidation = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean().default(false).optional(),
});

const detailsSchemaUpdateValidation = z.object({
  level: z.string().optional(),
  description: z.string().optional(),
});

/* course schema update validation  */

const courseSchemaUpdateValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(tagsSchemaUpdateValidation),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    durationWeeks: z.number().optional(),
    details: detailsSchemaUpdateValidation,
  }),
});

/* category schema update validation  */

const categorySchemaUpdateValidation = z.object({
  body: z.object({ name: z.string().optional() }),
});

export const courseValidations = {
  courseSchemaValidation,
  categorySchemaValidation,
  courseSchemaUpdateValidation,
  categorySchemaUpdateValidation,
};
