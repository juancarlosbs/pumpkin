import { Module } from '@nestjs/common';
import { MuscleSubgroupController } from './muscle-subgroup.controller';
import { MuscleSubgroupService } from './muscle-subgroup.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MuscleSubgroupController],
  providers: [MuscleSubgroupService],
  exports: [MuscleSubgroupService],
})
export class MuscleSubgroupModule {} 