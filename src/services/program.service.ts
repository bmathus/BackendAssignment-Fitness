import { models } from '../models';
const { ProgramModel, ExerciseModel } = models;

async function fetchAll() {
  return await ProgramModel.findAll({
    attributes: ['id', 'name'],
    include: [
      {
        model: ExerciseModel,
        as: 'exercises',
        attributes: ['id', 'name', 'difficulty'],
        through: { attributes: [] },
      },
    ],
  });
}

export default {
  fetchAll,
};
