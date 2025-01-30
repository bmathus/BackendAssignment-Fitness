import { models } from '../models';
import { EXERCISE_DIFFICULTY, ROLE } from '../utils/enums';
import bcrypt from 'bcrypt';
import initializeDatabase from '.';

const { ExerciseModel, ProgramModel, ProgramExerciseModel, UserModel } = models;

const seedDB = async () => {
  // Clear and initialize DB
  await initializeDatabase(true);

  // Create Users (2 USERS, 1 ADMIN)
  const hashedPassword = await bcrypt.hash('hardpassword1', 10);
  const users = await UserModel.bulkCreate([
    {
      name: 'Alice',
      surname: 'Johnson',
      nickName: 'alicej',
      email: 'tester1@example.com',
      password: hashedPassword,
      age: 28,
      role: ROLE.USER,
    },
    {
      name: 'Bob',
      surname: 'Smith',
      nickName: 'bobster',
      email: 'tester2b@example.com',
      password: hashedPassword,
      age: 32,
      role: ROLE.USER,
    },
    {
      name: 'Charlie',
      surname: 'Davis',
      nickName: 'admincharlie',
      email: 'admin@example.com',
      password: hashedPassword,
      age: 40,
      role: ROLE.ADMIN,
    },
  ]);

  // Create Programs
  const programs = await ProgramModel.bulkCreate([
    { name: 'Full Body Workout' },
    { name: 'Strength Training' },
    { name: 'Cardio Endurance' },
  ]);

  // Create Exercises
  const exercises = await ExerciseModel.bulkCreate([
    { name: 'Push-Ups', difficulty: EXERCISE_DIFFICULTY.EASY },
    { name: 'Bodyweight Squats', difficulty: EXERCISE_DIFFICULTY.EASY },
    { name: 'Dumbbell Lunges', difficulty: EXERCISE_DIFFICULTY.MEDIUM },
    { name: 'Deadlifts', difficulty: EXERCISE_DIFFICULTY.MEDIUM },
    { name: 'Pull-Ups', difficulty: EXERCISE_DIFFICULTY.HARD },
    { name: 'Barbell Bench Press', difficulty: EXERCISE_DIFFICULTY.HARD },
  ]);

  // Create Program-Exercise Relationships
  await ProgramExerciseModel.bulkCreate([
    { programId: programs[0].id, exerciseId: exercises[0].id }, // Full Body → Push-Ups
    { programId: programs[0].id, exerciseId: exercises[1].id }, // Full Body → Bodyweight Squats
    { programId: programs[1].id, exerciseId: exercises[2].id }, // Strength → Dumbbell Lunges
    { programId: programs[1].id, exerciseId: exercises[3].id }, // Strength → Deadlifts
    { programId: programs[2].id, exerciseId: exercises[4].id }, // Cardio → Pull-Ups
    { programId: programs[2].id, exerciseId: exercises[5].id }, // Cardio → Bench Press
    { programId: programs[0].id, exerciseId: exercises[2].id }, // Full Body → Dumbbell Lunges
    { programId: programs[1].id, exerciseId: exercises[0].id }, // Strength → Push-Ups
    { programId: programs[2].id, exerciseId: exercises[1].id }, // Cardio → Bodyweight Squats
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
