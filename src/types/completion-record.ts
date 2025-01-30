export interface CompletionRecord {
  id: number;
  userId: number;
  exerciseId: number;
  completedAt: string;
  duration: number;
}
export type CompletionRecordAdd = Omit<CompletionRecord, 'id'>;
