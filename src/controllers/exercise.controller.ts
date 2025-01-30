import { Request, Response } from 'express';
import { ExerciseAdd } from '../types/exercise';
import exerciseService from '../services/exercise.service';
import completionRecordService from '../services/completion-record.service';
import AppError from '../utils/error';
import { UserModel } from '../models/user';

export async function createExercise(req: Request, res: Response) {
  try {
    const exerciseData: ExerciseAdd = req.body;
    const newExercise = await exerciseService.createExercise(exerciseData);

    res.status(201).json({
      data: newExercise,
      message: res.__('exercise.created'),
    });
  } catch (err) {
    console.error('Error in createExercise handler:', err);
    res.status(500).json({
      data: {},
      message: res.__('errors.internal_error'),
    });
  }
}

export async function updateExercise(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10);
    const exerciseData: Partial<ExerciseAdd> = req.body;

    const updatedExercise = await exerciseService.updateExercise(
      id,
      exerciseData
    );

    if (!updatedExercise) {
      return res.status(404).json({
        data: {},
        message: res.__('exercise.not_found'),
      });
    }

    res.status(200).json({
      data: updatedExercise,
      message: res.__('exercise.updated'),
    });
  } catch (err) {
    console.error('Error in updateExercise handler:', err);
    res.status(500).json({
      data: {},
      message: res.__('errors.internal_error'),
    });
  }
}

export async function deleteExercise(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10);
    const isDeleted = await exerciseService.deleteExercise(id);

    if (!isDeleted) {
      return res.status(404).json({
        data: {},
        message: res.__('exercise.not_found'),
      });
    }

    res.status(200).json({
      data: {},
      message: res.__('exercise.deleted'),
    });
  } catch (err) {
    console.error('Error in deleteExercise handler:', err);
    res.status(500).json({
      data: {},
      message: res.__('errors.internal_error'),
    });
  }
}

export async function getAllExercises(req: Request, res: Response) {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const programID = req.query.programID
      ? Number(req.query.programID)
      : undefined;

    const allExercises = await exerciseService.fetchAllPaginated(
      page,
      limit,
      programID
    );

    return res.status(200).json({
      data: allExercises,
      message: req.__('exercise.all'),
    });
  } catch (err) {
    console.error('Error in getAllExercises handler:', err);
    res.status(500).json({
      data: {},
      message: res.__('errors.internal_error'),
    });
  }
}

export async function completeExercise(req: Request, res: Response) {
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
    return res.status(500).json({
      data: {},
      message: res.__('errors.internal_error'),
    });
  }
}

export async function deleteCompletionRecord(req: Request, res: Response) {
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
    return res.status(500).json({
      data: {},
      message: res.__('errors.internal_error'),
    });
  }
}
