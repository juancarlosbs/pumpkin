// Base DTO for WorkoutExercise properties
export interface WorkoutExerciseBaseDto {
  exerciseId: string;
  notes?: string;
}

// DTO for creating a new WorkoutExercise
export interface CreateWorkoutExerciseDto extends WorkoutExerciseBaseDto {}

// DTO for updating an existing WorkoutExercise
export interface UpdateWorkoutExerciseDto {
  notes?: string;
}

// Full DTO for WorkoutExercise response is in workout.dto.ts 