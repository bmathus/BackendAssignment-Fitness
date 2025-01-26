import { Sequelize, DataTypes } from 'sequelize';
import DatabaseModel from '../types/db';
import { Exercise, ExerciseAdd } from '../types/exercise';
import { EXERCISE_DIFFICULTY } from '../utils/enums';

export class ExerciseModel extends DatabaseModel<Exercise, ExerciseAdd> {
  declare id: number;
  declare name: string;
  declare difficulty: EXERCISE_DIFFICULTY;
}

export default (sequelize: Sequelize) => {
  ExerciseModel.init(
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
