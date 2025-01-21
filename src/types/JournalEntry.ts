export interface JournalEntry {
  id?: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at?: Date;
  user_id?: number;
}
