import { JournalEntry } from "../types/JournalEntry";

let mockData: JournalEntry[] = [];

export const fetchJournalEntries = async (): Promise<JournalEntry[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 500);
  });
};

export const createJournalEntry = async (
  entry: Omit<JournalEntry, "id">
): Promise<JournalEntry> => {
  return new Promise((resolve) => {
    const newEntry = { ...entry, id: Date.now().toString() };
    mockData = [newEntry, ...mockData];
    setTimeout(() => resolve(newEntry), 500);
  });
};
