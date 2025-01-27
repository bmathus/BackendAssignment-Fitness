import { Router, Request, Response, NextFunction } from 'express';
import { getAllPrograms } from '../../controllers/program.controller';
import { models } from '../../models';
const { ProgramModel, ExerciseModel } = models;

const router: Router = Router();

//Public - Get list of programs (exercises included)
router.get('/', getAllPrograms);

export default router;
