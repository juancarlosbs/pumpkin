import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto/workout.dto';

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  // Get all workouts
  async findAll() {
    return this.prisma.workout.findMany({
      include: {
        workoutExercises: {
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
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  // Get workout by ID
  async findOne(id: string) {
    const workout = await this.prisma.workout.findUnique({
      where: { id },
      include: {
        workoutExercises: {
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
        },
      },
    });

    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }

    return workout;
  }

  // Create a new workout
  async create(data: CreateWorkoutDto) {
    return this.prisma.workout.create({
      data,
      include: {
        workoutExercises: true,
      },
    });
  }

  // Update a workout
  async update(id: string, data: UpdateWorkoutDto) {
    // Verify if workout exists
    await this.findOne(id);

    return this.prisma.workout.update({
      where: { id },
      data,
      include: {
        workoutExercises: {
          include: {
            exercise: true,
            sets: true,
          },
        },
      },
    });
  }

  // Delete a workout
  async remove(id: string) {
    // Verify if workout exists
    await this.findOne(id);

    // Delete all related workout exercises and sets
    return this.prisma.workout.delete({
      where: { id },
    });
  }
} 