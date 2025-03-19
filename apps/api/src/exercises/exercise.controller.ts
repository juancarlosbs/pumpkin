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
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto, UpdateExerciseDto } from './dto/exercise.dto';
import {
  createExerciseSchema,
  updateExerciseSchema,
} from './schemas/exercise.schema';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  // Get all exercises
  @Get()
  async findAll() {
    return this.exerciseService.findAll();
  }

  // Get exercise by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.exerciseService.findOne(id);
  }

  // Create a new exercise
  @Post()
  async create(@Body() createExerciseDto: CreateExerciseDto) {
    try {
      // Validate input with Zod
      createExerciseSchema.parse(createExerciseDto);
      
      return this.exerciseService.create(createExerciseDto);
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

  // Update an exercise
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    try {
      // Validate input with Zod
      updateExerciseSchema.parse(updateExerciseDto);
      
      return this.exerciseService.update(id, updateExerciseDto);
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

  // Delete an exercise
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.exerciseService.remove(id);
  }
} 