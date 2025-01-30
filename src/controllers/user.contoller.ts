import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';
import exerciseService from '../services/exercise.service';
import { UserUpdate } from '../types/user';
import { UserModel } from '../models/user';

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);
    const userData: UserUpdate = req.body; //validated data to update (name, surname, nickName, age, role)

    const updatedUser = await userService.updateUser(id, userData);

    if (!updatedUser) {
      return res.status(404).json({
        data: {},
        message: res.__('user.not_found'),
      });
    }

    return res.status(200).json({
      data: updatedUser.toResponse(), // all user fields exept timestamps and password
      message: res.__('user.updated'),
    });
  } catch (err) {
    console.error('Error in updateUser handler:', err);
    next(err);
  }
}

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as UserModel;

    const responseAttributes =
      user.role === 'ADMIN'
        ? ['id', 'name', 'surname', 'nickName', 'email', 'age', 'role']
        : ['id', 'nickName'];

    const allUsers = await userService.fetchAll(responseAttributes);

    return res.status(200).json({
      data: allUsers,
      message: res.__('user.all'),
    });
  } catch (err) {
    console.error('Error in getAllUsers handler:', err);
    next(err);
  }
}

export async function getUserDetail(req: Request, res: Response, next: NextFunction) {
  try {
    let user = req.user as UserModel;
    const id = parseInt(req.params.id, 10);

    if (user.id !== id) {
      // logged in user differs from requested
      user = await userService.fetchUserByID(id);
    }

    if (!user) {
      return res.status(404).json({
        data: {},
        message: res.__('user.not_found'),
      });
    }

    return res.status(200).json({
      data: user.toResponse(), // all user fields exept timestamps and password
      message: res.__('user.detail'),
    });
  } catch (err) {
    console.error('Error in getAllUsers handler:', err);
    next(err);
  }
}

export async function getUserProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as UserModel;

    const exercisesWithRecords = await exerciseService.fetchExercisesOfUser(user.id, true);

    return res.status(200).json({
      data: {
        profile: {
          name: user.name,
          surname: user.surname,
          age: user.age,
          nickName: user.nickName,
        },
        exercises: exercisesWithRecords,
      },
      message: res.__('user.profile'),
    });
  } catch (err) {
    console.error('Error in getUserProfile handler:', err);
    next(err);
  }
}

export default {
  updateUser,
  getAllUsers,
  getUserDetail,
  getUserProfile,
};
