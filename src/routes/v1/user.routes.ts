import { Router } from 'express';
import userContoller from '../../controllers/user.contoller';
import { userUpdateValidator } from '../../validators/user.validator';
import { IDParamValidator } from '../../validators/param.validator';
import validationMiddleware from '../../middlewares/validation.middleware';
import { authenticateJwt, roleCheck } from '../../middlewares/auth.middleware';

const router: Router = Router();

//Private [User] - Get list of users (only with id, nickName)
router.get('/preview', 
  authenticateJwt, 
  roleCheck(['USER']), 
  userContoller.getAllUsers
);

//Private [User] - Get users profile with completed exercises included
router.get('/my-profile', 
  authenticateJwt, 
  roleCheck(['USER']), 
  userContoller.getUserProfile
);

//Private [Admin] - Get list of users
router.get('/', 
  authenticateJwt, 
  roleCheck(['ADMIN']), 
  userContoller.getAllUsers
);

//Private [Admin] - Update user
router.patch('/:id',
  authenticateJwt,
  roleCheck(['ADMIN']),
  validationMiddleware({ body: userUpdateValidator, params: IDParamValidator }),
  userContoller.updateUser
);

//Private [Admin] - Get user detail
router.get('/:id',
  authenticateJwt,
  roleCheck(['ADMIN']),
  validationMiddleware({params: IDParamValidator}),
  userContoller.getUserDetail
);

export default router;
