import { Router } from 'express';
import { ProgramIDExerciseIDValidador } from '../../validators/param.validator';
import validationMiddleware from '../../middlewares/validation.middleware';
import { authenticateJwt, roleCheck } from '../../middlewares/auth.middleware';
import {
  getAllPrograms,
  addExerciseToProgram,
  removeExerciseFromProgram,
} from '../../controllers/program.controller';

const router: Router = Router();

//Public - Get list of programs (exercises included)
router.get('/', getAllPrograms);

//Private [Admin] - Add exercise to program (create relationship)
router.post(
  '/:programId/exercises/:exerciseId',
  authenticateJwt,
  roleCheck(['ADMIN']),
  validationMiddleware({ params: ProgramIDExerciseIDValidador }),
  addExerciseToProgram
);

//Private [Admin] - Remove exercise from program (delete relationship)
router.delete(
  '/:programId/exercises/:exerciseId',
  authenticateJwt,
  roleCheck(['ADMIN']),
  validationMiddleware({ params: ProgramIDExerciseIDValidador }),
  removeExerciseFromProgram
);

export default router;
