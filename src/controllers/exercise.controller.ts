import { Request, Response } from 'express';
import { ExerciseAdd } from '../types/exercise';
import exerciseService from '../services/exercise.service';

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

    const updatedExercise = await exerciseService.updateExercise(id, exerciseData);

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
    const allExercises = await exerciseService.fetchAll();
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
