import AppError from '../utils/error';
import { models } from '../models';
const { ProgramModel, ExerciseModel, ProgramExerciseModel } = models;

async function fetchAll() {
  return await ProgramModel.findAll({
    include: [
      {
        model: ExerciseModel,
        as: 'exercises',
        through: { attributes: [] },
      },
    ],
  });
}

async function programExerciseRelationshipExist(programId: number, exerciseId: number) {
  const program = await ProgramModel.findOne({
    where: { id: programId },
  });
  if (!program) {
    throw new AppError('Program not found.', 'program.not_found');
  }

  const exercise = await ExerciseModel.findOne({
    where: { id: exerciseId },
  });
  if (!exercise) {
    throw new AppError('Exercise not found.', 'exercise.not_found');
  }

  const existingRelation = await ProgramExerciseModel.findOne({
    where: { programId, exerciseId },
  });

  return !!existingRelation;
}

async function createRelationship(programId: number, exerciseId: number) {
  await ProgramExerciseModel.create({ programId, exerciseId });
}

async function deleteRelationship(programId: number, exerciseId: number) {
  await ProgramExerciseModel.destroy({
    where: { programId, exerciseId },
  });
}

export default {
  fetchAll,
  programExerciseRelationshipExist,
  createRelationship,
  deleteRelationship,
};
