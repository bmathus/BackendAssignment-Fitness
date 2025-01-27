import { Router } from 'express';
import validationMiddleware from '../../middlewares/validation.middleware';
import {
  exerciseCreateValidator,
  updateExerciseValidator,
} from '../../validators/exercise.validator';
import {
  createExercise,
  getAllExercises,
  updateExercise,
  deleteExercise,
} from '../../controllers/exercise.controller';
import { idParamValidator } from '../../validators/param.validator';

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

//Private [Admin] - Delete existing exercise
router.delete(
  '/:id',
  validationMiddleware({
    params: idParamValidator,
  }),
  deleteExercise
);

export default router;
