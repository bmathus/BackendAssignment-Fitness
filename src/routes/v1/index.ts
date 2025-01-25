import { Router } from 'express';

import programRoutes from './programRoutes';
import exerciseRoutes from './exerciseRoutes';

const router = Router();

router.use('/programs', programRoutes);
router.use('/exercises', exerciseRoutes);

export default router;
