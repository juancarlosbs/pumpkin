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
import { WorkoutExerciseService } from './workout-exercise.service';
import { CreateWorkoutExerciseDto, UpdateWorkoutExerciseDto } from './dto/workout-exercise.dto';
import {
  createWorkoutExerciseSchema,
  updateWorkoutExerciseSchema,
} from './schemas/workout-exercise.schema';

@Controller('workouts/:workoutId/exercises')
export class WorkoutExerciseController {
  constructor(private readonly workoutExerciseService: WorkoutExerciseService) {}

  // Get workout exercise by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.workoutExerciseService.findOne(id);
  }

  // Add an exercise to a workout
  @Post()
  async create(
    @Param('workoutId') workoutId: string,
    @Body() createWorkoutExerciseDto: CreateWorkoutExerciseDto,
  ) {
    try {
      // Validate input with Zod
      createWorkoutExerciseSchema.parse(createWorkoutExerciseDto);
      
      return this.workoutExerciseService.create(workoutId, createWorkoutExerciseDto);
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

  // Update a workout exercise
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWorkoutExerciseDto: UpdateWorkoutExerciseDto,
  ) {
    try {
      // Validate input with Zod
      updateWorkoutExerciseSchema.parse(updateWorkoutExerciseDto);
      
      return this.workoutExerciseService.update(id, updateWorkoutExerciseDto);
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

  // Remove an exercise from a workout
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.workoutExerciseService.remove(id);
  }
} 