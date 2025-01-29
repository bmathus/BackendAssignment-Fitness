import { Router } from 'express';
import { authenticateJwt, roleCheck } from '../../middlewares/auth.middleware';
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
import { IDParamValidator } from '../../validators/param.validator';

const router: Router = Router();

//Public - Get list of exercises
router.get('/', getAllExercises);

//Private [Admin] - Create new exercise
router.post(
  '/',
  authenticateJwt,
  roleCheck(['ADMIN']),
  validationMiddleware({ body: exerciseCreateValidator }),
  createExercise
);

//Private [Admin] - Update existing exercise
router.patch(
  '/:id',
  authenticateJwt,
  roleCheck(['ADMIN']),
  validationMiddleware({
    body: updateExerciseValidator,
    params: IDParamValidator,
  }),
  updateExercise
);

//Private [Admin] - Delete existing exercise
router.delete(
  '/:id',
  authenticateJwt,
  roleCheck(['ADMIN']),
  validationMiddleware({ params: IDParamValidator }),
  deleteExercise
);

export default router;
