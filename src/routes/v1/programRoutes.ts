import { Router, Request, Response, NextFunction } from 'express';
import { models } from '../../models';
const { Program } = models;

const router: Router = Router();

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  const programs = await Program.findAll();
  return res.json({
    data: programs,
    message: 'List of programs',
  });
});

export default router;
