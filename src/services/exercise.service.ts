import { ExerciseAdd, Exercise } from '../types/exercise';
import { models } from '../models';
const { ExerciseModel } = models;

async function createExercise(exerciseData: ExerciseAdd): Promise<Exercise> {
  try {
    const newExercise = await ExerciseModel.create(exerciseData, { raw: true });
    const { id, name, difficulty } = newExercise;
    return { id, name, difficulty };
  } catch (err) {
    console.error('Error creating exercise in DB:', err);
    throw new Error(`Failed to create exercise in DB`);
  }
}

export default {
  createExercise,
};
