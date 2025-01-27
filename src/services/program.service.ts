import { models } from '../models';
const { ProgramModel, ExerciseModel } = models;

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

export default {
  fetchAll,
};
