import { Router } from 'express';
import { ProgramIDExerciseIDValidador } from '../../validators/param.validator';
import validationMiddleware from '../../middlewares/validation.middleware';
import { authenticateJwt, roleCheck } from '../../middlewares/auth.middleware';
import programController from '../../controllers/program.controller';

const router: Router = Router();

//Public - Get list of programs (exercises included)
router.get('/', programController.getAllPrograms);

//Private [Admin] - Add exercise to program (create relationship in many to many table)

router.post('/:programId/exercises/:exerciseId',
  authenticateJwt,
  roleCheck(['ADMIN']),
  validationMiddleware({ params: ProgramIDExerciseIDValidador }),
  programController.addExerciseToProgram
);

//Private [Admin] - Remove exercise from program (delete relationship in many to many table)
router.delete('/:programId/exercises/:exerciseId',
  authenticateJwt,
  roleCheck(['ADMIN']),
  validationMiddleware({ params: ProgramIDExerciseIDValidador }),
  programController.removeExerciseFromProgram
);

export default router;
