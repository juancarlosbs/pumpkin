export interface MuscleGroupBaseDto {
  name: string;
}

export interface CreateMuscleGroupDto extends MuscleGroupBaseDto {}

export interface UpdateMuscleGroupDto {
  name?: string;
}

export interface MuscleGroupResponseDto extends MuscleGroupBaseDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  subgroups?: MuscleSubgroupResponseDto[];
}

interface MuscleSubgroupResponseDto {
  id: string;
  name: string;
  muscleGroupId: string;
} 