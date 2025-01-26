export interface Program {
  id: number;
  name: string;
}

export type ProgramAdd = Omit<Program, 'id'>;
