/* eslint import/no-cycle: 0 */

import { Sequelize, DataTypes } from 'sequelize';
import DatabaseModel from '../types/db';
import { Program, ProgramAdd } from '../types/program';

export class ProgramModel extends DatabaseModel<Program, ProgramAdd> {
  declare id: number;
  declare name: string;
}

export default (sequelize: Sequelize) => {
  ProgramModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      tableName: 'programs',
      modelName: 'Program',
    }
  );

  ProgramModel.associate = (models) => {
    ProgramModel.belongsToMany(models.ExerciseModel, {
      through: models.ProgramExerciseModel,
      foreignKey: 'programId',
      otherKey: 'exerciseId',
      as: 'exercises',
    });
  };

  return ProgramModel;
};
