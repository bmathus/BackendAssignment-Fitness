import { Request, Response } from 'express';
import { ExerciseAdd } from '../types/exercise';
import exerciseService from '../services/exercise.service';

export async function createExercise(req: Request, res: Response) {
  try {
    const exerciseData: ExerciseAdd = req.body;
    const newExercise = await exerciseService.createExercise(exerciseData);
    res.status(201).json({
      data: newExercise,
      message: res.__('messages.exerciseCreated'),
    });
  } catch (err) {
    console.log('Error in createExercise handler:', err);

    res.status(500).json({
      data: {},
      message: `Internal server error`,
    });
  }
}
