import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, BadRequestException } from '@nestjs/common';
import { MuscleGroupService } from './muscle-group.service';
import { CreateMuscleGroupDto, UpdateMuscleGroupDto } from './dto/muscle-group.dto';
import { createMuscleGroupSchema, updateMuscleGroupSchema } from './schemas/muscle-group.schema';

@Controller('muscle-groups')
export class MuscleGroupController {
  constructor(private readonly muscleGroupService: MuscleGroupService) {}

  @Get()
  async findAll() {
    return this.muscleGroupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.muscleGroupService.findOne(id);
  }

  @Post()
  async create(@Body() createMuscleGroupDto: CreateMuscleGroupDto) {
    try {
      createMuscleGroupSchema.parse(createMuscleGroupDto);
      
      return this.muscleGroupService.create(createMuscleGroupDto);
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
    @Body() updateMuscleGroupDto: UpdateMuscleGroupDto,
  ) {
    try {
      updateMuscleGroupSchema.parse(updateMuscleGroupDto);
      
      return this.muscleGroupService.update(id, updateMuscleGroupDto);
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
    await this.muscleGroupService.remove(id);
  }
} 