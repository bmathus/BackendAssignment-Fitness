import { Router, Request, Response, NextFunction } from 'express';
import { models } from '../../models';
const { ExerciseModel } = models;

const router: Router = Router();

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  const exercises = await ExerciseModel.findAll({
    attributes: ['id', 'name', 'difficulty'],
  });

  return res.status(200).json({
    data: exercises,
    message: 'List of exercises',
  });
});

export default router;
