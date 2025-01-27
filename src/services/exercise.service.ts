import { ExerciseAdd, Exercise } from '../types/exercise';
import { models } from '../models';
const { ExerciseModel } = models;

async function createExercise(exerciseData: ExerciseAdd): Promise<Exercise> {
  const newExercise = await ExerciseModel.create(exerciseData, { raw: true });
  const { id, name, difficulty } = newExercise;
  return { id, name, difficulty };
}

async function fetchAll(): Promise<Exercise[]> {
  return await ExerciseModel.findAll({
    attributes: ['id', 'name', 'difficulty'],
  });
}

export default {
  createExercise,
  fetchAll,
};
