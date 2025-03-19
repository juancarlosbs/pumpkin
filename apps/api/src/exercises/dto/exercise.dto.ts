// Base DTO for Exercise properties
export interface ExerciseBaseDto {
  name: string;
  description?: string;
  muscleSubgroupId: string;
}

// DTO for creating a new Exercise
export interface CreateExerciseDto extends ExerciseBaseDto {}

// DTO for updating an existing Exercise
export interface UpdateExerciseDto {
  name?: string;
  description?: string;
  muscleSubgroupId?: string;
}

// DTO for Exercise response with full data
export interface ExerciseResponseDto extends ExerciseBaseDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
} 