import { EXERCISE_DIFFICULTY } from '../utils/enums';
import { ProgramExercise } from './programExercise';

export interface Exercise {
  id: number;
  name: string;
  difficulty: EXERCISE_DIFFICULTY;
}

export type ExerciseAdd = Omit<ProgramExercise, 'id'>;
