import { z } from 'zod';

// Base schema for ExerciseSet validation
export const exerciseSetBaseSchema = z.object({
  setNumber: z.number().int().positive('Set number must be positive'),
  reps: z.number().int().positive('Reps must be positive'),
  weight: z.number().nonnegative('Weight must be non-negative'),
});

// Schema for creating a new ExerciseSet
export const createExerciseSetSchema = exerciseSetBaseSchema;

// Schema for creating multiple ExerciseSets at once
export const createExerciseSetsSchema = z.object({
  sets: z.array(createExerciseSetSchema).min(1, 'At least one set is required'),
});

// Schema for updating an existing ExerciseSet
export const updateExerciseSetSchema = exerciseSetBaseSchema.partial();

// Types inferred from the Zod schemas
export type ExerciseSetBase = z.infer<typeof exerciseSetBaseSchema>;
export type CreateExerciseSet = z.infer<typeof createExerciseSetSchema>;
export type CreateExerciseSets = z.infer<typeof createExerciseSetsSchema>;
export type UpdateExerciseSet = z.infer<typeof updateExerciseSetSchema>; 