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
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto/workout.dto';
import { createWorkoutSchema, updateWorkoutSchema } from './schemas/workout.schema';

@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get()
  async findAll() {
    return this.workoutService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.workoutService.findOne(id);
  }

  @Post()
  async create(@Body() createWorkoutDto: CreateWorkoutDto) {
    try {
      createWorkoutSchema.parse(createWorkoutDto);
      
      return this.workoutService.create(createWorkoutDto);
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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    try {
      updateWorkoutSchema.parse(updateWorkoutDto);
      
      return this.workoutService.update(id, updateWorkoutDto);
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

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.workoutService.remove(id);
  }
} 