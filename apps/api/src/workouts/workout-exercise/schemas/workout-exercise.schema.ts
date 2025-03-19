import { z } from 'zod';

// Base schema for WorkoutExercise validation
export const workoutExerciseBaseSchema = z.object({
  exerciseId: z.string().uuid('Invalid exercise ID'),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
});

// Schema for creating a new WorkoutExercise
export const createWorkoutExerciseSchema = workoutExerciseBaseSchema;

// Schema for updating an existing WorkoutExercise
export const updateWorkoutExerciseSchema = z.object({
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
});

// Types inferred from the Zod schemas
export type WorkoutExerciseBase = z.infer<typeof workoutExerciseBaseSchema>;
export type CreateWorkoutExercise = z.infer<typeof createWorkoutExerciseSchema>;
export type UpdateWorkoutExercise = z.infer<typeof updateWorkoutExerciseSchema>; 