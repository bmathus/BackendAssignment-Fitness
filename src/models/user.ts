import { Sequelize, DataTypes } from 'sequelize';
import DatabaseModel from '../types/db';
import { ROLE } from '../utils/enums';
import { User, UserAdd } from '../types/user';

export class UserModel extends DatabaseModel<User, UserAdd> {
  declare id: number;
  declare name?: string;
  declare surname?: string;
  declare nickName?: string;
  declare email: string;
  declare password: string;
  declare age?: number;
  declare role: ROLE;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare deletedAt?: Date | null;

  // Method to exclude timestamps, password
  public toResponse(): User {
    const { createdAt, updatedAt, deletedAt, password, ...rest } =
      this.toJSON() as UserModel;
    return rest;
  }
}

export default (sequelize: Sequelize) => {
  UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: true, // Optional
        validate: {
          notEmpty: true,
        },
      },
      surname: {
        type: DataTypes.STRING(100),
        allowNull: true, // Optional
        validate: {
          notEmpty: true,
        },
      },
      nickName: {
        type: DataTypes.STRING(50),
        allowNull: true, // Optional
        unique: true, //Unique
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false, //Required
        unique: true, //Unique
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false, // Required
        validate: {
          notEmpty: true,
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true, //Optional
        validate: {
          min: 1,
        },
      },
      role: {
        type: DataTypes.ENUM(...Object.values(ROLE)),
        allowNull: false, //Required
        defaultValue: 'USER',
      },
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: 'User',
      tableName: 'users',
      // We exclude timestamps as they are not currently necessary for user
      // But we still manage them in DB for potential future use
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      },
    }
  );

  UserModel.associate = (models) => {
    UserModel.hasMany(models.CompletionRecordModel, {
      foreignKey: 'userId',
      as: 'completionRecords',
    });
  };

  return UserModel;
};
