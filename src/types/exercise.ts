import { EXERCISE_DIFFICULTY } from '../utils/enums';

export interface Exercise {
  id: number;
  name: string;
  difficulty: EXERCISE_DIFFICULTY;
}

export type ExerciseAdd = Omit<Exercise, 'id'>;
