import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWorkoutExerciseDto, UpdateWorkoutExerciseDto } from './dto/workout-exercise.dto';

@Injectable()
export class WorkoutExerciseService {
  constructor(private readonly prisma: PrismaService) {}

  // Find a workout exercise by ID
  async findOne(id: string) {
    const workoutExercise = await this.prisma.workoutExercise.findUnique({
      where: { id },
      include: {
        exercise: {
          include: {
            muscleSubgroup: {
              include: {
                muscleGroup: true,
              },
            },
          },
        },
        sets: {
          orderBy: {
            setNumber: 'asc',
          },
        },
      },
    });

    if (!workoutExercise) {
      throw new NotFoundException(`Workout exercise with ID ${id} not found`);
    }

    return workoutExercise;
  }

  // Add an exercise to a workout
  async create(workoutId: string, data: CreateWorkoutExerciseDto) {
    // Verify if workout exists
    const workout = await this.prisma.workout.findUnique({
      where: { id: workoutId },
    });

    if (!workout) {
      throw new NotFoundException(`Workout with ID ${workoutId} not found`);
    }

    // Verify if exercise exists
    const exercise = await this.prisma.exercise.findUnique({
      where: { id: data.exerciseId },
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${data.exerciseId} not found`);
    }

    // Check if this exercise is already in the workout
    const existingWorkoutExercise = await this.prisma.workoutExercise.findFirst({
      where: {
        workoutId,
        exerciseId: data.exerciseId,
      },
    });

    if (existingWorkoutExercise) {
      throw new Error(`Exercise with ID ${data.exerciseId} is already in this workout`);
    }

    return this.prisma.workoutExercise.create({
      data: {
        ...data,
        workoutId,
      },
      include: {
        exercise: {
          include: {
            muscleSubgroup: {
              include: {
                muscleGroup: true,
              },
            },
          },
        },
        sets: true,
      },
    });
  }

  // Update workout exercise
  async update(id: string, data: UpdateWorkoutExerciseDto) {
    // Verify if workout exercise exists
    await this.findOne(id);

    return this.prisma.workoutExercise.update({
      where: { id },
      data,
      include: {
        exercise: {
          include: {
            muscleSubgroup: {
              include: {
                muscleGroup: true,
              },
            },
          },
        },
        sets: {
          orderBy: {
            setNumber: 'asc',
          },
        },
      },
    });
  }

  // Remove an exercise from a workout
  async remove(id: string) {
    // Verify if workout exercise exists
    await this.findOne(id);

    return this.prisma.workoutExercise.delete({
      where: { id },
    });
  }
} 