import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, BadRequestException, Query } from '@nestjs/common';
import { MuscleSubgroupService } from './muscle-subgroup.service';
import { CreateMuscleSubgroupDto, UpdateMuscleSubgroupDto } from './dto/muscle-subgroup.dto';
import { createMuscleSubgroupSchema, updateMuscleSubgroupSchema } from './schemas/muscle-subgroup.schema';

@Controller('muscle-subgroups')
export class MuscleSubgroupController {
  constructor(private readonly muscleSubgroupService: MuscleSubgroupService) {}

  @Get()
  async findAll(@Query('muscleGroupId') muscleGroupId?: string) {
    if (muscleGroupId) {
      return this.muscleSubgroupService.findByMuscleGroup(muscleGroupId);
    }
    return this.muscleSubgroupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.muscleSubgroupService.findOne(id);
  }

  @Post()
  async create(@Body() createMuscleSubgroupDto: CreateMuscleSubgroupDto) {
    try {
      createMuscleSubgroupSchema.parse(createMuscleSubgroupDto);
      
      return this.muscleSubgroupService.create(createMuscleSubgroupDto);
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
    @Body() updateMuscleSubgroupDto: UpdateMuscleSubgroupDto,
  ) {
    try {
      updateMuscleSubgroupSchema.parse(updateMuscleSubgroupDto);
      
      return this.muscleSubgroupService.update(id, updateMuscleSubgroupDto);
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
    await this.muscleSubgroupService.remove(id);
  }
} 