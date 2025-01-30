import { ExerciseAdd, Exercise } from '../types/exercise';
import { models } from '../models';
const { ExerciseModel, CompletionRecordModel, ProgramModel } = models;

async function createExercise(exerciseData: ExerciseAdd): Promise<Exercise> {
  const newExercise = await ExerciseModel.create(exerciseData);
  return newExercise.toResponse();
}

async function fetchAllPaginated(page: number = 1, limit: number = 10, programID?: number) {
  const offset = (page - 1) * limit;

  // For program filtering we need to perform join
  const includeOptions = programID
    ? [
        {
          model: ProgramModel,
          as: 'programs',
          where: { id: programID },
          attributes: [] as string[], //excludes program objects
          through: { attributes: [] as string[] }, // excludes unnecessary fields from join table
          required: true, // ensures only exercises in the given program are included
        },
      ]
    : [];

  const { rows: exercises, count: totalExercises } = await ExerciseModel.findAndCountAll({
    include: includeOptions,
    limit,
    offset,
  });

  return {
    exercises,
    pagination: {
      totalExercises,
      currentPage: page,
      totalPages: Math.ceil(totalExercises / limit),
    },
  };
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

export async function deleteExercise(id: number): Promise<boolean> {
  const deletedCount = await ExerciseModel.destroy({
    where: { id },
  });

  return deletedCount > 0; // Return true if an exercise was deleted
}

async function fetchExercisesOfUser(userId: number, includeDeleted: boolean) {
  const exercisesWithRecords = await ExerciseModel.findAll({
    include: [
      {
        model: CompletionRecordModel,
        as: 'completionRecords',
        where: { userId: userId }, // filter only completion records of logged in user
        required: true, // ensures only exercises with completed records are included
      },
    ],
    paranoid: !includeDeleted, // include soft-deleted exercises by admin, so user dont loose his history of completed exercises
    attributes: ['id', 'name', 'difficulty', 'deletedAt'],
  });
  return exercisesWithRecords;
}

export default {
  createExercise,
  fetchAllPaginated,
  fetchExercisesOfUser,
  updateExercise,
  deleteExercise,
};
