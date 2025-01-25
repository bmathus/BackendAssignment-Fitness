import path from 'path';
import fs from 'fs';
import { Sequelize } from 'sequelize';
import sequelize from '../config/db';
import defineExercise from './exercise';
import defineProgram from './program';

// Import and initialize models
const models = {
  Exercise: defineExercise(sequelize),
  Program: defineProgram(sequelize),
};

const createModelAssosiations = (sequelize: Sequelize) => {
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

export { models, createModelAssosiations };
