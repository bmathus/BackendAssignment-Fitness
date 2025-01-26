import { Router, Request, Response, NextFunction } from 'express';
import { models } from '../../models';
const { ProgramModel, ExerciseModel } = models;

const router: Router = Router();

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  const programs = await ProgramModel.findAll({
    attributes: ['id', 'name'],
    include: [
      {
        model: ExerciseModel,
        as: 'exercises',
        attributes: ['id', 'name', 'difficulty'],
        through: { attributes: [] },
      },
    ],
  });

  return res.status(200).json({
    data: programs,
    message: 'List of programs',
  });
});

export default router;
