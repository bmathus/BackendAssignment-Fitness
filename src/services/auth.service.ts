import bcrypt from 'bcrypt';
import { UserAdd } from '../types/user';
import { models } from '../models';
const { UserModel } = models;

export async function registerUser(userData: UserAdd) {
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
