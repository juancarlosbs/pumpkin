import { Module } from '@nestjs/common';
import { WorkoutController } from './workout/workout.controller';
import { WorkoutService } from './workout/workout.service';
import { WorkoutExerciseController } from './workout-exercise/workout-exercise.controller';
import { WorkoutExerciseService } from './workout-exercise/workout-exercise.service';
import { ExerciseSetController } from './exercise-set/exercise-set.controller';
import { ExerciseSetService } from './exercise-set/exercise-set.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [
    WorkoutController,
    WorkoutExerciseController,
    ExerciseSetController
  ],
  providers: [
    WorkoutService,
    WorkoutExerciseService,
    ExerciseSetService
  ],
  exports: [
    WorkoutService,
    WorkoutExerciseService,
    ExerciseSetService
  ],
})
export class WorkoutModule {} 