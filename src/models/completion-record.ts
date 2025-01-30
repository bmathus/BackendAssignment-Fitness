import { Sequelize, DataTypes } from 'sequelize';
import DatabaseModel from '../types/db';
import {
  CompletionRecord,
  CompletionRecordAdd,
} from '../types/completion-record';

export class CompletionRecordModel extends DatabaseModel<
  CompletionRecord,
  CompletionRecordAdd
> {
  declare id: number;
  declare userId: number;
  declare exerciseId: number;
  declare completedAt: Date;
  declare duration: number;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
  CompletionRecordModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      exerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'exercises',
          key: 'id',
        },
      },
      completedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      duration: {
        type: DataTypes.INTEGER, // Store duration in seconds
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CompletionRecord',
      tableName: 'completion_records',
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ['updatedAt'] },
      },
    }
  );
  // Define associations
  CompletionRecordModel.associate = (models) => {
    CompletionRecordModel.belongsTo(models.UserModel, {
      foreignKey: 'userId',
      as: 'user',
    });

    CompletionRecordModel.belongsTo(models.ExerciseModel, {
      foreignKey: 'exerciseId',
      as: 'exercise',
    });
  };
  return CompletionRecordModel;
};
