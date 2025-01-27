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
}

export default (sequelize: Sequelize) => {
  UserModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: true, // Optional
        validate: {
          notEmpty: true, // Prevent empty strings
        },
      },
      surname: {
        type: DataTypes.STRING(100),
        allowNull: true, // Optional
        validate: {
          notEmpty: true, // Prevent empty strings
        },
      },
      nickName: {
        type: DataTypes.STRING(50),
        allowNull: true, // Optional
        unique: true, //Unique
        validate: {
          notEmpty: true, // Prevent empty strings
        },
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false, //Required
        unique: true, //Unique
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false, // Required
        validate: {
          notEmpty: true, // Prevent empty strings
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
    // Define associations here, if any
  };

  return UserModel;
};
