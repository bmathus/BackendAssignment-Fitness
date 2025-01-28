import { Router } from 'express';
import { register, login } from '../../controllers/auth.controller';
import validationMiddleware from '../../middlewares/validation.middleware';
import authenticateJwt from '../../middlewares/auth.middleware';
import {
  emailPasswordValidator,
  userCreateValidator,
} from '../../validators/user.validator';

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
router.post(
  '/login',
  validationMiddleware({
    body: emailPasswordValidator,
  }),
  login
);
export default router;

router.get('/protected', authenticateJwt, (req, res) => {
  // If authentication succeeds, req.user is set
  res.json({
    message: 'Access granted',
    user: req.user, // User data from JWT payload
  });
});
