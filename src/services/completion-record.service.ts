import { models } from '../models';
import AppError from '../utils/error';
import { CompletionRecordAdd } from '../types/completion-record';
const { ExerciseModel, CompletionRecordModel } = models;

export async function completeExercise(completionData: CompletionRecordAdd) {
  const exercise = await ExerciseModel.findByPk(completionData.exerciseId);
  if (!exercise) {
    //Cannot complete non existing or deleted exercise
    throw new AppError('Exercise not found', 'exercise.not_found');
  }

  return await CompletionRecordModel.create(completionData);
}

export async function deleteRecord(
  id: number,
  userId: number
): Promise<boolean> {
  // Deleting based on logged in user so there is not possibility to remove records of others
  const deletedCount = await CompletionRecordModel.destroy({
    where: { id, userId },
  });

  // Return false when there is no such completion record for user
  return deletedCount > 0;
}

export default {
  completeExercise,
  deleteRecord,
};
