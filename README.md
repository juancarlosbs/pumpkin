# Workout Tracker 💪

A comprehensive workout tracking system to monitor your gym progress, including sets, reps, and weight for each exercise.

## Features

- Track workouts with dates and notes
- Organize exercises by muscle groups and subgroups
- Record sets, repetitions, and weight for each exercise
- Monitor your progress over time
- Visualize strength gains and improvements

## Tech Stack

- **Backend**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod for schema validation
- **Infrastructure**: Docker for database containerization
- **API Documentation**: Postman Collection included

## Project Structure

```
apps/
├── api/                  # NestJS backend application
│   ├── prisma/           # Prisma schema and migrations
│   ├── src/
│   │   ├── exercises/    # Exercise management
│   │   ├── muscle-groups/# Muscle group management
│   │   ├── muscle-subgroups/ # Muscle subgroup management
│   │   ├── workouts/     # Workout, workout exercises, sets
│   │   ├── prisma/       # Prisma service
│   │   └── app.module.ts # Main application module
├── web/                  # Frontend application (to be implemented)
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker and Docker Compose
- pnpm or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/workout-tracker.git
cd workout-tracker
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the PostgreSQL database using Docker:
```bash
docker-compose up -d
```
This will create a container named `workout-tracker-db` with PostgreSQL running on port 5432.

4. Set up environment variables:
```bash
cp .env.example .env
```

5. Run database migrations:
```bash
cd apps/api
npx prisma migrate dev
```

6. Seed the database with initial data:
```bash
npm run prisma:seed
```

7. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

## API Endpoints

### Muscle Groups
- `GET /muscle-groups` - List all muscle groups
- `GET /muscle-groups/:id` - Get a specific muscle group
- `POST /muscle-groups` - Create a new muscle group
- `PUT /muscle-groups/:id` - Update a muscle group
- `DELETE /muscle-groups/:id` - Delete a muscle group

### Muscle Subgroups
- `GET /muscle-subgroups` - List all muscle subgroups
- `GET /muscle-subgroups?muscleGroupId=:id` - List subgroups for a specific muscle group
- `POST /muscle-subgroups` - Create a new muscle subgroup
- `PUT /muscle-subgroups/:id` - Update a muscle subgroup
- `DELETE /muscle-subgroups/:id` - Delete a muscle subgroup

### Exercises
- `GET /exercises` - List all exercises
- `GET /exercises/:id` - Get a specific exercise
- `POST /exercises` - Create a new exercise
- `PUT /exercises/:id` - Update an exercise
- `DELETE /exercises/:id` - Delete an exercise

### Workouts
- `GET /workouts` - List all workouts
- `GET /workouts/:id` - Get a specific workout
- `POST /workouts` - Create a new workout
- `PUT /workouts/:id` - Update a workout
- `DELETE /workouts/:id` - Delete a workout

### Workout Exercises
- `GET /workouts/:workoutId/exercises/:id` - Get a specific exercise in a workout
- `POST /workouts/:workoutId/exercises` - Add an exercise to a workout
- `PUT /workouts/:workoutId/exercises/:id` - Update an exercise in a workout
- `DELETE /workouts/:workoutId/exercises/:id` - Remove an exercise from a workout

### Exercise Sets
- `GET /workout-exercises/:workoutExerciseId/sets` - List all sets for an exercise
- `GET /workout-exercises/:workoutExerciseId/sets/:id` - Get a specific set
- `POST /workout-exercises/:workoutExerciseId/sets` - Add a set to an exercise
- `POST /workout-exercises/:workoutExerciseId/sets/batch` - Add multiple sets at once
- `PUT /workout-exercises/:workoutExerciseId/sets/:id` - Update a set
- `DELETE /workout-exercises/:workoutExerciseId/sets/:id` - Delete a set

## Development

### Running Tests
```bash
npm run test
```

### Database Management
- Access Prisma Studio (database GUI):
```bash
cd apps/api
npx prisma studio
```

### API Testing
Import the included Postman collection to test all API endpoints.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
