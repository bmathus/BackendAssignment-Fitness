import { Request, Response } from 'express';
import programService from '../services/program.service';

export async function getAllPrograms(req: Request, res: Response) {
  try {
    const allPrograms = await programService.fetchAll();
    return res.status(200).json({
      data: allPrograms,
      message: req.__('program.all'),
    });
  } catch (err) {
    console.error('Error in getAllProgram handler:', err);
    res.status(500).json({
      data: {},
      message: res.__('errors.internal_error'),
    });
  }
}
