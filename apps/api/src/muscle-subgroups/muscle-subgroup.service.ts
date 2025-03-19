import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMuscleSubgroupDto, UpdateMuscleSubgroupDto } from './dto/muscle-subgroup.dto';

@Injectable()
export class MuscleSubgroupService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.muscleSubgroup.findMany({
      include: {
        muscleGroup: true,
      },
    });
  }

  async findOne(id: string) {
    const muscleSubgroup = await this.prisma.muscleSubgroup.findUnique({
      where: { id },
      include: {
        muscleGroup: true,
        exercises: true,
      },
    });

    if (!muscleSubgroup) {
      throw new NotFoundException(`Muscle subgroup with ID ${id} not found`);
    }

    return muscleSubgroup;
  }

  async findByMuscleGroup(muscleGroupId: string) {
    const muscleGroup = await this.prisma.muscleGroup.findUnique({
      where: { id: muscleGroupId },
    });

    if (!muscleGroup) {
      throw new NotFoundException(`Muscle group with ID ${muscleGroupId} not found`);
    }

    return this.prisma.muscleSubgroup.findMany({
      where: {
        muscleGroupId,
      },
      include: {
        muscleGroup: true,
      },
    });
  }

  async create(data: CreateMuscleSubgroupDto) {
    const muscleGroup = await this.prisma.muscleGroup.findUnique({
      where: { id: data.muscleGroupId },
    });

    if (!muscleGroup) {
      throw new NotFoundException(`Muscle group with ID ${data.muscleGroupId} not found`);
    }

    return this.prisma.muscleSubgroup.create({
      data,
      include: {
        muscleGroup: true,
      },
    });
  }

  async update(id: string, data: UpdateMuscleSubgroupDto) {
    await this.findOne(id);

    if (data.muscleGroupId) {
      const muscleGroup = await this.prisma.muscleGroup.findUnique({
        where: { id: data.muscleGroupId },
      });

      if (!muscleGroup) {
        throw new NotFoundException(`Muscle group with ID ${data.muscleGroupId} not found`);
      }
    }

    return this.prisma.muscleSubgroup.update({
      where: { id },
      data,
      include: {
        muscleGroup: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.muscleSubgroup.delete({
      where: { id },
    });
  }
} 