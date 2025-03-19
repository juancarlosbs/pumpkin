import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { ExerciseSetService } from './exercise-set.service';
import {
  CreateExerciseSetDto,
  CreateExerciseSetsDto,
  UpdateExerciseSetDto,
} from './dto/exercise-set.dto';
import {
  createExerciseSetSchema,
  createExerciseSetsSchema,
  updateExerciseSetSchema,
} from './schemas/exercise-set.schema';

@Controller('workout-exercises/:workoutExerciseId/sets')
export class ExerciseSetController {
  constructor(private readonly exerciseSetService: ExerciseSetService) {}

  // Get all sets for a workout exercise
  @Get()
  async findAll(@Param('workoutExerciseId') workoutExerciseId: string) {
    return this.exerciseSetService.findAll(workoutExerciseId);
  }

  // Get set by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.exerciseSetService.findOne(id);
  }

  // Create a single set
  @Post()
  async create(
    @Param('workoutExerciseId') workoutExerciseId: string,
    @Body() createExerciseSetDto: CreateExerciseSetDto,
  ) {
    try {
      // Validate input with Zod
      createExerciseSetSchema.parse(createExerciseSetDto);
      
      return this.exerciseSetService.create(workoutExerciseId, createExerciseSetDto);
    } catch (error) {
      if (error.errors) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: error.errors,
        });
      }
      throw error;
    }
  }

  // Create multiple sets at once
  @Post('batch')
  async createMany(
    @Param('workoutExerciseId') workoutExerciseId: string,
    @Body() createExerciseSetsDto: CreateExerciseSetsDto,
  ) {
    try {
      // Validate input with Zod
      createExerciseSetsSchema.parse(createExerciseSetsDto);
      
      return this.exerciseSetService.createMany(workoutExerciseId, createExerciseSetsDto);
    } catch (error) {
      if (error.errors) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: error.errors,
        });
      }
      throw error;
    }
  }

  // Update a set
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExerciseSetDto: UpdateExerciseSetDto,
  ) {
    try {
      // Validate input with Zod
      updateExerciseSetSchema.parse(updateExerciseSetDto);
      
      return this.exerciseSetService.update(id, updateExerciseSetDto);
    } catch (error) {
      if (error.errors) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: error.errors,
        });
      }
      throw error;
    }
  }

  // Delete a set
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.exerciseSetService.remove(id);
  }
} 