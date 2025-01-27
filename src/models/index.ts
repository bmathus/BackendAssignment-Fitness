import fs from 'fs';
import { Sequelize } from 'sequelize';
import sequelize from '../config/db';
import defineExercise from './exercise';
import defineProgram from './program';
import defineProgramExercise from './programExercise';
import defineUser from './user';

// Import and initialize models
const models = {
  ExerciseModel: defineExercise(sequelize),
  ProgramModel: defineProgram(sequelize),
  ProgramExerciseModel: defineProgramExercise(sequelize),
  UserModel: defineUser(sequelize),
};

const createModelAssociations = () => {
  const modelsFiles = fs.readdirSync(__dirname);

  if (Object.keys(models).length !== modelsFiles.length - 1) {
    throw new Error('You probably forgot import database model!');
  }

  Object.values(models).forEach((value: any) => {
    if (value.associate) {
      value.associate(models);
    }
  });
};

export { models, createModelAssociations };
