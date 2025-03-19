import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateExerciseSetDto, CreateExerciseSetsDto, UpdateExerciseSetDto } from './dto/exercise-set.dto';

@Injectable()
export class ExerciseSetService {
  constructor(private readonly prisma: PrismaService) {}

  // Find all sets for a workout exercise
  async findAll(workoutExerciseId: string) {
    // Verify if workout exercise exists
    const workoutExercise = await this.prisma.workoutExercise.findUnique({
      where: { id: workoutExerciseId },
    });

    if (!workoutExercise) {
      throw new NotFoundException(`Workout exercise with ID ${workoutExerciseId} not found`);
    }

    return this.prisma.exerciseSet.findMany({
      where: { workoutExerciseId },
      orderBy: { setNumber: 'asc' },
    });
  }

  // Find a set by ID
  async findOne(id: string) {
    const exerciseSet = await this.prisma.exerciseSet.findUnique({
      where: { id },
      include: {
        workoutExercise: {
          include: {
            exercise: true,
          },
        },
      },
    });

    if (!exerciseSet) {
      throw new NotFoundException(`Exercise set with ID ${id} not found`);
    }

    return exerciseSet;
  }

  // Create a single set
  async create(workoutExerciseId: string, data: CreateExerciseSetDto) {
    // Verify if workout exercise exists
    const workoutExercise = await this.prisma.workoutExercise.findUnique({
      where: { id: workoutExerciseId },
    });

    if (!workoutExercise) {
      throw new NotFoundException(`Workout exercise with ID ${workoutExerciseId} not found`);
    }

    // Check if setNumber already exists for this workout exercise
    const existingSet = await this.prisma.exerciseSet.findFirst({
      where: {
        workoutExerciseId,
        setNumber: data.setNumber,
      },
    });

    if (existingSet) {
      throw new BadRequestException(`Set number ${data.setNumber} already exists for this exercise`);
    }

    return this.prisma.exerciseSet.create({
      data: {
        ...data,
        workoutExerciseId,
      },
    });
  }

  // Create multiple sets at once
  async createMany(workoutExerciseId: string, data: CreateExerciseSetsDto) {
    // Verify if workout exercise exists
    const workoutExercise = await this.prisma.workoutExercise.findUnique({
      where: { id: workoutExerciseId },
    });

    if (!workoutExercise) {
      throw new NotFoundException(`Workout exercise with ID ${workoutExerciseId} not found`);
    }

    // Get existing set numbers
    const existingSets = await this.prisma.exerciseSet.findMany({
      where: { workoutExerciseId },
      select: { setNumber: true },
    });
    const existingSetNumbers = existingSets.map(set => set.setNumber);

    // Check for duplicate set numbers in the request
    const requestSetNumbers = data.sets.map(set => set.setNumber);
    const duplicateSetNumbers = requestSetNumbers.filter(
      (setNumber, index) => requestSetNumbers.indexOf(setNumber) !== index
    );

    if (duplicateSetNumbers.length > 0) {
      throw new BadRequestException(`Duplicate set numbers: ${duplicateSetNumbers.join(', ')}`);
    }

    // Check for conflicts with existing set numbers
    const conflictingSetNumbers = requestSetNumbers.filter(setNumber => 
      existingSetNumbers.includes(setNumber)
    );

    if (conflictingSetNumbers.length > 0) {
      throw new BadRequestException(`Set numbers already exist: ${conflictingSetNumbers.join(', ')}`);
    }

    // Create all sets in a transaction
    const result = await this.prisma.$transaction(
      data.sets.map(set => 
        this.prisma.exerciseSet.create({
          data: {
            ...set,
            workoutExerciseId,
          },
        })
      )
    );

    return result;
  }

  // Update a set
  async update(id: string, data: UpdateExerciseSetDto) {
    // Verify if set exists
    const existingSet = await this.findOne(id);

    // If changing set number, check if it conflicts with another set
    if (data.setNumber && data.setNumber !== existingSet.setNumber) {
      const conflictingSet = await this.prisma.exerciseSet.findFirst({
        where: {
          workoutExerciseId: existingSet.workoutExerciseId,
          setNumber: data.setNumber,
          id: { not: id },
        },
      });

      if (conflictingSet) {
        throw new BadRequestException(`Set number ${data.setNumber} already exists for this exercise`);
      }
    }

    return this.prisma.exerciseSet.update({
      where: { id },
      data,
    });
  }

  // Delete a set
  async remove(id: string) {
    // Verify if set exists
    await this.findOne(id);

    return this.prisma.exerciseSet.delete({
      where: { id },
    });
  }
} 