import { Router } from 'express';

import programRoutes from './program.routes';
import exerciseRoutes from './exercise.routes';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/programs', programRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
