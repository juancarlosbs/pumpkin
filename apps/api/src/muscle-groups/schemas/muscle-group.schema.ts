import { z } from 'zod';

export const muscleGroupBaseSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
});

export const createMuscleGroupSchema = muscleGroupBaseSchema;

export const updateMuscleGroupSchema = muscleGroupBaseSchema.partial();

export type MuscleGroupBase = z.infer<typeof muscleGroupBaseSchema>;
export type CreateMuscleGroup = z.infer<typeof createMuscleGroupSchema>;
export type UpdateMuscleGroup = z.infer<typeof updateMuscleGroupSchema>; 