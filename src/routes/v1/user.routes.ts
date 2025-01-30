import { Router } from 'express';
import {
  updateUser,
  getAllUsers,
  getUserDetail,
  getUserProfile,
} from '../../controllers/user.contoller';
import { userUpdateValidator } from '../../validators/user.validator';
import { IDParamValidator } from '../../validators/param.validator';
import validationMiddleware from '../../middlewares/validation.middleware';
import { authenticateJwt, roleCheck } from '../../middlewares/auth.middleware';

const router: Router = Router();

//Private [Admin] - Update data of specified user (name, surname, nickName, age, role)
router.get('/preview', authenticateJwt, roleCheck(['USER']), getAllUsers);

router.get('/my-profile', authenticateJwt, roleCheck(['USER']), getUserProfile);

router.get('/', authenticateJwt, roleCheck(['ADMIN']), getAllUsers);

router.patch(
  '/:id',
  authenticateJwt,
  roleCheck(['ADMIN']),
  validationMiddleware({ body: userUpdateValidator, params: IDParamValidator }),
  updateUser
);

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
