/* eslint import/no-cycle: 0 */
import { Sequelize, DataTypes } from 'sequelize';
import DatabaseModel from '../types/db';
import { Program, ProgramAdd } from '../types/program';

export class ProgramModel extends DatabaseModel<Program, ProgramAdd> {
  declare id: number;
  declare name: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare deletedAt?: Date | null;
}

export default (sequelize: Sequelize) => {
  ProgramModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
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
      // We exclude timestamps as they are not currently necessary for user
      // But we still manage them in DB for potential future use
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      },
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
