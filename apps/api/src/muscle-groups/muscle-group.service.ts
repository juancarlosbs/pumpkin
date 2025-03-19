import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMuscleGroupDto, UpdateMuscleGroupDto } from './dto/muscle-group.dto';

@Injectable()
export class MuscleGroupService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.muscleGroup.findMany({
      include: {
        subgroups: true,
      },
    });
  }

  async findOne(id: string) {
    const muscleGroup = await this.prisma.muscleGroup.findUnique({
      where: { id },
      include: {
        subgroups: true,
      },
    });

    if (!muscleGroup) {
      throw new NotFoundException(`Muscle group with ID ${id} not found`);
    }

    return muscleGroup;
  }

  async create(data: CreateMuscleGroupDto) {
    return this.prisma.muscleGroup.create({
      data,
      include: {
        subgroups: true,
      },
    });
  }

  async update(id: string, data: UpdateMuscleGroupDto) {
    await this.findOne(id);

    return this.prisma.muscleGroup.update({
      where: { id },
      data,
      include: {
        subgroups: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.muscleGroup.delete({
      where: { id },
    });
  }
} 