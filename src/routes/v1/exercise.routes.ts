import { Router, Request, Response, NextFunction } from 'express';
import { createExercise } from '../../controllers/exercise.controller';
import { models } from '../../models';
import validationMiddleware from '../../middlewares/validation.middleware';
import { exerciseCreateValidator } from '../../validators/schemas/exercise.schema';
const { ExerciseModel } = models;

const router: Router = Router();

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  const exercises = await ExerciseModel.findAll({
    attributes: ['id', 'name', 'difficulty'],
  });

  return res.status(200).json({
    data: exercises,
    message: 'List of exercises',
  });
});

router.post('/', validationMiddleware(exerciseCreateValidator), createExercise);

export default router;
