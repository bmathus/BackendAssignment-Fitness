import { NextFunction, Request, Response } from 'express';
import { ExerciseAdd } from '../types/exercise';
import exerciseService from '../services/exercise.service';
import completionRecordService from '../services/completion-record.service';
import AppError from '../utils/error';
import { ExerciseModel } from '../models/exercise';
import { UserModel } from '../models/user';

export async function createExercise(req: Request, res: Response, next: NextFunction) {
  try {
    const exerciseData: ExerciseAdd = req.body;
    const newExercise: ExerciseModel = await exerciseService.createExercise(exerciseData);

    return res.status(201).json({
      data: newExercise.toResponse(), // exclude timestamps
      message: res.__('exercise.created'),
    });
  } catch (err) {
    console.error('Error in createExercise handler:', err);
    next(err);
  }
}

export async function updateExercise(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);
    const exerciseData: Partial<ExerciseAdd> = req.body;

    const updatedExercise = await exerciseService.updateExercise(id, exerciseData);

    if (!updatedExercise) {
      return res.status(404).json({
        data: {},
        message: res.__('exercise.not_found'),
      });
    }

    return res.status(200).json({
      data: updatedExercise.toResponse(), // exclude timestamps
      message: res.__('exercise.updated'),
    });
  } catch (err) {
    console.error('Error in updateExercise handler:', err);
    next(err);
  }
}

export async function deleteExercise(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);
    const isDeleted = await exerciseService.deleteExercise(id);

    if (!isDeleted) {
      return res.status(404).json({
        data: {},
        message: res.__('exercise.not_found'),
      });
    }

    return res.status(200).json({
      data: {},
      message: res.__('exercise.deleted'),
    });
  } catch (err) {
    console.error('Error in deleteExercise handler:', err);
    next(err);
  }
}

export async function getAllExercises(req: Request, res: Response, next: NextFunction) {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const programID = req.query.programID ? Number(req.query.programID) : undefined;

    const allExercises = await exerciseService.fetchAllPaginated(
      page,
      limit,
      programID,
      req.query.search as string
    );

    return res.status(200).json({
      data: allExercises,
      message: req.__('exercise.all'),
    });
  } catch (err) {
    console.error('Error in getAllExercises handler:', err);
    next(err);
  }
}

export async function completeExercise(req: Request, res: Response, next: NextFunction) {
  let loggedUser = req.user as UserModel;
  const exerciseId = parseInt(req.params.id, 10);
  const { completedAt, duration } = req.body;

  try {
    const completionRecord = await completionRecordService.completeExercise({
      userId: loggedUser.id,
      exerciseId,
      completedAt,
      duration,
    });

    return res.status(201).json({
      message: res.__('exercise.completion.created'),
      data: completionRecord.toResponse(),
    });
  } catch (err) {
    if (err instanceof AppError) {
      //Exercise not found, potentially deleted
      return res.status(404).json({
        data: {},
        message: req.__(err.errorType),
      });
    }
    console.error('Error in completeExercise handler:', err);
    next(err);
  }
}

export async function deleteCompletionRecord(req: Request, res: Response, next: NextFunction) {
  try {
    let loggedUser = req.user as UserModel;
    const completionRecordId = parseInt(req.params.id, 10);

    const deleted: boolean = await completionRecordService.deleteRecord(
      completionRecordId,
      loggedUser.id
    );

    if (!deleted) {
      return res.status(404).json({
        data: {},
        message: res.__('exercise.completion.not_found'),
      });
    }
    return res.status(200).json({
      data: {},
      message: res.__('exercise.completion.deleted'),
    });
  } catch (err) {
    console.error('Error in deleteCompletionRecord handler:', err);
    next(err);
  }
}

export default {
  createExercise,
  updateExercise,
  deleteExercise,
  getAllExercises,
  completeExercise,
  deleteCompletionRecord,
};
