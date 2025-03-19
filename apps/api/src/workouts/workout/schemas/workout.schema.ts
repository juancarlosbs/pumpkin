import { z } from 'zod';

// Base schema for Workout validation
export const workoutBaseSchema = z.object({
  name: z.string().max(100, 'Name must be less than 100 characters').optional(),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
  date: z.coerce.date().optional().default(() => new Date()),
});

// Schema for creating a new Workout
export const createWorkoutSchema = workoutBaseSchema;

// Schema for updating an existing Workout
export const updateWorkoutSchema = workoutBaseSchema.partial();

// Types inferred from the Zod schemas
export type WorkoutBase = z.infer<typeof workoutBaseSchema>;
export type CreateWorkout = z.infer<typeof createWorkoutSchema>;
export type UpdateWorkout = z.infer<typeof updateWorkoutSchema>; 