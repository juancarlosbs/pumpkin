import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.exerciseSet.deleteMany({});
  await prisma.workoutExercise.deleteMany({});
  await prisma.workout.deleteMany({});
  await prisma.exercise.deleteMany({});
  await prisma.muscleSubgroup.deleteMany({});
  await prisma.muscleGroup.deleteMany({});

  const muscleGroupsData = [
    {
      name: 'Chest',
      subgroups: ['Upper', 'Middle', 'Lower']
    },
    {
      name: 'Back',
      subgroups: ['Lats', 'Trapezius', 'Lower Back', 'Rhomboids']
    },
    {
      name: 'Legs',
      subgroups: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves']
    },
    {
      name: 'Arms',
      subgroups: ['Biceps', 'Triceps', 'Forearm']
    },
    {
      name: 'Shoulders',
      subgroups: ['Front Deltoid', 'Side Deltoid', 'Rear Deltoid']
    },
    {
      name: 'Core',
      subgroups: ['Abs', 'Obliques', 'Transverse']
    }
  ];

  console.log('Starting seed...');

  for (const groupData of muscleGroupsData) {
    const muscleGroup = await prisma.muscleGroup.create({
      data: {
        name: groupData.name
      }
    });

    console.log(`Created muscle group: ${muscleGroup.name}`);

    for (const subgroupName of groupData.subgroups) {
      const subgroup = await prisma.muscleSubgroup.create({
        data: {
          name: subgroupName,
          muscleGroupId: muscleGroup.id
        }
      });

      console.log(`  - Created subgroup: ${subgroup.name}`);
    }
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 