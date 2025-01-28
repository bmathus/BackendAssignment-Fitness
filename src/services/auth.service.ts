import bcrypt from 'bcrypt';
import { UserAdd } from '../types/user';
import { Op } from 'sequelize';
import AppError from '../utils/error';
import { models } from '../models';
const { UserModel } = models;

export async function registerUser(userData: UserAdd) {
  const { email, nickName } = userData;

  // Check if a user with the same email or nickname already exists
  const existingUser = await UserModel.findOne({
    where: {
      [Op.or]: [{ email }, { nickName }],
    },
  });

  if (existingUser) {
    // Determine which field caused the conflict
    if (existingUser.email === email) {
      throw new AppError(
        'A user with this email already exists.',
        'conflict_email'
      );
    }
    if (existingUser.nickName === nickName) {
      throw new AppError(
        'A user with this nickname already exists.',
        'conflict_nick'
      );
    }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // Save user
  const newUser = await UserModel.create({
    ...userData,
    password: hashedPassword,
  });

  // Exclude timestamps
  return newUser.toResponse();
}

export default {
  registerUser,
};
