// Base DTO for ExerciseSet properties
export interface ExerciseSetBaseDto {
  setNumber: number;
  reps: number;
  weight: number;
}

// DTO for creating a new ExerciseSet
export interface CreateExerciseSetDto extends ExerciseSetBaseDto {}

// DTO for creating multiple ExerciseSets at once
export interface CreateExerciseSetsDto {
  sets: CreateExerciseSetDto[];
}

// DTO for updating an existing ExerciseSet
export interface UpdateExerciseSetDto {
  setNumber?: number;
  reps?: number;
  weight?: number;
}

// Full DTO for ExerciseSet response is in workout.dto.ts 