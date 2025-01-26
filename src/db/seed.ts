import { models } from '../models';
import { EXERCISE_DIFFICULTY } from '../utils/enums';
import initializeDatabase from '.';

const { ExerciseModel, ProgramModel, ProgramExerciseModel } = models;

const seedDB = async () => {
  await initializeDatabase(true);

  // Create Programs
  const programs = await ProgramModel.bulkCreate([
    { name: 'Program 1' },
    { name: 'Program 2' },
    { name: 'Program 3' },
  ]);

  // Create Exercises
  const exercises = await ExerciseModel.bulkCreate([
    { name: 'Exercise 1', difficulty: EXERCISE_DIFFICULTY.EASY },
    { name: 'Exercise 2', difficulty: EXERCISE_DIFFICULTY.EASY },
    { name: 'Exercise 3', difficulty: EXERCISE_DIFFICULTY.MEDIUM },
    { name: 'Exercise 4', difficulty: EXERCISE_DIFFICULTY.MEDIUM },
    { name: 'Exercise 5', difficulty: EXERCISE_DIFFICULTY.HARD },
    { name: 'Exercise 6', difficulty: EXERCISE_DIFFICULTY.HARD },
  ]);

  // Create Relationships
  await ProgramExerciseModel.bulkCreate([
    { programId: programs[0].id, exerciseId: exercises[0].id },
    { programId: programs[0].id, exerciseId: exercises[1].id },
    { programId: programs[1].id, exerciseId: exercises[2].id },
    { programId: programs[1].id, exerciseId: exercises[3].id },
    { programId: programs[2].id, exerciseId: exercises[4].id },
    { programId: programs[2].id, exerciseId: exercises[5].id },
  ]);
};

seedDB()
  .then(() => {
    console.log('DB seed done');
    process.exit(0);
  })
  .catch((err) => {
    console.error('error in seed, check your data and model \n \n', err);
    process.exit(1);
  });
