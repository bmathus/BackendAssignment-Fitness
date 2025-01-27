import { ExerciseAdd, Exercise } from '../types/exercise';
import { models } from '../models';
const { ExerciseModel } = models;

async function createExercise(exerciseData: ExerciseAdd): Promise<Exercise> {
  const newExercise = await ExerciseModel.create(exerciseData);
  return newExercise.toResponse();
}

async function fetchAll() {
  return await ExerciseModel.findAll();
}

async function updateExercise(
  id: number,
  exerciseData: Partial<ExerciseAdd>
): Promise<null | Exercise> {
  const exercise = await ExerciseModel.findByPk(id);
  if (!exercise) {
    return null; // Exercise not found
  }
  await exercise.update(exerciseData);
  return exercise.toResponse();
}

export default {
  createExercise,
  fetchAll,
  updateExercise,
};
