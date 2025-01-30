import { emailPasswordValidator, userCreateValidator } from '../../validators/user.validator';
import validationMiddleware from '../../middlewares/validation.middleware';
import authController from '../../controllers/auth.controller';
import { Router } from 'express';

const router: Router = Router();

//Public - Register new user
router.post('/register',
  validationMiddleware({ body: userCreateValidator }), 
  authController.register
);

//Public - Login user with email and password
router.post('/login', 
  validationMiddleware({ body: emailPasswordValidator }), 
  authController.login
);

export default router;
