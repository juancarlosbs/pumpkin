import { z } from 'zod';

// Base schema for Exercise validation
export const exerciseBaseSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  muscleSubgroupId: z.string().uuid('Invalid muscle subgroup ID'),
});

// Schema for creating a new Exercise
export const createExerciseSchema = exerciseBaseSchema;

// Schema for updating an existing Exercise
export const updateExerciseSchema = exerciseBaseSchema.partial();

// Schema for Exercise response with all fields
export const exerciseResponseSchema = exerciseBaseSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Types inferred from the Zod schemas
export type ExerciseBase = z.infer<typeof exerciseBaseSchema>;
export type CreateExercise = z.infer<typeof createExerciseSchema>;
export type UpdateExercise = z.infer<typeof updateExerciseSchema>;
export type ExerciseResponse = z.infer<typeof exerciseResponseSchema>; 