import { Router, Request, Response, NextFunction } from 'express';
import validationMiddleware from '../../middlewares/validation.middleware';
import {
  exerciseCreateValidator,
  updateExerciseValidator,
} from '../../validators/exercise.validator';
import {
  createExercise,
  getAllExercises,
  updateExercise,
} from '../../controllers/exercise.controller';
import { idParamValidator } from '../../validators/param.validator';
import { models } from '../../models';
const { ExerciseModel } = models;

const router: Router = Router();

//Public - Get list of exercises
router.get('/', getAllExercises);

//Private [Admin] - Create new exercise
router.post(
  '/',
  validationMiddleware({
    body: exerciseCreateValidator,
  }),
  createExercise
);

//Private [Admin] - Update existing exercise
router.patch(
  '/:id',
  validationMiddleware({
    body: updateExerciseValidator,
    params: idParamValidator,
  }),
  updateExercise
);

export default router;
