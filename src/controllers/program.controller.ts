import { NextFunction, Request, Response } from 'express';
import programService from '../services/program.service';
import AppError from '../utils/error';

export async function getAllPrograms(req: Request, res: Response,next: NextFunction) {
  try {
    const allPrograms = await programService.fetchAll();
    return res.status(200).json({
      data: allPrograms,
      message: req.__('program.all'),
    });
  } catch (err) {
    console.error('Error in getAllProgram handler:', err);
    next(err);
  }
}

export async function addExerciseToProgram(req: Request, res: Response,next: NextFunction) {
  try {
    const { programId, exerciseId } = req.params;

    // First check if both program and exercise exist and are not soft-deleted
    // Then check if relation already exist
    const exist = await programService.programExerciseRelationshipExist(+programId, +exerciseId);

    if (exist) {
      return res.status(409).json({
        data: {},
        message: res.__('program.exercise.conflict'),
      });
    }

    // Create entry in many to many table
    await programService.createRelationship(+programId, +exerciseId);

    return res.status(201).json({
      data: {},
      message: res.__('program.exercise.add'),
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(404).json({
        data: {},
        message: res.__(err.errorType),
      });
    }
    next(err);
  }
}

export async function removeExerciseFromProgram(req: Request, res: Response,next: NextFunction) {
  try {
    const { programId, exerciseId } = req.params;

    // First check if both program and exercise exist and are not soft-deleted
    // We do this so that softdeleted exercises and programs dont loose relationships in case of recovery
    // Then check if their relationship exist
    const exist = await programService.programExerciseRelationshipExist(+programId, +exerciseId);

    if (!exist) {
      return res.status(404).json({
        data: {},
        message: res.__('program.exercise.not_found'),
      });
    }

    await programService.deleteRelationship(+programId, +exerciseId);

    return res.status(200).json({
      data: {},
      message: res.__('program.exercise.removed'),
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(404).json({
        data: {},
        message: res.__(err.errorType),
      });
    }
    next(err);
  }
}

export default {
  getAllPrograms,
  addExerciseToProgram,
  removeExerciseFromProgram,
};
