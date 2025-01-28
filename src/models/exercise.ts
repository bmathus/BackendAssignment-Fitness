import { Sequelize, DataTypes } from 'sequelize';
import DatabaseModel from '../types/db';
import { Exercise, ExerciseAdd } from '../types/exercise';
import { EXERCISE_DIFFICULTY } from '../utils/enums';

export class ExerciseModel extends DatabaseModel<Exercise, ExerciseAdd> {
  declare id: number;
  declare name: string;
  declare difficulty: EXERCISE_DIFFICULTY;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare deletedAt?: Date | null;

  // Method to exclude timestamps
  public toResponse(): Exercise {
    const { createdAt, updatedAt, deletedAt, ...rest } =
      this.toJSON() as ExerciseModel;
    return rest;
  }
}

export default (sequelize: Sequelize) => {
  ExerciseModel.init(
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
      difficulty: {
        type: DataTypes.ENUM(...Object.values(EXERCISE_DIFFICULTY)),
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: 'Exercise',
      tableName: 'exercises',
      // We exclude timestamps as they are not currently necessary for user
      // But we still manage them in DB for potential future use
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      },
    }
  );

  ExerciseModel.associate = (models) => {
    ExerciseModel.belongsToMany(models.ProgramModel, {
      through: models.ProgramExerciseModel,
      foreignKey: 'exerciseId',
      otherKey: 'programId',
      as: 'programs',
    });
  };
  return ExerciseModel;
};
