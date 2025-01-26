import { Router } from 'express';

import programRoutes from './program.routes';
import exerciseRoutes from './exercise.routes';

const router = Router();

router.use('/programs', programRoutes);
router.use('/exercises', exerciseRoutes);

export default router;
