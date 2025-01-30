import { Router } from 'express';
import userContoller from '../../controllers/user.contoller';
import { userUpdateValidator } from '../../validators/user.validator';
import { IDParamValidator } from '../../validators/param.validator';
import validationMiddleware from '../../middlewares/validation.middleware';
import { authenticateJwt, roleCheck } from '../../middlewares/auth.middleware';

const router: Router = Router();

//Private [Admin] - Update data of specified user (name, surname, nickName, age, role)
router.get('/preview', 
  authenticateJwt, 
  roleCheck(['USER']), 
  userContoller.getAllUsers
);

router.get('/my-profile', 
  authenticateJwt, 
  roleCheck(['USER']), 
  userContoller.getUserProfile
);

router.get('/', 
  authenticateJwt, 
  roleCheck(['ADMIN']), 
  userContoller.getAllUsers
);

router.patch('/:id',
  authenticateJwt,
  roleCheck(['ADMIN']),
  validationMiddleware({ body: userUpdateValidator, params: IDParamValidator }),
  userContoller.updateUser
);

router.get('/:id',
  authenticateJwt,
  roleCheck(['ADMIN']),
  validationMiddleware({params: IDParamValidator}),
  userContoller.getUserDetail
);

export default router;
