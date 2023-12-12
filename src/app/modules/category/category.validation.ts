import { z } from 'zod';

const categorySchemaValidation = z.object({
  body: z.object({ name: z.string() }),
});

const categorySchemaUpdateValidation = z.object({
  body: z.object({ name: z.string().optional() }),
});

export const categoryValidations = {
  categorySchemaValidation,
  categorySchemaUpdateValidation,
};
