import { Router } from 'express';
import { register } from '../../controllers/auth.controller';
import validationMiddleware from '../../middlewares/validation.middleware';
import { userCreateValidator } from '../../validators/user.validator';

const router: Router = Router();

//Public - Register new user
router.post(
  '/register',
  validationMiddleware({
    body: userCreateValidator,
  }),
  register
);

//Public - Login user with email and password
router.post('/login');
export default router;
