export interface ProgramExercise {
  id: number;
  programId: number;
  exerciseId: number;
}

export type ProgramExerciseAdd = Omit<ProgramExercise, 'id'>;
