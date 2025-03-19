import { z } from 'zod';

export const muscleSubgroupBaseSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  muscleGroupId: z.string().uuid('Invalid muscle group ID'),
});

export const createMuscleSubgroupSchema = muscleSubgroupBaseSchema;

export const updateMuscleSubgroupSchema = muscleSubgroupBaseSchema.partial();

export type MuscleSubgroupBase = z.infer<typeof muscleSubgroupBaseSchema>;
export type CreateMuscleSubgroup = z.infer<typeof createMuscleSubgroupSchema>;
export type UpdateMuscleSubgroup = z.infer<typeof updateMuscleSubgroupSchema>; 