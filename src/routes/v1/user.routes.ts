import { Router } from 'express';
import {
  updateUser,
  getAllUsers,
  getUserDetail,
} from '../../controllers/user.contoller';
import { userUpdateValidator } from '../../validators/user.validator';
import { IDParamValidator } from '../../validators/param.validator';
import validationMiddleware from '../../middlewares/validation.middleware';
import { authenticateJwt, roleCheck } from '../../middlewares/auth.middleware';

const router: Router = Router();

//Private [Admin] - Update data of specified user (name, surname, nickName, age, role)
router.patch(
  '/:id',
  authenticateJwt,
  roleCheck(['ADMIN']),
  validationMiddleware({ body: userUpdateValidator, params: IDParamValidator }),
  updateUser
);

router.get('/', authenticateJwt, roleCheck(['ADMIN']), getAllUsers);

router.get('/preview', authenticateJwt, roleCheck(['USER']), getAllUsers);

router.get(
  '/:id',
  authenticateJwt,
  roleCheck(['ADMIN']),
  validationMiddleware({
    params: IDParamValidator,
  }),
  getUserDetail
);

export default router;
