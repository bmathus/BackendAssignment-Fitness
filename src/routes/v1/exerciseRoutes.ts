import { Router, Request, Response, NextFunction } from 'express';
import { models } from '../../models';
const { Exercise, Program } = models;

const router: Router = Router();

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  const exercises = await Exercise.findAll({
    include: [
      {
        model: Program,
        as: 'program',
      },
    ],
  });

  return res.json({
    data: exercises,
    message: 'List of exercises',
  });
});

export default router;
