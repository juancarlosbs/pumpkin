import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto, UpdateExerciseDto } from './dto/exercise.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExerciseService {
  constructor(private readonly prisma: PrismaService) {}

  // Get all exercises
  async findAll() {
    return this.prisma.exercise.findMany({
      include: {
        muscleSubgroup: {
          include: {
            muscleGroup: true,
          },
        },
      },
    });
  }

  // Get exercise by ID
  async findOne(id: string) {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id },
      include: {
        muscleSubgroup: {
          include: {
            muscleGroup: true,
          },
        },
      },
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }

    return exercise;
  }

  // Create a new exercise
  async create(data: CreateExerciseDto) {
    // Verify if muscle subgroup exists
    const muscleSubgroup = await this.prisma.muscleSubgroup.findUnique({
      where: { id: data.muscleSubgroupId },
    });

    if (!muscleSubgroup) {
      throw new NotFoundException(
        `Muscle subgroup with ID ${data.muscleSubgroupId} not found`
      );
    }

    return this.prisma.exercise.create({
      data,
      include: {
        muscleSubgroup: {
          include: {
            muscleGroup: true,
          },
        },
      },
    });
  }

  // Update an exercise
  async update(id: string, data: UpdateExerciseDto) {
    // Verify if exercise exists
    await this.findOne(id);

    // Verify if muscle subgroup exists (if provided)
    if (data.muscleSubgroupId) {
      const muscleSubgroup = await this.prisma.muscleSubgroup.findUnique({
        where: { id: data.muscleSubgroupId },
      });

      if (!muscleSubgroup) {
        throw new NotFoundException(
          `Muscle subgroup with ID ${data.muscleSubgroupId} not found`
        );
      }
    }

    return this.prisma.exercise.update({
      where: { id },
      data,
      include: {
        muscleSubgroup: {
          include: {
            muscleGroup: true,
          },
        },
      },
    });
  }

  // Delete an exercise
  async remove(id: string) {
    // Verify if exercise exists
    await this.findOne(id);

    return this.prisma.exercise.delete({
      where: { id },
    });
  }
} 