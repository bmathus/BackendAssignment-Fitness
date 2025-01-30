import { Router } from 'express';
import { authenticateJwt, roleCheck } from '../../middlewares/auth.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import {
  exerciseCreateValidator,
  completionRecordValidator,
  updateExerciseValidator,
  exerciseQueryValidator,
} from '../../validators/exercise.validator';
import exerciseController from '../../controllers/exercise.controller';
import { IDParamValidator } from '../../validators/param.validator';

const router: Router = Router();

//Public - Get list of exercises (paginated with programID filtering)
router.get('/', 
  validationMiddleware({ query: exerciseQueryValidator }),
  exerciseController.getAllExercises
);

//Private [Admin] - Create new exercise
router.post('/',
  authenticateJwt,
  roleCheck(['ADMIN']),
  validationMiddleware({ body: exerciseCreateValidator }),
  exerciseController.createExercise
);

//Private [Admin] - Update existing exercise
router.patch('/:id',
  authenticateJwt,
  roleCheck(['ADMIN']),
  validationMiddleware({body: updateExerciseValidator,params: IDParamValidator}),
  exerciseController.updateExercise
);

//Private [Admin] - Delete existing exercise
router.delete('/:id',
  authenticateJwt,
  roleCheck(['ADMIN']),
  validationMiddleware({ params: IDParamValidator }),
  exerciseController.deleteExercise
);

//Private [User] - Create completed exercise record (datetime of completion, duration) for specified exercise and logged in user
router.post('/:id/completed',
  authenticateJwt,
  roleCheck(['USER']),
  validationMiddleware({body: completionRecordValidator,params: IDParamValidator}),
  exerciseController.completeExercise
);

//Private [User] - Delete specified completion record.
// Logged in user is not able to delete completion records of other users.
router.delete('/completed/:id',
  authenticateJwt,
  roleCheck(['USER']),
  validationMiddleware({params: IDParamValidator}),
  exerciseController.deleteCompletionRecord
);

export default router;
