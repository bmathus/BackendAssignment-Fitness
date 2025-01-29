import { UserUpdate } from '../types/user';
import { models } from '../models';
const { UserModel } = models;

async function updateUser(id: number, userData: UserUpdate) {
  const user = await UserModel.findByPk(id);
  if (!user) {
    return null; // User not found
  }
  return await user.update(userData);
}
async function fetchAll(attributes: string[]) {
  return await UserModel.findAll({
    attributes: attributes,
  });
}

async function fetchUserByID(id: number) {
  const user = await UserModel.findByPk(id);
  if (!user) {
    return null; // User not found
  }
  return user;
}

export default { updateUser, fetchAll, fetchUserByID };
