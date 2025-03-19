import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ExerciseModule } from "./exercises/exercise.module";
import { MuscleGroupModule } from "./muscle-groups/muscle-group.module";
import { MuscleSubgroupModule } from "./muscle-subgroups/muscle-subgroup.module";
import { WorkoutModule } from "./workouts/workout.module";

@Module({
  imports: [
    PrismaModule,
    ExerciseModule,
    MuscleGroupModule,
    MuscleSubgroupModule,
    WorkoutModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
