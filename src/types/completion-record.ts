export interface CompletionRecord {
  id: number;
  userId: number;
  exerciseId: number;
  completedAt: string;
  duration: number;
  createdAt?: string;
  updatedAt?: string;
}
export type CompletionRecordAdd = Omit<CompletionRecord, 'id'>;
