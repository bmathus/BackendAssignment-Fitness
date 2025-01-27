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
