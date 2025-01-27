import { Router, Request, Response, NextFunction } from 'express';
import validationMiddleware from '../../middlewares/validation.middleware';
import { exerciseCreateValidator } from '../../validators/schemas/exercise.schema';
import { models } from '../../models';
const { ExerciseModel } = models;
import {
  createExercise,
  getAllExercises,
} from '../../controllers/exercise.controller';

const router: Router = Router();

//Public - Get all exercises
router.get('/', getAllExercises);

router.post('/', validationMiddleware(exerciseCreateValidator), createExercise);

export default router;
