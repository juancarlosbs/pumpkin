// Base DTO for Workout properties
export interface WorkoutBaseDto {
  name?: string;
  notes?: string;
  date?: Date;
}

// DTO for creating a new Workout
export interface CreateWorkoutDto extends WorkoutBaseDto {}

// DTO for updating an existing Workout
export interface UpdateWorkoutDto extends WorkoutBaseDto {}

// DTO for Workout response with full data
export interface WorkoutResponseDto extends WorkoutBaseDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  workoutExercises?: WorkoutExerciseResponseDto[];
}

// DTO for WorkoutExercise within Workout responses
export interface WorkoutExerciseResponseDto {
  id: string;
  exerciseId: string;
  exercise: {
    id: string;
    name: string;
    description?: string;
    muscleSubgroupId: string;
    muscleSubgroup: {
      id: string;
      name: string;
      muscleGroupId: string;
      muscleGroup: {
        id: string;
        name: string;
      };
    };
  };
  sets: ExerciseSetResponseDto[];
  notes?: string;
}

// DTO for ExerciseSet within responses
export interface ExerciseSetResponseDto {
  id: string;
  setNumber: number;
  reps: number;
  weight: number;
} 