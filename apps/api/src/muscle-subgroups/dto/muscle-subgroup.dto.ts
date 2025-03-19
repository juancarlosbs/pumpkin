export interface MuscleSubgroupBaseDto {
  name: string;
  muscleGroupId: string;
}

export interface CreateMuscleSubgroupDto extends MuscleSubgroupBaseDto {}

export interface UpdateMuscleSubgroupDto {
  name?: string;
  muscleGroupId?: string;
}

export interface MuscleSubgroupResponseDto extends MuscleSubgroupBaseDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  muscleGroup?: MuscleGroupDto;
  exercises?: ExerciseDto[];
}

interface MuscleGroupDto {
  id: string;
  name: string;
}

interface ExerciseDto {
  id: string;
  name: string;
  description?: string;
} 