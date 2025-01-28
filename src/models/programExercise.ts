import sequelize from '../config/db';
import { Sequelize, DataTypes } from 'sequelize';
import DatabaseModel from '../types/db';
import { ProgramExercise, ProgramExerciseAdd } from '../types/programExercise';

export class ProgramExerciseModel extends DatabaseModel<
  ProgramExercise,
  ProgramExerciseAdd
> {
  declare id: number;
  declare programId: number;
  declare exerciseId: number;
}

export default (sequelize: Sequelize) => {
  ProgramExerciseModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      programId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      exerciseId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ProgramExercise',
      tableName: 'programs_exercises',
      timestamps: true,
    }
  );

  return ProgramExerciseModel;
};
